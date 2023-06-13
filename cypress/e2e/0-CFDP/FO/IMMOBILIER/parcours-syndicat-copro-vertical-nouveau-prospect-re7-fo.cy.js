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

    // Sélection pays
    cy.SelectCountry1(ParcoursData.FO.parcoursIMMO);

    // Type de copro
    cy.TypeCopro2(ParcoursData.FO.parcoursIMMO);

    // Type de gestion de la copro
    cy.TypeGestionCopro2(ParcoursData.re7FO.parcoursIMMO);

    // Surface développée totale (Si copropriété verticale)
    cy.SurfaceDevTot(ParcoursData.re7FO.parcoursIMMO);

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
    cy.RaisonSociale1(ParcoursData.re7FO.parcoursIMMO);

    // Pays
    cy.SelectCountry2(ParcoursData.re7FO.parcoursIMMO);

    // Forme juridique
    cy.FormeJuridique(ParcoursData.re7FO.parcoursIMMO);

    // Adresse Souscripteur
    cy.Adresse(ParcoursData.re7FO.parcoursIMMO);

    // Ville
    cy.Ville2(ParcoursData.re7FO.parcoursIMMO);

    // Code Postal
    cy.CodePostal(ParcoursData.re7FO.parcoursIMMO);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.re7FO.parcoursIMMO);

    // Nom & prénom représentant
    cy.NomRepresentant(ParcoursData.re7FO.parcoursIMMO);

    cy.PrenomRepresentant(ParcoursData.re7FO.parcoursIMMO);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.re7FO.parcoursIMMO);

    cy.wait(8000);

    // Nom de la copro
    cy.nomCopro(ParcoursData.re7FO.parcoursIMMO);

    // Pays Bénéficiaire
    cy.SelectCountry3(ParcoursData.re7FO.parcoursIMMO);

    // Adresse Bénéficiaire
    cy.AdresseBenef(ParcoursData.re7FO.parcoursIMMO);

    // Ville Bénéficiaire
    cy.VilleBeneficiaire(ParcoursData.re7FO.parcoursIMMO);

    // Code postal Bénéficiaire
    cy.codePostalBenef(ParcoursData.re7FO.parcoursIMMO);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.re7FO.parcoursIMMO);

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.re7FO.parcoursIMMO);

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
    cy.Telephone1(ParcoursData.re7FO.parcoursIMMO);

    // Mail
    cy.Mail1(ParcoursData.re7FO.parcoursIMMO);

    // Siret
    cy.NumeroSIRET(ParcoursData.re7FO.parcoursIMMO);

    cy.ClickBoutonContenant1("Étape suivante");

    // ---------------------
    // Contrat - Paiement
    // ---------------------

    cy.InfosPaiement(ParcoursData.re7FO.parcoursIMMO);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.re7FO.parcoursIMMO);
  });
});
