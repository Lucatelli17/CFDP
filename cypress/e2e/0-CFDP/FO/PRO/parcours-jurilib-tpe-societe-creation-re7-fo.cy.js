import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours JURILIB TPE SOCIETE EN CREATION FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
    //cy.selectionCodeCourtier(envChoisi, ParcoursData.FO.login.codeIA);
  });

  it("Parcours Jurilib TPE Societe en creation", () => {
    // ---------------------
    // Sélection prospect & produit
    // ---------------------

    cy.SelectProduct("Professionnel", "Jurilib TPE");

    // ---------------------
    // Devis - Date d'effet souhaitée
    // ---------------------
    cy.DateEffet();

    // Sélection pays
    cy.SelectCountry1(ParcoursData.FO.parcoursJURILIBTPE);

    // Coche société en cours de création + Valider
    cy.EnCoursCreation();

    // Code NAF
    cy.CodeNAF(envChoisi, ParcoursData.FO.parcoursJURILIBTPE);

    //Nombre de salariés
    cy.NbSalaries(ParcoursData.FO.parcoursJURILIBTPE);

    //Nombre de véhicules terrestres à moteur
    cy.nbVTM(envChoisi, ParcoursData.FO.parcoursJURILIBTPE);

    // Chiffres d'affaires => ^ = commence par ...
    cy.ChiffreAffaires(ParcoursData.FO.parcoursJURILIBTPE);

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélection formule
    cy.ClickBoutonContenant1("Sélectionner");

    // Raison sociale
    cy.RaisonSociale2(ParcoursData.FO.parcoursJURILIBTPE);

    // Forme juridique
    cy.FormeJuridique2(ParcoursData.FO.parcoursJURILIBTPE);

    // Adresse
    cy.Adresse3(ParcoursData.FO.parcoursJURILIBTPE);

    // Ville
    cy.Ville2(ParcoursData.FO.parcoursJURILIBTPE);

    // Code postal
    cy.CodePostal(ParcoursData.FO.parcoursJURILIBTPE);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursJURILIBTPE);

    cy.wait(3000);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursJURILIBTPE);

    // Nom & prénom représentant
    cy.NomRepresentant(envChoisi, ParcoursData.FO.parcoursJURILIBTPE);

    cy.PrenomRepresentant(ParcoursData.FO.parcoursJURILIBTPE);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.FO.parcoursJURILIBTPE);

    // Activité précise
    cy.ActivitePrecise(ParcoursData.FO.parcoursJURILIBTPE);

    // Bouton radio locaux exploitation activité
    cy.LocauxExploitationActivite();

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redressement judiciaire
    cy.RedressementJudiciaire();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.FO.parcoursJURILIBTPE);

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
    cy.NumeroSIRET(ParcoursData.FO.parcoursJURILIBTPE);

    // Téléphone
    cy.Telephone1(ParcoursData.FO.parcoursJURILIBTPE);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursJURILIBTPE);

    cy.ClickBoutonContenant1("Étape suivante");

    // Informations de paiement
    cy.InfosPaiement(ParcoursData.FO.parcoursJURILIBTPE);

    // Check génération des documents
    cy.testBoutonRafraichir(0);

    // ---------------------
    // Envoi signature électronique
    // ---------------------
    cy.SignatureElec(ParcoursData.FO.parcoursJURILIBTPE);
  });
});
