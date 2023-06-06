import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours IMMOBILIER Alsina patrimoine immobilier FO", () => {
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

  it("Parcours Patrimoine", () => {
    let numeroDevis = "";

    // ---------------------
    // Sélection du prospect + produit
    // ---------------------

    getIframeBody().find('a[href="/souscription/produits/Immobilier"]').click();

    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Patrimoine Immobilier")
      .click();

    // ---------------------
    // Devis - Date d'effet souhaitée
    // ---------------------

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Devis - Tarification
    // ---------------------

    // Selectionner un pays

    getIframeBody().find('input[data-cy="select-country"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    // Présence d'un lot dans une résidence de tourisme

    getIframeBody().find('input[data-cy="21"]').click();

    getIframeBody().find('div[role="option"]').contains("Non").first().click();

    // Nombre total de lots

    getIframeBody().find('input[id="Nombre total de lots"]');
    getIframeBody()
      .find('input[id="Nombre total de lots"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.nbTotalLots);

    // Calculer le tarif

    getIframeBody().find("button").contains("Calculer").click();

    // Sélectionner la première offre

    getIframeBody().find("button").contains("Sélectionner").first().click();

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Civilité

    getIframeBody().find('input[data-cy="civilite"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("Monsieur")
      .first()
      .click();

    // Nom

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nom);

    // Prénom

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.prenom);

    // Date de naissance

    getIframeBody()
      .find("input[type=date]")
      .last()
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.dateNaissance);

    // Lieu de Naissance

    getIframeBody()
      .find('input[data-cy="lieuNaissance"]')
      .type(ParcoursData.re7FO.parcoursIMMO.lieuNaissance);

    // Adresse

    getIframeBody()
      .find('input[id="adresse1"]')
      .type(ParcoursData.re7FO.parcoursIMMO.adresse1);

    // Ville

    getIframeBody().find('input[id="ville"]').click().type("Lille");

    // Code Postal

    getIframeBody().find('input[id="codePostal"]').click().type("92210");

    // Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ?

    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.nbProcedures);

    // Avez-vous déjà souscrit à une assurance de protection juridique ?

    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('[class="v-input--selection-controls__ripple"]')
      .last()
      .click();

    // Redacteur devis

    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.re7FO.parcoursIMMO.emisPar);

    // // Récupération du numéro de devis

    // getIframeBody()
    //   .find("#app")
    //   .contains("Numéro de devis")
    //   .contains("HD")
    //   .then((numDevis) => {
    //     numeroDevis = numDevis.text();
    //     cy.wrap(numeroDevis).as("numeroDevis");
    //   });

    // ---------------------
    // Devis - Récapitulatif du devis en cours
    // ---------------------

    cy.wait(8000);

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
    getIframeBody().contains("Transformer en contrat").click();

    // ---------------------
    // Vérification de la présence du devis dans la liste des devis
    // ---------------------

    // // Navigation vers la liste des devis

    // cy.get('a[id="dropdown-subscribe"]')
    //   .click();

    // cy.get(
    //   'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
    // ).click();

    // // Recherche du devis via le numéro du devis

    // getIframeBody()
    //   .get("@numeroDevis")
    //   .then((numeroDevis) => {
    //     getIframeBody().find('input[id="input-26"]')
    //       .click()
    //       .type(numeroDevis);
    //   });

    // cy.wait(2000)

    // getIframeBody()
    //   .find("button")
    //   .contains("Rechercher")
    //   .click({ force: true });

    // // Vérification de la présence du numéro du devis dans la liste des devis affichés

    // getIframeBody()
    //   .find('[class="devis-list__container"]')
    //   .should("contain.text", numeroDevis);

    // cy.wait(2000)

    // // Cliquer sur la liste des actions du devis et sur transformer en contrat

    // getIframeBody().find('button[data-cy="listActions"]')
    //   .click();

    // getIframeBody()
    //   .find('div[class="v-list-item__title"]')
    //   .contains("Transformer en contrat")
    //   .click();

    // ---------------------
    // Contrat - Date d'effet souhaitée
    // ---------------------

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Contrat - Informations complémentaires
    // ---------------------

    // Lieu de naissance

    getIframeBody()
      .find('input[data-cy="lieuNaissance"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.lieuNaissance);

    // Date de naissance

    getIframeBody()
      .find("input[type=date]")
      .last()
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.dateNaissance);

    // Téléphone

    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .type(ParcoursData.re7FO.parcoursIMMO.telephone);

    // Mail

    getIframeBody()
      .find('input[data-cy="mail"]')
      .type(ParcoursData.re7FO.parcoursIMMO.mail);

    // Etape suivante

    getIframeBody().find("button").contains("Étape suivante").click();

    // ---------------------
    // Contrat - Paiement
    // ---------------------

    // Fractionnement

    getIframeBody().find('input[data-cy="fractionnement"]').click();

    getIframeBody()
      .find('div[class="v-list-item__title"]')
      .contains(ParcoursData.re7FO.parcoursIMMO.fractionnement)
      .click();

    // Moyen de paiement

    getIframeBody()
      .find('input[data-cy="moyenDePaiement"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.moyenPaiement, {
        force: true,
      })
      .type("{enter}", { force: true });

    // Enregistrer

    getIframeBody().find("button").contains("Enregistrer").click();

    // Attente pour le chargement des documents

    cy.wait(35000);

    // ---------------------
    // Contrat - Récapitulatif et Signature
    // ---------------------

    // Signer électroniquement

    getIframeBody().find("button").contains("Signer électroniquement").click();

    // Prénom de la signature

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.prenom);

    // Nom de la signature

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nom);

    // Mail de la signature

    getIframeBody()
      .find('input[data-cy="mail"]')
      .type(ParcoursData.re7FO.parcoursIMMO.mail);

    // Téléphone de la signature

    getIframeBody()
      .find('input[data-cy="portable"]')
      .type(ParcoursData.re7FO.parcoursIMMO.telephone);

    // Valider la signature

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
