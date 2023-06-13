import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ASSOCIATION RE7 FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
  });

  it("Association", () => {
    cy.SelectProduct("Association", "Alsina Association");

    cy.DateEffet();

    // ---------------------
    // Devis - Informations tarifantes
    // ---------------------

    // Sélection pays
    cy.SelectCountry1(ParcoursData.FO.parcoursASSOCIATION);

    // Type d'association
    cy.TypeAsso(ParcoursData.FO.parcoursASSOCIATION);

    // Nombre d'adhérents
    cy.NbAdherents(ParcoursData.FO.parcoursASSOCIATION);

    // Secteur d'activité de l'association
    cy.SecteurActiviteAsso(ParcoursData.FO.parcoursASSOCIATION);

    // Nombre de salariés
    cy.NbSalaries(ParcoursData.FO.parcoursASSOCIATION);

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélection formule tarification
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Raison sociale
    cy.RaisonSociale2(ParcoursData.FO.parcoursASSOCIATION);

    // Adresse Souscripteur
    cy.Adresse(ParcoursData.FO.parcoursASSOCIATION);

    // Ville Souscripteur
    cy.Ville2(ParcoursData.FO.parcoursASSOCIATION);

    // Code Postal Souscripteur
    cy.CodePostal(ParcoursData.FO.parcoursASSOCIATION);

    // Forme juridique
    cy.FormeJuridique(ParcoursData.FO.parcoursASSOCIATION);

    // Sélection Civilité représentant
    cy.SelectCivilite(ParcoursData.FO.parcoursASSOCIATION);

    // Nom & prénom représentant
    cy.NomRepresentant(ParcoursData.FO.parcoursASSOCIATION);
    cy.PrenomRepresentant(ParcoursData.FO.parcoursASSOCIATION);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursASSOCIATION);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.FO.parcoursASSOCIATION);

    // Activité statutaire précise
    cy.ActiviteStatut(ParcoursData.FO.parcoursASSOCIATION);

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.FO.parcoursASSOCIATION);

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

    // Téléphone
    cy.Telephone1(ParcoursData.FO.parcoursASSOCIATION);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursASSOCIATION);

    cy.ClickBoutonContenant1("Étape suivante");

    // ---------------------
    // Informations de paiement
    // ---------------------
    cy.InfosPaiement(ParcoursData.FO.parcoursASSOCIATION);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.FO.parcoursASSOCIATION);
  });
});
