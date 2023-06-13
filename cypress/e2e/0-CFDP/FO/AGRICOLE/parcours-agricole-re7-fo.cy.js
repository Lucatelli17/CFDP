import ParcoursData from "../../../../fixtures/dataCFDP.json";
import { faker } from "@faker-js/faker";

describe("parcours AGRICOLE RE7 FO", () => {
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

  it("Agricole", () => {
    let numeroDevis = "";

    // ---------------------
    // Sélection prospect + produit
    // ---------------------

    //Sélection prospect + produit
    cy.SelectProduct("Agricole", "Alsina Agricole");

    // Sélection date
    cy.DateEffet();

    // ---------------------
    // Devis - Informations tarifantes
    // ---------------------

    cy.TarificationAgricole(ParcoursData.re7FO.parcoursAGRICOLE);

    // Sélection tarification
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Raison sociale
    cy.RaisonSociale2(ParcoursData.re7FO.parcoursAGRICOLE);

    // Adresse Souscripteur
    cy.Adresse(ParcoursData.re7FO.parcoursAGRICOLE);

    // Ville
    cy.Ville2(ParcoursData.re7FO.parcoursAGRICOLE);

    // Code Postal
    cy.CodePostal(ParcoursData.re7FO.parcoursAGRICOLE);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.re7FO.parcoursAGRICOLE);

    // Nom & prénom représentant

    cy.NomRepresentant(ParcoursData.re7FO.parcoursAGRICOLE);

    cy.PrenomRepresentant(ParcoursData.re7FO.parcoursAGRICOLE);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.re7FO.parcoursPRO);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.re7FO.parcoursAGRICOLE);

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redressement judiciaire
    cy.RedressementJuri();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.re7FO.parcoursAGRICOLE);

    cy.wait(5000);

    cy.ClickBoutonContenant1("Étape suivante");

    // Variation commission courtier
    cy.VariationCommissionCourtier();

    cy.ClickBoutonContenant1("Recalculer tarif");

    // Emettre le devis
    cy.ClickBoutonContenant1("Emettre le devis");

    cy.wait(5000);

    // Transformer en contrat

    cy.ClicTransfoContrat();

    cy.ClickBoutonContenant1("Valider");

    // ---------------------
    // Informations complémentaires (contrat)
    // ---------------------

    // Téléphone
    cy.Telephone1(ParcoursData.re7FO.parcoursAGRICOLE);

    // Mail
    cy.Mail1(ParcoursData.re7FO.parcoursAGRICOLE);

    cy.ClickBoutonContenant1("Étape suivante");

    // ---------------------
    // Informations de paiement
    // ---------------------
    cy.InfosPaiement(ParcoursData.re7FO.parcoursAGRICOLE);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.re7FO.parcoursAGRICOLE);
  });
});
