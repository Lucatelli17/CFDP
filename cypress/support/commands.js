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

Cypress.Commands.add("login", (username, password) => {
  cy.get('input[id="username"]').type(username);
  cy.get('input[id="password"]').type(password);
  cy.get('button[id="signin"]').click();
  cy.url().should("eq", "https://espacepartenaire.re7.cfdp.fr/souscription");
});

// Selection du produit désiré
Cypress.Commands.add("SelectProduct", (market, productTitle) => {
  getIframeBody()
    .find('a[href="/souscription/produits/' + market + '"]')
    .click();
  getIframeBody()
    .find('[class="v-card__title"]')
    .contains(productTitle)
    .click();
  getIframeBody().find("button").contains("Valider").click();
});

// Selection du pays
Cypress.Commands.add("SelectCountry", (data, country) => {
  getIframeBody()
    .find('input[data-cy="' + data + '"]')
    .click();
  getIframeBody()
    .find('div[role="option"]:visible')
    .contains(country)
    .first()
    .click();
});

// Nombre de villas individuelles
Cypress.Commands.add("NbVillasIndividuelles", (nbVillas) => {
  getIframeBody()
    .find('input[id="Nombre de villas individuelles"]')
    .clear()
    .type(nbVillas);
});

// Type de gestion ASL
Cypress.Commands.add("TypeGestionASL", (typeASL) => {
  getIframeBody().find('input[id="Type de gestion ASL"]').click();
  getIframeBody().find('div[role="option"]').contains(typeASL).click();
});

// Nb salariés
Cypress.Commands.add("NbSalaries", (nbSalaries) => {
  getIframeBody()
    .find('input[id="Nombre de salariés"]')
    .clear()
    .type(nbSalaries);
});

// Click sur un bouton qui contient un texte
Cypress.Commands.add("ClickBoutonContenant", (TexteDuBouton) => {
  getIframeBody().find("button").contains(TexteDuBouton).first().click();
});

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

// Sélection civilité
Cypress.Commands.add("SelectCivilite", (civilite) => {
  getIframeBody().find('input[data-cy="civilite"]').click();
  getIframeBody().find('div[role="option"]').contains(civilite).first().click();
});

// Ville bénéficiaire
Cypress.Commands.add("VilleBeneficiaire", (ville) => {
  getIframeBody()
    .find('div[title="Ville"]')
    .last()
    .find("input:visible")
    .type(ville);
});

// Assurance protection juridique
Cypress.Commands.add("AssuranceProtecJuri", () => {
  getIframeBody()
    .find('div[id="assuranceDejaSouscrite"]')
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

Cypress.Commands.add("ClicTransfoContrat", () => {
  getIframeBody().find('a[href^="/souscription/devis/"]').click();
});

Cypress.Commands.add("Fractionnement", (typeFractionnement) => {
  getIframeBody().find('input[data-cy="fractionnement"]').click();
  getIframeBody()
    .find('div[class="v-list-item__title"]')
    .contains(typeFractionnement)
    .click();
});

Cypress.Commands.add("MoyenPaiement", (typePaiement) => {
  getIframeBody()
    .find('input[data-cy="moyenDePaiement"]')
    .click()
    .type(typePaiement, { force: true })
    .type("{enter}", { force: true });
});

Cypress.Commands.add("SignatureElec", (data) => {
  cy.ClickBoutonContenant("Signer électroniquement");
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
      .should("be.visible")
      .and("contain", "Circuit de signature électronique correctement lancé");
});
