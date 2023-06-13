import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours SYNDICAT COPRO VERTICAL RE7 FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
  });

  it("Parcours Syndicat Copro Vertical", () => {
    // Sélection prospect + produit
    cy.SelectProduct("Immobilier", "Alsina Syndicat de Copropriétaires");

    // ---------------------
    // Devis - Date d'effet souhaitée
    // ---------------------
    cy.DateEffet();

    // ---------------------
    // Devis - Tarification
    // ---------------------
    cy.TarificationCopro(envChoisi, ParcoursData.FO.parcoursIMMO, "vertical");

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélectionner la première offre
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Devis - Recherche client
    // ---------------------

    // Nouveau prospect
    cy.ClickBoutonContenant1("Nouveau prospect");

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Raison sociale
    cy.RaisonSociale1(ParcoursData.FO.parcoursIMMO);

    // Pays
    cy.SelectCountry2(ParcoursData.FO.parcoursIMMO);

    // Forme juridique
    cy.FormeJuridique(ParcoursData.FO.parcoursIMMO);

    // Adresse Souscripteur
    cy.Adresse(ParcoursData.FO.parcoursIMMO);

    // Ville
    cy.Ville2(ParcoursData.FO.parcoursIMMO);

    // Code Postal
    cy.CodePostal(ParcoursData.FO.parcoursIMMO);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursIMMO);

    // Nom & prénom représentant
    cy.NomRepresentant(ParcoursData.FO.parcoursIMMO);

    cy.PrenomRepresentant(ParcoursData.FO.parcoursIMMO);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursIMMO);

    cy.wait(8000);

    // Nom de la copro
    cy.nomCopro(ParcoursData.FO.parcoursIMMO);

    // Pays Bénéficiaire
    cy.SelectCountry3(ParcoursData.FO.parcoursIMMO);

    // Adresse Bénéficiaire
    cy.AdresseBenef(ParcoursData.FO.parcoursIMMO);

    // Ville Bénéficiaire
    cy.VilleBeneficiaire(ParcoursData.FO.parcoursIMMO);

    // Code postal Bénéficiaire
    cy.codePostalBenef(ParcoursData.FO.parcoursIMMO);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.FO.parcoursIMMO);

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.FO.parcoursIMMO);

    cy.ClickBoutonContenant1("Étape suivante");

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

    // ---------------------
    // Contrat - Informations complémentaires
    // ---------------------

    // Téléphone
    cy.Telephone1(ParcoursData.FO.parcoursIMMO);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursIMMO);

    // Siret
    cy.NumeroSIRET(ParcoursData.FO.parcoursIMMO);

    cy.ClickBoutonContenant1("Étape suivante");

    // ---------------------
    // Contrat - Paiement
    // ---------------------

    cy.InfosPaiement(ParcoursData.FO.parcoursIMMO);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.FO.parcoursIMMO);
  });
});
