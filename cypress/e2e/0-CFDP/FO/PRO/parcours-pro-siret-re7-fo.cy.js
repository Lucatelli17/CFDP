import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours PRO SIRET FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
    cy.selectionCodeCourtier(envChoisi, ParcoursData.FO.login.codeIA);
  });

  it("Parcours Pro Siret", () => {
    // ---------------------
    // Sélection prospect + produit
    // ---------------------

    //Sélection prospect + produit
    cy.SelectProduct("Professionnel", "Alsina Professionnel");

    // Sélection date
    cy.DateEffet();

    // Sélection pays
    cy.SelectCountry1(ParcoursData.FO.parcoursPRO);

    // Nom entreprise SIRET
    cy.NomEntrepriseSiret(ParcoursData.FO.parcoursPRO);

    cy.ClickBoutonContenant1("Valider");

    // Devis réalisé

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

    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursPRO);

    cy.wait(3000);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursPRO);

    // Nom & prénom représentant
    cy.NomRepresentant(envChoisi, ParcoursData.FO.parcoursPRO);
    cy.PrenomRepresentant(ParcoursData.FO.parcoursPRO);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.FO.parcoursPRO);

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
