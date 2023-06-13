import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours JURILIB TPE SIRET FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
  });

  it("Parcours Jurilib TPE SIRET", () => {
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

    // Siret
    cy.NomEntrepriseSiret(ParcoursData.FO.parcoursJURILIBTPE);

    cy.ClickBoutonContenant1("Valider");

    // Devis réalisé

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

    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursJURILIBTPE);
    // Attente de la génération du devis
    cy.wait(5000);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursJURILIBTPE);

    // Nom & prénom représentant
    cy.NomRepresentant(ParcoursData.FO.parcoursJURILIBTPE);

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

    // Attente de la génération du devis
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
    cy.Telephone1(ParcoursData.FO.parcoursJURILIBTPE);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursJURILIBTPE);

    cy.ClickBoutonContenant1("Étape suivante");

    // Informations de paiement
    cy.InfosPaiement(ParcoursData.FO.parcoursJURILIBTPE);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi signature électronique
    // ---------------------
    cy.SignatureElec(ParcoursData.FO.parcoursJURILIBTPE);
  });
});
