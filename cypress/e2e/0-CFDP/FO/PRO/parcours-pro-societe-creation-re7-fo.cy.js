import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours PRO SOCIETE EN CREATION FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
    //cy.selectionCodeCourtier(envChoisi, ParcoursData.FO.login.codeIA);
  });

  it("Parcours Pro Societe en creation", () => {
    // ---------------------
    // Sélection prospect & produit
    // ---------------------

    //Sélection prospect + produit
    cy.SelectProduct("Professionnel", "Alsina Professionnel");

    // Sélection date
    cy.DateEffet();

    // Sélection pays
    cy.SelectCountry1(ParcoursData.FO.parcoursPRO);

    // Coche société en cours de création
    cy.EnCoursCreation();

    // Code NAF
    cy.CodeNAF(envChoisi, ParcoursData.FO.parcoursPRO);

    //Nombre de salariés
    cy.NbSalaries(ParcoursData.FO.parcoursPRO);

    //Nombre de véhicules terrestres à moteur
    cy.nbVTM(envChoisi, ParcoursData.FO.parcoursPRO);

    // Chiffres d'affaires => ^ = commence par ...
    cy.ChiffreAffaires(ParcoursData.FO.parcoursPRO);

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélection formule
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Informations complémentaires
    // ---------------------

    // Raison sociale
    cy.RaisonSociale2(ParcoursData.FO.parcoursPRO);

    // Forme juridique
    cy.FormeJuridique2(ParcoursData.FO.parcoursPRO);

    // Adresse
    cy.Adresse3(ParcoursData.FO.parcoursPRO);

    // Code postal
    cy.CodePostal(ParcoursData.FO.parcoursPRO);

    // Ville
    cy.Ville2(ParcoursData.FO.parcoursPRO);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursPRO);

    cy.wait(5000);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursPRO);

    // Nom & prénom représentant
    cy.NomRepresentant(envChoisi, ParcoursData.FO.parcoursPRO);
    cy.PrenomRepresentant(ParcoursData.FO.parcoursPRO);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.FO.parcoursPRO);

    // Code NAF des infos complémentaires
    if (envChoisi === "intFO") {
      cy.CodeNAFInfoComplementaires(ParcoursData.FO.parcoursPRO);
    }

    // Activité précise
    cy.ActivitePrecise(ParcoursData.FO.parcoursPRO);

    // Bouton radio locaux exploitation activité
    cy.LocauxExploitationActivite();

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redressement judiciaire
    cy.RedressementJudiciaire();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.FO.parcoursPRO);

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

    cy.ClickBoutonContenant1("Valider");

    // Informations complémentaires

    // Téléphone
    cy.Telephone1(ParcoursData.FO.parcoursPRO);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursPRO);

    // Siret
    cy.NumeroSIRET(ParcoursData.FO.parcoursPRO);

    cy.ClickBoutonContenant1("Étape suivante");

    // Moyens de paiement
    cy.InfosPaiement(ParcoursData.FO.parcoursPRO);

    // Check génération des documents
    cy.testBoutonRafraichir(0);

    // ---------------------
    // Envoi signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.FO.parcoursPRO);
  });
});
