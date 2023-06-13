import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ASSO SYNDICALE ERROR RE7 FO", () => {
  beforeEach(() => {
    cy.visit(ParcoursData.re7FO.login.URLsouscription);
    cy.get('input[id="username"]').type(ParcoursData.re7FO.login.username);
    cy.get('input[id="password"]').type(ParcoursData.re7FO.login.password);
    cy.get('button[id="signin"]').click();
    cy.url().should("eq", "https://espacepartenaire.re7.cfdp.fr/souscription");
  });

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

  it("Parcours Asso Syndicale Error", () => {
    let numeroDevis = "";

    // ---------------------
    // Sélection prospect + produit
    // ---------------------

    getIframeBody().find('a[href="/souscription/produits/Immobilier"]').click();
    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Association Syndicale Libre")
      .click();

    // ---------------------
    // Saisie date d'effet
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.re7FO.parcoursAGRICOLE.datedEffetPassee);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Veuillez saisir une date supérieure à la date du")
      .should("be.visible");

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le format de la date")
      .and("contain", "est pas correct")
      .should("be.visible");

    // Date d'effet dans le futur (+ d'un an)

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.re7FO.parcoursAGRICOLE.datedEffetFuture);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Veuillez saisir une date antérieure ou égale à la date du"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le format de la date")
      .and("contain", "est pas correct")
      .should("be.visible");

    // Date d'effet valide

    cy.wait(2000);

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.re7FO.parcoursAGRICOLE.datedEffetValide);

    getIframeBody().find("button").contains("Valider").click();

    // // ---------------------
    // // Devis - Informations Tarifantes
    // // ---------------------

    // Sans remplir les champs

    getIframeBody().find('input[id="Nombre de villas individuelles"]').clear();

    getIframeBody().find('input[id="Nombre de salariés"]').clear();

    getIframeBody()
      .find('input[id="Nombre de copropriétés verticales"]')
      .clear();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Sélectionner un pays est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de copropriétés verticales est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Type de gestion ASL est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nombre de villas individuelles est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nombre de salariés est obligatoire")
      .should("be.visible");

    // Sélection Pays

    getIframeBody().find('input[data-cy="select-country"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Sélectionner un pays est obligatoire")
      .should("not.exist");

    // Nombre de villas individuelles

    getIframeBody()
      .find('input[id="Nombre de villas individuelles"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbVillas);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nombre de villas individuelles est obligatoire")
      .should("not.exist");

    // Nombre de copropriétés verticales

    getIframeBody()
      .find('input[id="Nombre de copropriétés verticales"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbCopro);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nombre de copropriétés verticales est obligatoire")
      .should("not.exist");

    // Type de gestion ASL

    getIframeBody().find('input[id="Type de gestion ASL"]').click();

    // getIframeBody()
    //   .find('div[role="option"]')
    //   .contains(ParcoursData.re7FO.parcoursIMMO.typeASL)
    //   .click();
    
      cy.TypeGestionASL(ParcoursData.re7FO.parcoursIMMO.typeASL)

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Type de gestion ASL est obligatoire")
      .should("not.exist");

    // Nb salariés

    getIframeBody()
      .find('input[id="Nombre de salariés"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbSalaries);

    // CALCULER

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody().find("button").contains("Sélectionner").first().click();

    // // ---------------------
    // // Devis - Informations complémentaires
    // // ---------------------

    // Sans remplir les champs

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nom du syndic en exercice ou du président de l")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Forme juridique est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Adresse est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Ville est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Code postal est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Civilité est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nom est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ En qualité de est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "ASL est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Pays est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire"
      )
      .should("be.visible");

    // Nom du syndic en exercice ou du président de l'ASL

    getIframeBody()
      .find('input[data-cy="raisonSociale"]')
      .type(ParcoursData.re7FO.parcoursIMMO.presidentASL);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nom du syndic en exercice ou du président de l")
      .should("not.exist");

    // Pays Souscripteur

    getIframeBody().find('input[data-cy="pays"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    // Forme juridique

    getIframeBody()
      .find('div[title="Forme juridique"]')
      .type(ParcoursData.re7FO.parcoursIMMO.formeJuridique);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Forme juridique est obligatoire")
      .should("not.exist");

    // Adresse Souscripteur

    getIframeBody()
      .find('div[title="Adresse"]')
      .first()
      .type(ParcoursData.re7FO.parcoursIMMO.adresse1);

    // Ville Souscripteur

    getIframeBody()
      .find('input[id="autoCompletion-ville"]')
      .type(ParcoursData.re7FO.parcoursIMMO.ville);

    // Code Postal souscripteur

    getIframeBody()
      .find('input[data-cy="codePostal"]')
      .type(ParcoursData.re7FO.parcoursIMMO.codePostal);

    // En qualité de

    getIframeBody()
      .find('input[data-cy="qualiteProfessionnelle"]')
      .type(ParcoursData.re7FO.parcoursPRO.qualiteProfessionnelle);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ En qualité de est obligatoire")
      .should("not.exist");

    cy.wait(3000);

    // Sélection Civilité représentant

    getIframeBody().find('input[data-cy="civilite"]').click();

    getIframeBody()
      .find('div[class="v-list-item__title"]')
      .contains("Monsieur")
      .first()
      .click();

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Civilité est obligatoire")
      .should("not.exist");

    // Nom & prénom représentant

    getIframeBody()
      .find('input[data-cy="nomRepresentant"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nom);

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.prenom);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nom est obligatoire")
      .should("not.exist");

    // Wait pour attendre la génération du devis
    // cy.wait(10000)

    // Nom de l'ASL

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nomASL);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("ASL est obligatoire")
      .should("not.exist");

    // Pays Bénéficiaire

    getIframeBody()
      .find('input[data-cy="paysBeneficiaire"]')
      .type("France", { force: true });

    getIframeBody()
      .find('div[role="option"]:visible')
      .contains("France")
      .click();

    // Adresse Bénéficiaire

    getIframeBody()
      .find('input[id="adresse1"]')
      .type(ParcoursData.re7FO.parcoursIMMO.adresse1);

    getIframeBody().find("#adresse1").type(" ").click();

    // Code postal bénéficiaire

    getIframeBody()
      .find('input[data-cy="codePostalBeneficaire"]')
      .type(ParcoursData.re7FO.parcoursIMMO.codePostal);

    // Ville Bénéficiaire

    getIframeBody()
      .find('div[title="Ville"]')
      .last()
      .find("input:visible")
      .type(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire);

    // Procédures judiciaires

    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.nbProcedures);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire"
      )
      .should("not.exist");

    // Assurance protection juridique

    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('input[type="radio"]')
      .last()
      .click({ force: true });

    // Redacteur devis

    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.re7FO.parcoursIMMO.emisPar);

    // // Récupération du numéro de devis
    // getIframeBody()
    //         .find("#app")
    //         .contains("Numéro de devis")
    //         .contains("HD")
    //         .then((numDevis) => {
    //                 numeroDevis = numDevis.text();
    //                 cy.wrap(numeroDevis).as("numeroDevis");
    //         });

    // cy.wait(5000)

    getIframeBody().find("button").contains("Étape suivante").click();

    // Variation commission courtier

    getIframeBody()
      .find('div[class="v-slider__thumb primary"]')
      .trigger("mousedown", { button: 0 })
      .trigger("mousemove", { clientX: 0, clientY: 50 })
      .trigger("mouseup");

    getIframeBody().find("button").contains("Recalculer tarif").click();

    // Emettre le devis

    getIframeBody().find("button").contains("Emettre le devis").click();

    cy.wait(5000);

    // Transformer en contrat

    getIframeBody()
      .find(
        'a[class="button-visu v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default primary"]'
      )
      .click();

    // // // Checker que le devis existe dans la liste des devis
    // // cy.get('a[id="dropdown-subscribe"]')
    // //         .click();
    // // cy.get(
    // //         'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
    // // ).click();
    // // getIframeBody()
    // //         .get("@numeroDevis")
    // //         .then((numeroDevis) => {
    // //                 getIframeBody().find('input[id="input-26"]')
    // //                         .click()
    // //                         .type(numeroDevis);
    // //                 cy.wait(2000)
    // //         });
    // // getIframeBody()
    // //         .find("button")
    // //         .contains("Rechercher")
    // //         .click({ force: true });
    // // getIframeBody()
    // //         .find('[class="devis-list__container"]')
    // //         .should("contain.text", numeroDevis);
    // // cy.wait(2000)

    // // // Cliquer sur la liste des actions du devis emis
    // // getIframeBody().find('button[data-cy="listActions"]')
    // //         .click();
    // // getIframeBody()
    // //         .find('div[class="v-list-item__title"]')
    // //         .contains("Transformer en contrat")
    // //         .click();

    // Saisie de la date

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.datedEffetPassee);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Veuillez saisir une date supérieure à la date du")
      .should("be.visible");

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le format de la date")
      .and("contain", "est pas correct")
      .should("be.visible");

    // Date d'effet dans le futur (+ d'un an)

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.datedEffetFuture);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Veuillez saisir une date antérieure ou égale à la date du"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le format de la date")
      .and("contain", "est pas correct")
      .should("be.visible");

    // Date d'effet valide

    cy.wait(2000);

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.datedEffetValide);

    getIframeBody().find("button").contains("Valider").click();

    // Valider sans les champs obligatoires

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Téléphone 1 est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Mail est obligatoire")
      .should("be.visible");

    // Saisie du numéro de téléphone en laissant le champ mail vierge

    getIframeBody().find('input[data-cy="telephone1"]').type(1111);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Téléphone 1 est invalide")
      .should("be.visible");

    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.telephone);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Mail est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Téléphone 1 est obligatoire")
      .should("not.exist");

    // Saisie du mail en laissant le champ téléphone vierge

    getIframeBody().find('input[data-cy="telephone1"]').clear();

    getIframeBody().find('input[data-cy="mail"]').type(1111);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Mail est invalide")
      .should("be.visible");

    getIframeBody()
      .find('input[data-cy="mail"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.mail);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Téléphone 1 est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Mail est obligatoire")
      .should("not.exist");

    // Ajout du numéro de téléphone

    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .type(ParcoursData.re7FO.parcoursIMMO.telephone);

    getIframeBody().find("button").contains("Étape suivante").click();

    // Paiement

    getIframeBody().find("button").contains("Enregistrer").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Fractionnement est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Moyen de paiement est obligatoire")
      .should("be.visible");

    getIframeBody().find('input[data-cy="fractionnement"]').click();

    getIframeBody()
      .find('div[class="v-list-item__title"]')
      .contains(ParcoursData.re7FO.parcoursASSOCIATION.fractionnement)
      .click();

    getIframeBody()
      .find('input[data-cy="moyenDePaiement"]')
      .click()
      .type(ParcoursData.re7FO.parcoursASSOCIATION.moyenPaiement, {
        force: true,
      })
      .type("{enter}", { force: true });

    getIframeBody().find("button").contains("Enregistrer").click();

    cy.wait(30000);

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    getIframeBody().find("button").contains("Signer électroniquement").click();

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.prenom);

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nom);

    getIframeBody().find('input[data-cy="mail"]').type("1111");

    getIframeBody().find('input[data-cy="portable"]').type("AAAA");

    getIframeBody()
      .find('h1[class="title-helios"]')
      .parent()
      .find("button")
      .contains("Valider")
      .click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Téléphone  est invalide")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Mail est invalide")
      .should("be.visible");

    getIframeBody()
      .find('input[data-cy="mail"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.mail);

    getIframeBody()
      .find('input[data-cy="portable"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.telephone);

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
});
