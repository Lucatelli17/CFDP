import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours JURILIB PRO SIRET FO", () => {
  // let envChoisi = ParcoursData.environnementChoisi;
  // Le produit Jurilib Pro n'existe pas sur Int
  let envChoisi = "re7FO";

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
  });

  it("Parcours Jurilib PRO SIRET", () => {
    // ---------------------
    // Sélection prospect & produit
    // ---------------------
    cy.SelectProduct("Professionnel", "Jurilib PRO");

    // ---------------------
    // Devis - Date d'effet souhaitée
    // ---------------------
    cy.DateEffet();

    // Sélection pays
    cy.SelectCountry1(ParcoursData.FO.parcoursJURILIBPRO);

    // Siret
    cy.NomEntrepriseSiret(ParcoursData.FO.parcoursJURILIBPRO);

    cy.ClickBoutonContenant1("Valider");

    // Devis réalisé

    // Code NAF
    cy.CodeNAF(envChoisi, ParcoursData.FO.parcoursJURILIBPRO);

    //Nombre de salariés
    cy.NbSalaries(ParcoursData.FO.parcoursJURILIBPRO);

    //Nombre de véhicules terrestres à moteur
    cy.nbVTM(envChoisi, ParcoursData.FO.parcoursJURILIBPRO);

    // Chiffres d'affaires => ^ = commence par ...
    cy.ChiffreAffaires(ParcoursData.FO.parcoursJURILIBPRO);

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélection formule
    cy.ClickBoutonContenant1("Sélectionner");

    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursJURILIBPRO);

    cy.wait(5000);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursJURILIBPRO);

    // Nom & prénom représentant
    cy.NomRepresentant(ParcoursData.FO.parcoursJURILIBPRO);

    cy.PrenomRepresentant(ParcoursData.FO.parcoursJURILIBPRO);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.FO.parcoursJURILIBPRO);

    // Activité précise
    cy.ActivitePrecise(ParcoursData.FO.parcoursJURILIBPRO);

    // Bouton radio locaux exploitation activité
    cy.LocauxExploitationActivite();

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redressement judiciaire
    cy.RedressementJudiciaire();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.FO.parcoursJURILIBPRO);

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

    // Téléphone
    cy.Telephone1(ParcoursData.FO.parcoursJURILIBPRO);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursJURILIBPRO);

    cy.ClickBoutonContenant1("Étape suivante");

    // Informations de paiement
    cy.InfosPaiement(ParcoursData.FO.parcoursJURILIBPRO);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi signature électronique
    // ---------------------
    cy.SignatureElec(ParcoursData.FO.parcoursJURILIBPRO);
  });
});
