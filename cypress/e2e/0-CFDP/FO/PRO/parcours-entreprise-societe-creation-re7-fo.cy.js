import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ENTREPRISE SOCIETE EN CREATION FO", () => {
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

  it("Parcours Entreprise Societe en creation", () => {
    let numeroDevis = "";

    // ---------------------
    // Sélection prospect & produit
    // ---------------------

    //Sélection prospect + produit
    cy.SelectProduct("Professionnel", "Alsina Entreprise");

    // Sélection date
    cy.DateEffet();

    // Sélection pays
    cy.SelectCountry1(ParcoursData.re7FO.parcoursENTREPRISE);

    cy.EnCoursCreation();

    // Code NAF
    cy.CodeNAF(ParcoursData.re7FO.parcoursENTREPRISE);

    //Nombre de salariés
    cy.NbSalaries(ParcoursData.re7FO.parcoursENTREPRISE);

    //Nombre de véhicules terrestres à moteur
    cy.nbVTM(ParcoursData.re7FO.parcoursENTREPRISE);

    // Chiffres d'affaires => ^ = commence par ...
    cy.ChiffreAffaires(ParcoursData.re7FO.parcoursENTREPRISE);

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélection formule
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Informations complémentaires
    // ---------------------

    // Raison sociale
    cy.RaisonSociale2(ParcoursData.re7FO.parcoursENTREPRISE);

    // Forme juridique
    cy.FormeJuridique2(ParcoursData.re7FO.parcoursENTREPRISE);

    // Adresse
    cy.Adresse3(ParcoursData.re7FO.parcoursENTREPRISE);

    // Ville
    cy.Ville2(ParcoursData.re7FO.parcoursENTREPRISE);

    // Code postal
    cy.CodePostal(ParcoursData.re7FO.parcoursENTREPRISE);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.re7FO.parcoursENTREPRISE);

    cy.wait(5000);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.re7FO.parcoursENTREPRISE);

    // Nom & prénom représentant
    cy.NomRepresentant(ParcoursData.re7FO.parcoursENTREPRISE);
    cy.PrenomRepresentant(ParcoursData.re7FO.parcoursENTREPRISE);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.re7FO.parcoursENTREPRISE);

    // Activité précise
    cy.ActivitePrecise(ParcoursData.re7FO.parcoursENTREPRISE);

    // Bouton radio locaux exploitation activité
    cy.LocauxExploitationActivite();

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redressement judiciaire
    cy.RedressementJudiciaire();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.re7FO.parcoursENTREPRISE);

    cy.ClickBoutonContenant1("Étape suivante");

    cy.wait(5000);

    // Variation commission courtier
    cy.VariationCommissionCourtier();

    cy.ClickBoutonContenant1("Recalculer tarif");

    // Emettre le devis

    cy.ClickBoutonContenant1("Emettre le devis");

    cy.wait(5000);

    // Transformer en contrat
    cy.ClicTransfoContrat();

    // Saisie date d'effet du contrat
    cy.DateEffet();

    // Téléphone
    cy.Telephone1(ParcoursData.re7FO.parcoursENTREPRISE);

    // Mail
    cy.Mail1(ParcoursData.re7FO.parcoursENTREPRISE);

    // Siret
    cy.NumeroSIRET(ParcoursData.re7FO.parcoursENTREPRISE);

    cy.ClickBoutonContenant1("Étape suivante");

    // Informations de paiement
    cy.InfosPaiement(ParcoursData.re7FO.parcoursENTREPRISE);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.re7FO.parcoursENTREPRISE);
  });
});
