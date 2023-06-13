import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ASSOCIATION RE7 FO", () => {
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

  it("Association", () => {
    let numeroDevis = "";
    cy.SelectProduct("Association", "Alsina Association");

    cy.DateEffet();

    // ---------------------
    // Devis - Informations tarifantes
    // ---------------------

    // Sélection pays
    cy.SelectCountry1(ParcoursData.re7FO.parcoursASSOCIATION);

    // Type d'association
    cy.TypeAsso(ParcoursData.re7FO.parcoursASSOCIATION);

    // Nombre d'adhérents
    cy.NbAdherents(ParcoursData.re7FO.parcoursASSOCIATION);

    // Secteur d'activité de l'association
    cy.SecteurActiviteAsso(ParcoursData.re7FO.parcoursASSOCIATION);

    // Nombre de salariés
    cy.NbSalaries(ParcoursData.re7FO.parcoursASSOCIATION);

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélection formule tarification
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Raison sociale
    cy.RaisonSociale2(ParcoursData.re7FO.parcoursASSOCIATION);

    // Adresse Souscripteur
    cy.Adresse(ParcoursData.re7FO.parcoursASSOCIATION);

    // Ville Souscripteur
    cy.Ville2(ParcoursData.re7FO.parcoursASSOCIATION);

    // Code Postal Souscripteur
    cy.CodePostal(ParcoursData.re7FO.parcoursASSOCIATION);

    // Forme juridique
    cy.FormeJuridique(ParcoursData.re7FO.parcoursASSOCIATION);

    // Sélection Civilité représentant
    cy.SelectCivilite(ParcoursData.re7FO.parcoursASSOCIATION);

    // Nom & prénom représentant
    cy.NomRepresentant(ParcoursData.re7FO.parcoursASSOCIATION);
    cy.PrenomRepresentant(ParcoursData.re7FO.parcoursASSOCIATION);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.re7FO.parcoursASSOCIATION);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.re7FO.parcoursASSOCIATION);

    // Activité statutaire précise
    cy.ActiviteStatut(ParcoursData.re7FO.parcoursASSOCIATION);

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.re7FO.parcoursASSOCIATION);

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

    // Téléphone
    cy.Telephone1(ParcoursData.re7FO.parcoursASSOCIATION);

    // Mail
    cy.Mail1(ParcoursData.re7FO.parcoursASSOCIATION);

    cy.ClickBoutonContenant1("Étape suivante");

    // ---------------------
    // Informations de paiement
    // ---------------------
    cy.InfosPaiement(ParcoursData.re7FO.parcoursASSOCIATION);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.re7FO.parcoursASSOCIATION);
  });
});
