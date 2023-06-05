import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours PARTICULIER RE7 FO", () => {
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

  it("Parcours Particulier", () => {
    let numeroDevis = "";

    // ---------------------
    // Sélection prospect & produit
    // ---------------------

    getIframeBody()
      .find('a[href="/souscription/produits/Particulier"]')
      .click();
    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Particulier")
      .click();
    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Devis - Informations tarifantes
    // ---------------------

    getIframeBody().find('input[data-cy="select-country"]').click();
    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();
    // CALCULER
    getIframeBody().find("button").contains("Calculer").click();
    getIframeBody().find("button").contains("Sélectionner").first().click();
    // Sélection Civilité
    getIframeBody().find('input[data-cy="civilite"]').click();
    getIframeBody().contains("Madame, Monsieur").click();
    // Nom & prénom représentant
    getIframeBody()
      .find('input[id="nom"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.nom);
    getIframeBody()
      .find('input[id="prenom"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.prenom);
    // Adresse
    getIframeBody()
      .find('div[title="Adresse"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.adresse1);
    // Ville
    getIframeBody()
      .find('input[id="ville"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.ville, { force: true });
    // Code Postal
    getIframeBody()
      .find('input[data-cy="codePostal"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.codePostal);
    //procédures judiciaires
    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.nbProcedures);
    // Assurance protection juridique
    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('[class="v-input--selection-controls__ripple"]')
      .last()
      .click();
    // Redacteur devis
    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.emisPar);
    // // Récupération du numéro de devis
    // getIframeBody()
    //         .find("#app")
    //         .contains("Numéro de devis")
    //         .contains("HD")
    //         .then((numDevis) => {
    //                 numeroDevis = numDevis.text();
    //                 cy.wrap(numeroDevis).as("numeroDevis");
    //         });
    cy.wait(5000);

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
    //     getIframeBody()
    //       .find(
    //         'a[class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default primary"]'
    //       )
    //       .click();
    getIframeBody().contains("Transformer en contrat").click();

    // // Checker que le devis existe dans la liste des devis
    // cy.get('a[id="dropdown-subscribe"]')
    //         .click();
    // cy.get(
    //         'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
    // ).click();
    // getIframeBody()
    //         .get("@numeroDevis")
    //         .then((numeroDevis) => {
    //                 getIframeBody().find('input[id="input-26"]')
    //                         .click()
    //                         .type(numeroDevis);
    //                 cy.wait(2000)
    //         });
    // getIframeBody()
    //         .find("button")
    //         .contains("Rechercher")
    //         .click({ force: true });
    // getIframeBody()
    //         .find('[class="devis-list__container"]')
    //         .should("contain.text", numeroDevis);
    // cy.wait(2000)
    // // Cliquer sur la liste des actions du devis emis
    // getIframeBody().find('button[data-cy="listActions"]')
    //         .first()
    //         .click();
    // getIframeBody()
    //         .find('div[class="v-list-item__title"]')
    //         .contains("Transformer en contrat")
    //         .click();

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.telephone);
    getIframeBody()
      .find('input[data-cy="mail"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.mail);
    getIframeBody()
      .find('input[data-cy="lieuNaissance"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.lieuNaissance);
    getIframeBody()
      .find("input[type=date]")
      .last()
      .click()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.dateNaissance);
    getIframeBody().find("button").contains("Étape suivante").click();
    getIframeBody().find('input[data-cy="fractionnement"]').click();
    getIframeBody()
      .find('div[class="v-list-item__title"]')
      .contains(ParcoursData.re7FO.parcoursPARTICULIER.fractionnement)
      .click();
    getIframeBody()
      .find('input[data-cy="moyenDePaiement"]')
      .click()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.moyenPaiement, {
        force: true,
      })
      .type("{enter}", { force: true });
    getIframeBody().find("button").contains("Enregistrer").click();
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    getIframeBody().find("button").contains("Signer électroniquement").click();
    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.prenom);
    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.nom);
    getIframeBody()
      .find('input[data-cy="mail"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.mail);
    getIframeBody()
      .find('input[data-cy="portable"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.telephone);
    getIframeBody()
      .find('h1[class="title-helios"]')
      .parent()
      .find("button")
      .contains("Valider")
      .click();
    getIframeBody()
      .find('div[role="status"]')
      .should("be.visible")
      .and("contain", "Circuit de signature électronique correctement lancé");
  });
});
