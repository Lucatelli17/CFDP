import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ENTREPRISE SIRET FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
    //cy.selectionCodeCourtier(envChoisi, ParcoursData.FO.login.codeIA);
  });

  it("Parcours Entreprise Siret", () => {
    //Sélection prospect + produit
    cy.SelectProduct("Professionnel", "Alsina Entreprise");

    // Sélection date
    cy.DateEffet();

    // Sélection pays
    cy.SelectCountry1(ParcoursData.FO.parcoursENTREPRISE);

    // Nom entreprise SIRET
    cy.NomEntrepriseSiret(ParcoursData.FO.parcoursENTREPRISE);

    cy.ClickBoutonContenant1("Valider");

    // Devis réalisé

    // Code NAF
    cy.CodeNAF(envChoisi, ParcoursData.FO.parcoursENTREPRISE);

    //Nombre de salariés
    cy.NbSalaries(ParcoursData.FO.parcoursENTREPRISE);

    //Nombre de véhicules terrestres à moteur
    cy.nbVTM(envChoisi, ParcoursData.FO.parcoursENTREPRISE);

    // Chiffres d'affaires => ^ = commence par ...
    cy.ChiffreAffaires(ParcoursData.FO.parcoursENTREPRISE);

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélection formule
    cy.ClickBoutonContenant1("Sélectionner");

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.FO.parcoursENTREPRISE);

    // Activité précise
    cy.ActivitePrecise(ParcoursData.FO.parcoursENTREPRISE);

    // Bouton radio locaux exploitation activité
    cy.LocauxExploitationActivite();

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redressement judiciaire
    cy.RedressementJudiciaire();

    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursENTREPRISE);

    cy.wait(3000);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursENTREPRISE);

    // Nom & prénom représentant
    cy.NomRepresentant(envChoisi, ParcoursData.FO.parcoursENTREPRISE);
    cy.PrenomRepresentant(ParcoursData.FO.parcoursENTREPRISE);

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.FO.parcoursENTREPRISE);

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
    cy.Telephone1(ParcoursData.FO.parcoursENTREPRISE);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursENTREPRISE);

    cy.ClickBoutonContenant1("Étape suivante");

    // Informations de paiement
    cy.InfosPaiement(ParcoursData.FO.parcoursENTREPRISE);

    // Check génération des documents
    cy.testBoutonRafraichir(0);

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.FO.parcoursENTREPRISE);
  });
});
