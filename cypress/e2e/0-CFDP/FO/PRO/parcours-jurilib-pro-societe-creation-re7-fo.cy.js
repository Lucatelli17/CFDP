import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours JURILIB PRO SOCIETE EN CREATION FO", () => {
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

  it("Parcours Jurilib PRO Societe en creation", () => {
    let numeroDevis = "";

    // ---------------------
    // Sélection prospect & produit
    // ---------------------
    cy.SelectProduct("Professionnel", "Jurilib PRO");

    // ---------------------
    // Devis - Date d'effet souhaitée
    // ---------------------
    cy.DateEffet();

    // Sélection pays
    cy.SelectCountry1(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Coche société en cours de création + Valider
    cy.EnCoursCreation();

    // Code NAF
    cy.CodeNAF(ParcoursData.re7FO.parcoursJURILIBPRO);

    //Nombre de salariés
    cy.NbSalaries(ParcoursData.re7FO.parcoursJURILIBPRO);

    //Nombre de véhicules terrestres à moteur
    cy.nbVTM(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Chiffres d'affaires => ^ = commence par ...
    cy.ChiffreAffaires(ParcoursData.re7FO.parcoursJURILIBPRO);

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélection formule
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Informations complémentaires
    // ---------------------

    // Raison sociale
    cy.RaisonSociale2(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Forme juridique
    cy.FormeJuridique2(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Adresse
    cy.Adresse3(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Ville
    cy.Ville2(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Code postal
    cy.CodePostal(ParcoursData.re7FO.parcoursJURILIBPRO);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.re7FO.parcoursJURILIBPRO);

    cy.wait(3000);

    // Sélection Civilité
    cy.SelectCivilite2(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Nom & prénom représentant
    cy.NomRepresentant(ParcoursData.re7FO.parcoursJURILIBPRO);

    cy.PrenomRepresentant(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Activité précise
    cy.ActivitePrecise(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Bouton radio locaux exploitation activité
    cy.LocauxExploitationActivite();

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redressement judiciaire
    cy.RedressementJudiciaire();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.re7FO.parcoursJURILIBPRO);

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

    // Date effet du contrat
    cy.DateEffet();

    // Siret
    cy.NumeroSIRET(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Téléphone
    cy.Telephone1(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Mail
    cy.Mail1(ParcoursData.re7FO.parcoursJURILIBPRO);

    cy.ClickBoutonContenant1("Étape suivante");

    // Informations de paiement
    cy.InfosPaiement(ParcoursData.re7FO.parcoursJURILIBPRO);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi signature électronique
    // ---------------------
    cy.SignatureElec(ParcoursData.re7FO.parcoursJURILIBPRO);
  });
});
