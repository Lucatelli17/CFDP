import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours AGRICOLE FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
    cy.selectionCodeCourtier(envChoisi, ParcoursData.FO.login.codeIA);
  });

  it("Agricole", () => {
    // ---------------------
    // Sélection prospect + produit
    // ---------------------

    //Sélection prospect + produit
    cy.SelectProduct("Agricole", "Alsina Agricole");

    // Sélection date
    cy.DateEffet();

    // ---------------------
    // Devis - Informations tarifantes
    // ---------------------

    cy.TarificationAgricole(ParcoursData.FO.parcoursAGRICOLE);

    // Sélection tarification
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Raison sociale
    cy.RaisonSociale2(ParcoursData.FO.parcoursAGRICOLE);

    // Adresse Souscripteur
    cy.Adresse(ParcoursData.FO.parcoursAGRICOLE);

    // Ville
    cy.Ville2(ParcoursData.FO.parcoursAGRICOLE);

    // Code Postal
    cy.CodePostal(ParcoursData.FO.parcoursAGRICOLE);

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursAGRICOLE);

    // Nom & prénom représentant

    cy.NomRepresentant(envChoisi, ParcoursData.FO.parcoursAGRICOLE);

    cy.PrenomRepresentant(ParcoursData.FO.parcoursAGRICOLE);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursPRO);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.FO.parcoursAGRICOLE);

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redressement judiciaire
    cy.RedressementJudiciaire();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.FO.parcoursAGRICOLE);

    cy.wait(5000);

    cy.ClickBoutonContenant1("Étape suivante");

    // Variation commission courtier
    cy.VariationCommissionCourtier();

    cy.ClickBoutonContenant1("Recalculer tarif");

    // Emettre le devis
    cy.ClickBoutonContenant1("Emettre le devis");

    cy.wait(5000);

    // Transformer en contrat

    cy.ClicTransfoContrat();

    cy.ClickBoutonContenant1("Valider");

    // ---------------------
    // Informations complémentaires (contrat)
    // ---------------------

    // Téléphone
    cy.Telephone1(ParcoursData.FO.parcoursAGRICOLE);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursAGRICOLE);

    cy.ClickBoutonContenant1("Étape suivante");

    // ---------------------
    // Informations de paiement
    // ---------------------
    cy.InfosPaiement(ParcoursData.FO.parcoursAGRICOLE);

    // Check génération des documents
    cy.testBoutonRafraichir(0);

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.FO.parcoursAGRICOLE);
  });
});
