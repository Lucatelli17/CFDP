// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const getIframeBody = () => {
  // get the document
  return (
    getIframeDocument()
      // automatically retries until body is loaded
      .its("body")
      .should("not.be.undefined")
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
  );
};

const getIframeDocument = () => {
  return (
    cy
      .get('iframe[data-cy="iframe-souscription"]')
      // Cypress yields jQuery element, which has the real
      // DOM element under property "0".
      // From the real DOM iframe element we can get
      // the "document" element, it is stored in "contentDocument" property
      // Cypress "its" command can access deep properties using dot notation
      // https://on.cypress.io/its
      .its("0.contentDocument")
      .should("exist")
  );
};
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("testBoutonRafraichir", () => {
  getIframeBody()
    .find("button")
    .then(($buttons) => {
      if ($buttons.text().includes("Rafraîchir") === true) {
        // Si le bouton rafraichir est affiché, on clique dessus, on attend et on reteste
        getIframeBody().find("button").contains("Rafraîchir").click();
        cy.wait(10000);
        cy.testBoutonRafraichir();
      } else if ($buttons.text().includes("Dossier complet") === true) {
        return;
        // Dans ce cas les documents sont affichés, on peut passer à la suite
      } else {
        // Si ni le bouton rafraichir ni le bouton dossier complet ne sont affichés
        // On attend un peu que les documents chargent et on relance le test
        cy.wait(10000);
        cy.testBoutonRafraichir();
      }
    });
});

// -------------------------------------------------------------------------
// --------------------- COMMANDES BASIQUES---------------------------------
// -------------------------------------------------------------------------

// Input data-cy
Cypress.Commands.add("InputDataCy", (data, inputInfo) => {
  getIframeBody()
    .find('input[data-cy="' + data + '"]')
    .type(inputInfo);
});

// Input Div Title
Cypress.Commands.add("InputDivTitle", (title, inputInfo) => {
  getIframeBody()
    .find('div[title="' + title + '"]')
    .first()
    .type(inputInfo);
});

// Input Id
Cypress.Commands.add("InputId", (id, inputInfo) => {
  getIframeBody()
    .find('[id="' + id + '"]')
    .first()
    .click()
    .type(inputInfo);
});

// -------------------------------------------------------------------------
// --------------------- COMMANDES LOGIN -----------------------------------
// -------------------------------------------------------------------------

Cypress.Commands.add("loginFO", (env, loginData) => {
  let URL = "URL" + env;
  cy.visit(loginData[URL]);
  cy.get('input[id="username"]').type(loginData.username);
  cy.get('input[id="password"]').type(loginData.password);
  cy.get('button[id="signin"]').click();
  cy.url().should("eq", loginData[URL]);
});

// -------------------------------------------------------------------------
// --------------------- COMMANDES HOMEPAGE --------------------------------
// -------------------------------------------------------------------------

// Selection du produit désiré
Cypress.Commands.add("SelectProduct", (market, productTitle) => {
  getIframeBody()
    .find('a[href="/souscription/produits/' + market + '"]')
    .click();
  getIframeBody()
    .find('[class="v-card__title"]')
    .contains(productTitle)
    .click();
});

// -------------------------------------------------------------------------
// COMMANDES CREATION DEVIS - Date d'effet souhaitée -----------------------
// -------------------------------------------------------------------------

// ------------- COMMANDES COMMUNES --------------------

// Selection date d'effet souhaitée
Cypress.Commands.add("DateEffet", (date) => {
  // getIframeBody().find('input[type="date"]')
  // .click()
  // .type(date)
  getIframeBody().find("button").contains("Valider").click();
});

// Coche société en cours de création
Cypress.Commands.add("EnCoursCreation", () => {
  getIframeBody()
    .find('div[class="v-input--selection-controls__input"]')
    .click();
  cy.DateEffet();
});

// -------------------------------------------------------------------------
// COMMANDES CREATION DEVIS - Tarification ---------------------------------
// -------------------------------------------------------------------------

// ------------- COMMANDES COMMUNES --------------------

// Selection du pays
Cypress.Commands.add("SelectCountry1", (data) => {
  getIframeBody().find('input[data-cy="select-country"]').click();
  getIframeBody()
    .find('div[role="option"]')
    .contains(data.pays)
    .first()
    .click();

  // getIframeBody().find('input[data-cy="select-country"]').click();
  // getIframeBody()
  //   .find('div[role="option"]:visible')
  //   .contains(country)
  //   .first()
  //   .click();
});
// Test appel à une autre commande ici
Cypress.Commands.add("TestCommande", () => {
  cy.ClickBoutonContenant("Calculer");
});
// Click sur un bouton qui contient un texte
Cypress.Commands.add("ClickBoutonContenant1", (TexteDuBouton) => {
  getIframeBody().find("button").contains(TexteDuBouton).first().click();
});
Cypress.Commands.add("ClickBoutonContenant2", (TexteDuBouton) => {
  getIframeBody().contains(TexteDuBouton).click();
});

// Nb salariés
Cypress.Commands.add("NbSalaries", (nbSalaries) => {
  getIframeBody()
    .find('input[id="Nombre de salariés"]')
    .clear()
    .type(nbSalaries.nbSalaries);
});

// Redacteur devis
Cypress.Commands.add("RedacteurDevis", (nomRedacteurDevis) => {
  getIframeBody().find('input[id="emisPar"]').type(nomRedacteurDevis.emisPar);
});

// Procédures judiciaires
Cypress.Commands.add("ProceduresJudiciaires", (data) => {
  getIframeBody()
    .find('input[id="nombreProcedures"]')
    .click()
    .type(data.nbProcedures);
});

// -------------------------------------------------------------------------
// ALSINA AGRICOLE ---------------------------------
// -------------------------------------------------------------------------

// ------------- TARIFICATION --------------------

Cypress.Commands.add("TarificationAgricole", (data) => {
  // Selection Pays
  cy.SelectCountry1(data);
  // Activité avec commercialisation directe
  getIframeBody()
    .find('input[id="Activité avec commercialisation directe"]')
    .click();
  getIframeBody()
    .find('div[role="listbox"]')
    .contains(data.commercialisationDirecte)
    .click();
  // Activité accessoire de diversification agricole
  getIframeBody().find('input[id^="Activité accessoire"]').click();
  // Non
  getIframeBody().find('div[role="option"]:visible').first().click();
  // Activité principale
  getIframeBody().find('input[id="Activité principale"]').click();
  getIframeBody()
    .find('div[role="listbox"]')
    .contains(data.activitePrincipale)
    .click();
  // Chiffre d'affaires HT
  getIframeBody().find('input[id^="Chiffre d"]').clear().type(data.CA);
  // Forme juridique de l'exploitation
  getIframeBody().find('input[id^="Forme juridique de"]').click();
  getIframeBody()
    .find('div[role="listbox"]')
    .contains(data.formeJuridique)
    .click();
  // Surface d'exploitation
  getIframeBody()
    .find('input[id^="Surface d"]')
    .clear()
    .type(data.surfaceExploitation);

  cy.ClickBoutonContenant1("Calculer");
});

// ------------- COMMANDES IMMOBILIER --------------------

// Nombre de villas
Cypress.Commands.add("NbVillas", (data) => {
  getIframeBody()
    .find('input[id^="Nombre de villas"]')
    .clear()
    .type(data.nbVillas);
});

// Nom du syndic en exercice ou du président de l'ASL raisonSociale
Cypress.Commands.add("NomSyndic", (data) => {
  getIframeBody()
    .find('input[data-cy="raisonSociale"]')
    .type(data.presidentASL);
});
// Type de gestion ASL ou Type de gestion de l'ASL
Cypress.Commands.add("TypeGestionASL", (env, data) => {
  let id = "null";
  switch (env) {
    case "re7FO":
      id = "Type de gestion ASL";
      break;
    case "intFO":
      id = "Type de gestion de l";
      break;
  }
  getIframeBody()
    .find('input[id^="' + id + '"]')
    .click();
  getIframeBody().find('div[role="option"]').contains(data.typeASL).click();
});
// Nombre de copropriétés verticales
Cypress.Commands.add("NbCoproVerticales", (data) => {
  getIframeBody()
    .find('input[name="Nombre de copropriétés verticales"]')
    .clear()
    .type(data.nbCopro);
});

// Présence d'un lot dans une résidence de tourisme
Cypress.Commands.add("LotResidenceTourisme", (data) => {
  getIframeBody()
    .find('input[id="Lot situé dans une résidence de tourisme"]')
    .click();
  getIframeBody()
    .find('div[role="option"]')
    .contains(data.presenceLotResiTou)
    .first()
    .click();
});

// Nombre total de lots
Cypress.Commands.add("NbTotalLots", (data) => {
  getIframeBody().find('input[id="Nombre total de lots"]');
  getIframeBody()
    .find('input[id="Nombre total de lots"]')
    .clear()
    .type(data.nbTotalLots);
});

// Type de copro
Cypress.Commands.add("TypeCopro", (data) => {
  getIframeBody().find('div[role="combobox"]').first().click();
  getIframeBody().find('div[role="listbox"]').contains(data).click();
});

// Type de gestion de la copro
Cypress.Commands.add("TypeGestionCopro", (data) => {
  getIframeBody().find('div[role="combobox"]').last().click();

  getIframeBody().find('div[role="listbox"]').contains(data).click();
});

// Surface développée totale (Si copropriété verticale)
Cypress.Commands.add("SurfaceDevTot", (data) => {
  getIframeBody()
    .find('input[id="Surface développée totale (Si copropriété verticale)"]')
    .clear()
    .type(data.nbMetrescarre);
});

// Nb lots (si copropriété horizontale)
Cypress.Commands.add("nbLotsCoproHoriz", (data) => {
  getIframeBody()
    .find('div[title="Nombre de lots (Si copropriété horizontale)"]')
    .clear()
    .type(data.nbLots);
});

// Nb lots
Cypress.Commands.add("nbLotsCopro", (data) => {
  getIframeBody()
    .find('input[id="Nombre de lots de la copropriété"]')
    .clear()
    .type(data.nbLots);
});

// Surface de la copropriété
Cypress.Commands.add("SurfaceCopro", (data) => {
  getIframeBody()
    .find('input[id="Surface de la copropriété"]')
    .clear()
    .type(data.nbMetrescarre);
});

// Nom Copro
Cypress.Commands.add("nomCopro", (data) => {
  getIframeBody().find('input[data-cy="nom"]').type(data.nomCopro);
});

// Tarification IMMOBILIER Copro
Cypress.Commands.add("TarificationCopro", (env, data, type) => {
  // Sélection pays
  cy.SelectCountry1(data);
  switch (type) {
    case "vertical":
      // Type de copro
      cy.TypeCopro(data.typeCopro2);
      // Type de gestion de la copro
      cy.TypeGestionCopro(data.typeGestionCopro2);
      break;
    case "horizontal":
      // Type de copro
      cy.TypeCopro(data.typeCopro1);
      // Type de gestion de la copro
      cy.TypeGestionCopro(data.typeGestionCopro1);
      break;
  }

  if (env === "re7FO") {
    // Surface développée totale (Si copropriété verticale)
    cy.SurfaceDevTot(data);
    // Nb lots (si copropriété horizontale)
    cy.nbLotsCoproHoriz(data);
  } else if (env === "intFO") {
    // Nombre de lots de la copropriété
    cy.nbLotsCopro(data);
    // Surface de la copropriété
    cy.SurfaceCopro(data);
  }
});
// ------------- COMMANDES ASSOCIATION --------------------

// Type d'association
Cypress.Commands.add("TypeAsso", (data) => {
  getIframeBody().find('input[id^="Type d"][id$="association"]').click();
  getIframeBody().find('div[role="option"]').contains(data.typeAsso).click();
});

// Nombre d'adhérents de l'association
Cypress.Commands.add("NbAdherents", (env, data) => {
  switch (env) {
    case "re7FO":
      getIframeBody()
        .find('input[id$="adhérents"]')
        .clear()
        .type(data.nbAdherents);
      break;
    case "intFO":
      getIframeBody()
        .find('input[id^="Nombre d"][id$="association"]')
        .clear()
        .type(data.nbAdherents);
      break;
  }
});

// Secteur d'activité de l'association
Cypress.Commands.add("SecteurActiviteAsso", (data) => {
  getIframeBody().find('input[id^="Secteur d"]').click();
  getIframeBody()
    .find('div[role="option"]')
    .contains(data.secteurActiviteAsso)
    .click();
});

// Forme juridique
Cypress.Commands.add("FormeJuridique", (data) => {
  getIframeBody()
    .find('div[title="Forme juridique"]')
    .type(data.formeJuridique);
});

// Forme juridique 2
Cypress.Commands.add("FormeJuridique2", (data) => {
  getIframeBody().find('input[data-cy="formeJuridique"]').click();
  getIframeBody().contains(data.formeJuridique).click();
});

// Activité statutaire précise
Cypress.Commands.add("ActiviteStatut", (data) => {
  getIframeBody().find('input[id="activite"]').type(data.activiteStatutaire);
});

// ------------- COMMANDES PROFESSIONNEL --------------------

// Nom entreprise pour SIRET
Cypress.Commands.add("NomEntrepriseSiret", (data) => {
  getIframeBody()
    .contains("Retrouver toutes les informations légales par nom")
    .parent()
    .find('[class="v-select__selections"]')
    .type(data.nomEntreprise);
  getIframeBody().find('[role="listbox"]').contains(data.siret).click();
});

// Code NAF
Cypress.Commands.add("CodeNAF", (env, data) => {
  let codeNAF = "codeNAF" + env;
  getIframeBody().find('input[id^="Code NAF"]').click().type(data[codeNAF]);
  getIframeBody().find('[role="listbox"]').contains(data[codeNAF]).click();
});

// Nombre véhicules terrestres à moteur
Cypress.Commands.add("nbVTM", (env, data) => {
  let id = "null";
  switch (env) {
    case "re7FO":
      id = "Nombre de véhicules terrestres à moteur";
      break;
    case "intFO":
      id = "Nombre de VTM";
      break;
  }
  getIframeBody()
    .find('input[id="' + id + '"]')
    .clear()
    .type(data.nbVTM);
});

// Chiffre d'affaires
Cypress.Commands.add("ChiffreAffaires", (data) => {
  getIframeBody().find('[id^="Chiffre"]').clear().type(data.CA);
});

// Activité précise
Cypress.Commands.add("ActivitePrecise", (data) => {
  getIframeBody().find('input[data-cy="activite"]').type(data.activite);
});

// Bouton radio locaux exploitation activité
Cypress.Commands.add("LocauxExploitationActivite", (data) => {
  getIframeBody()
    .find('div[id="locauxSciAvecPartsSouscripteur"]')
    .find('[class="v-input--selection-controls__ripple"]')
    .last()
    .click();
});

// ------------- COMMANDES JURILIBPRO TPE --------------------

// Adresse auto-completion
Cypress.Commands.add("Adresse3", (data) => {
  getIframeBody()
    .find('input[id="autoCompletion-addresse"]')
    .type(data.adresse1);
});

// -------------------------------------------------------------------------
// COMMANDES CREATION DEVIS - Information Complémentaires-------------------
// -------------------------------------------------------------------------

// --------------- SOUSCRIPTEUR -----------------------

// Nom
Cypress.Commands.add("NomSouscripteur", (inputData) => {
  getIframeBody().find('input[id="nom"]').type(inputData.nom);
});

// Prénom
Cypress.Commands.add("PrenomSouscripteur", (inputData) => {
  getIframeBody().find('input[id="prenom"]').type(inputData.prenom);
});

// Raison sociale avec div title
Cypress.Commands.add("RaisonSociale1", (inputData) => {
  getIframeBody()
    .find('div[title="Raison sociale"]')
    .click()
    .type(inputData.raisonSociale);
});
// Raison sociale avec data-cy
Cypress.Commands.add("RaisonSociale2", (inputData) => {
  getIframeBody()
    .find('input[data-cy="raisonSociale"]')
    .type(inputData.raisonSociale);
});
// Numéro SIRET
Cypress.Commands.add("NumeroSIRET", (inputData) => {
  getIframeBody().find('input[data-cy="input-siret"]').type(inputData.siret);
});
// Selection du pays Info Complémentaires
Cypress.Commands.add("SelectCountry2", (country) => {
  getIframeBody().find('input[data-cy="pays"]').click();
  getIframeBody()
    .find('div[role="option"]:visible')
    .contains(country.pays)
    .first()
    .click();
});
// Adresse
Cypress.Commands.add("Adresse", (inputData) => {
  getIframeBody().find('div[title="Adresse"]').first().type(inputData.adresse1);
});
// Ville
Cypress.Commands.add("Ville", (inputData) => {
  getIframeBody().find('[id="ville"]').first().click().type(inputData.ville);
});
// Ville 2
Cypress.Commands.add("Ville2", (inputData) => {
  getIframeBody()
    .find('input[id="autoCompletion-ville"]')
    .type(inputData.ville);
});
// Code Postal
Cypress.Commands.add("CodePostal", (inputData) => {
  getIframeBody()
    .find('input[data-cy="codePostal"]')
    .type(inputData.codePostal);
});

// Téléphone 1
Cypress.Commands.add("Telephone1", (inputData) => {
  getIframeBody().find('input[data-cy="telephone1"]').type(inputData.telephone);
});

// Mail 1
Cypress.Commands.add("Mail1", (inputData) => {
  getIframeBody().find('input[data-cy="mail"]').type(inputData.mail);
});

// Lieu de naissance
Cypress.Commands.add("LieuNaissance", (inputData) => {
  getIframeBody()
    .find('input[data-cy="lieuNaissance"]')
    .type(inputData.lieuNaissance);
});

// Date de naissance
Cypress.Commands.add("DateNaissance", (inputData) => {
  getIframeBody()
    .find("input[type=date]")
    .last()
    .click()
    .type(inputData.dateNaissance);
});

// --------------- REPRESENTE PAR -----------------------

// Sélection civilité 1
Cypress.Commands.add("SelectCivilite", (data) => {
  getIframeBody().find('input[data-cy="civilite"]').click();
  getIframeBody()
    .find('div[role="option"]')
    .contains(data.civilite)
    .first()
    .click();
});

// Sélection civilité 2
Cypress.Commands.add("SelectCivilite2", (data) => {
  getIframeBody().find('input[data-cy="civilite"]').click();
  getIframeBody()
    .find('div[class="v-list-item__title"]')
    .contains(data.civilite)
    .first()
    .click();
});

// Nom Représenté Par
Cypress.Commands.add("NomRepresentant", (inputData) => {
  getIframeBody().find('input[data-cy="nomRepresentant"]').type(inputData.nom);
});
// Prénom Représenté Par
Cypress.Commands.add("PrenomRepresentant", (inputData) => {
  getIframeBody().find('input[data-cy="prenom"]').type(inputData.prenom);
});
// En qualité de Représenté Par
Cypress.Commands.add("EnQualiteDe", (inputData) => {
  getIframeBody()
    .find('input[data-cy="qualiteProfessionnelle"]')
    .type(inputData.qualiteProfessionnelle);
});

// --------------- BENEFICIAIRE -----------------------

// NomAsl
Cypress.Commands.add("NomAsl", (inputData) => {
  getIframeBody().find('input[data-cy="nom"]').type(inputData.nomASL);
});
// Selection du pays beneficiaire
Cypress.Commands.add("SelectCountry3", (country) => {
  getIframeBody().find('input[data-cy="paysBeneficiaire"]').click();
  getIframeBody()
    .find('div[role="option"]:visible')
    .contains(country.pays)
    .first()
    .click();
});
// Adresse Bénéficiaire
Cypress.Commands.add("AdresseBenef", (inputData) => {
  getIframeBody()
    .find('input[id="adresse1"]')
    .type(inputData.adresse2, { force: true });
});
// Ville bénéficiaire
Cypress.Commands.add("VilleBeneficiaire", (ville) => {
  getIframeBody()
    .find('div[title="Ville"]')
    .last()
    .find("input:visible")
    .type(ville.ville);
});
// Code postal bénéficiaire
Cypress.Commands.add("codePostalBenef", (dataInfo) => {
  getIframeBody()
    .find('input[data-cy="codePostalBeneficaire"]')
    .type(dataInfo.codePostal);
});

// --------------- DESCRIPTION DU RISQUE -----------------------

// Assurance protection juridique
Cypress.Commands.add("AssuranceProtecJuri", () => {
  getIframeBody()
    .find('div[id="assuranceDejaSouscrite"]')
    .find('[class="v-input--selection-controls__ripple"]')
    .last()
    .click();
});

// Redressement judiciaire
Cypress.Commands.add("RedressementJudiciaire", () => {
  getIframeBody()
    .find('div[id="redressementJudiciaire"]')
    .find('[class="v-input--selection-controls__ripple"]')
    .last()
    .click();
});

// Variation commission courtier
Cypress.Commands.add("VariationCommissionCourtier", () => {
  getIframeBody()
    .find('div[class="v-slider__thumb primary"]')
    .trigger("mousedown", { button: 0 })
    .trigger("mousemove", { clientX: 0, clientY: 50 })
    .trigger("mouseup");
});

// Bouton Transformation en contrat
Cypress.Commands.add("ClicTransfoContrat", () => {
  getIframeBody().find('a[href^="/souscription/devis/"]').click();
});

// Fractionnement
Cypress.Commands.add("Fractionnement", (data) => {
  getIframeBody().find('input[data-cy="fractionnement"]').click();
  getIframeBody()
    .find('div[class="v-list-item__title"]')
    .contains(data.fractionnement)
    .click();
});

// Moyen de paiement
Cypress.Commands.add("MoyenPaiement", (data) => {
  getIframeBody()
    .find('input[data-cy="moyenDePaiement"]')
    .click()
    .type(data.moyenPaiement, { force: true })
    .type("{enter}", { force: true });
});

// -------------------------------------------------------------------------
// INFORMATIONS DE PAIEMENT -------------------
// -------------------------------------------------------------------------

Cypress.Commands.add("InfosPaiement", (data) => {
  cy.Fractionnement(data);
  cy.MoyenPaiement(data);
  cy.ClickBoutonContenant1("Enregistrer");
});

// Signature électronique
Cypress.Commands.add("SignatureElec", (data) => {
  cy.ClickBoutonContenant1("Signer électroniquement");
  getIframeBody().find('input[data-cy="prenom"]').type(data.prenom);
  getIframeBody().find('input[data-cy="nom"]').type(data.nom);
  getIframeBody().find('input[data-cy="mail"]').type(data.mail);
  getIframeBody().find('input[data-cy="portable"]').type(data.telephone);
  getIframeBody()
    .find('h1[class="title-helios"]')
    .parent()
    .find("button")
    .contains("Valider")
    .click();
  getIframeBody()
    .find('div[role="status"]')
    .and("contain", "Circuit de signature électronique correctement lancé")
    .should("be.visible");
});
