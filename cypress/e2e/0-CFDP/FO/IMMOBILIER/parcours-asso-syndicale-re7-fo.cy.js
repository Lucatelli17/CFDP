import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ASSO SYNDICALE FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
    cy.selectionCodeCourtier(envChoisi, ParcoursData.FO.login.codeIA);
  });

  it("Parcours Asso Syndicale", () => {
    // Sélection prospect + produit
    cy.SelectProduct("Immobilier", "Alsina Association Syndicale Libre");

    // ---------------------
    // Devis - Date d'effet souhaitée
    // ---------------------
    cy.DateEffet();

    // ---------------------
    // Devis - Informations Tarifantes
    // ---------------------

    // Selectionner un pays
    cy.SelectCountry1(ParcoursData.FO.parcoursIMMO);

    // Nombre de copropriétés verticales
    cy.NbCoproVerticales(ParcoursData.FO.parcoursIMMO);

    // Type de gestion ASL
    cy.TypeGestionASL(envChoisi, ParcoursData.FO.parcoursIMMO);

    // Nb salariés
    cy.NbSalaries(ParcoursData.FO.parcoursIMMO);

    // Nb Villas
    cy.NbVillas(ParcoursData.FO.parcoursIMMO);

    // Calculer le tarif
    cy.ClickBoutonContenant1("Calculer");

    // Sélectionner la première offre
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Nom du syndic en exercice ou du président de l'ASL raisonSociale
    cy.NomSyndic(ParcoursData.FO.parcoursIMMO);

    // Pays Souscripteur
    cy.SelectCountry2(ParcoursData.FO.parcoursIMMO);

    // Forme juridique
    cy.FormeJuridique(ParcoursData.FO.parcoursIMMO);

    // Adresse Souscripteur
    cy.Adresse(ParcoursData.FO.parcoursIMMO);

    // Ville Souscripteur
    cy.Ville2(ParcoursData.FO.parcoursIMMO);

    // Code Postal souscripteur
    cy.CodePostal(ParcoursData.FO.parcoursIMMO);

    // Sélection Civilité représentant
    cy.SelectCivilite(ParcoursData.FO.parcoursIMMO);

    // Nom & prénom représentant
    cy.NomRepresentant(envChoisi, ParcoursData.FO.parcoursIMMO);
    cy.PrenomRepresentant(ParcoursData.FO.parcoursIMMO);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.FO.parcoursIMMO);

    // Wait pour attendre la génération du devis
    cy.wait(5000);

    // Nom de l'ASL
    cy.NomAsl(ParcoursData.FO.parcoursIMMO);

    // Pays Bénéficiaire
    cy.SelectCountry3(ParcoursData.FO.parcoursIMMO);

    // Adresse Bénéficiaire
    cy.AdresseBenef(ParcoursData.FO.parcoursIMMO);

    // Code postal bénéficiaire
    cy.codePostalBenef(ParcoursData.FO.parcoursIMMO);

    // Ville Bénéficiaire
    cy.VilleBeneficiaire(ParcoursData.FO.parcoursIMMO);

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

    // ---------------------
    // Contrat - Date d'effet souhaitée
    // ---------------------
    cy.DateEffet();

    // Téléphone
    cy.Telephone1(ParcoursData.FO.parcoursIMMO);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursIMMO);

    cy.ClickBoutonContenant1("Étape suivante");

    cy.InfosPaiement(ParcoursData.FO.parcoursIMMO);

    // Check génération des documents
    cy.testBoutonRafraichir(0);

    // ---------------------
    // Contrat - Récapitulatif et Signature
    // ---------------------

    cy.SignatureElec(ParcoursData.FO.parcoursIMMO);
  });
});
