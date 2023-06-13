import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ENTREPRISE SOCIETE EN CREATION FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
  });

  it("Parcours Entreprise Societe en creation", () => {
    // ---------------------
    // Sélection prospect & produit
    // ---------------------
    //Sélection prospect + produit
    cy.SelectProduct("Professionnel", "Alsina Entreprise");
    // Sélection date
    cy.DateEffet();
    // Sélection pays
    cy.SelectCountry1(ParcoursData.FO.parcoursENTREPRISE);
    cy.EnCoursCreation();
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
    // ---------------------
    // Informations complémentaires
    // ---------------------
    // Raison sociale
    cy.RaisonSociale2(ParcoursData.FO.parcoursENTREPRISE);
    // Forme juridique
    cy.FormeJuridique2(ParcoursData.FO.parcoursENTREPRISE);
    // Adresse
    cy.Adresse3(ParcoursData.FO.parcoursENTREPRISE);
    // Ville
    cy.Ville2(ParcoursData.FO.parcoursENTREPRISE);
    // Code postal
    cy.CodePostal(ParcoursData.FO.parcoursENTREPRISE);
    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursENTREPRISE);
    // Attente de la génération du devis
    cy.wait(5000);
    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursENTREPRISE);
    // Nom & prénom représentant
    cy.NomRepresentant(ParcoursData.FO.parcoursENTREPRISE);
    cy.PrenomRepresentant(ParcoursData.FO.parcoursENTREPRISE);
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
    // Siret
    cy.NumeroSIRET(ParcoursData.FO.parcoursENTREPRISE);
    cy.ClickBoutonContenant1("Étape suivante");
    // Informations de paiement
    cy.InfosPaiement(ParcoursData.FO.parcoursENTREPRISE);
    // Check génération des documents
    cy.testBoutonRafraichir();
    // ---------------------
    // Envoi de la signature électronique
    // ---------------------
    cy.SignatureElec(ParcoursData.FO.parcoursENTREPRISE);
  });
});
