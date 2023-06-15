import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours IMMOBILIER Alsina patrimoine immobilier FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
    cy.selectionCodeCourtier(envChoisi, ParcoursData.FO.login.codeIA);
  });

  it("Parcours Patrimoine", () => {
    // Sélection prospect + produit
    cy.SelectProduct("Immobilier", "Alsina Patrimoine Immobilier");

    // ---------------------
    // Devis - Date d'effet souhaitée
    // ---------------------
    cy.DateEffet();

    // ---------------------
    // Devis - Tarification
    // ---------------------

    // Présence d'un lot dans une résidence de tourisme
    cy.LotResidenceTourisme(ParcoursData.FO.parcoursIMMO);

    if (envChoisi === "re7FO") {
      // Selectionner un pays
      cy.SelectCountry1(ParcoursData.FO.parcoursIMMO);
      // Nombre total de lots
      cy.NbTotalLots(ParcoursData.FO.parcoursIMMO);
    }

    // Calculer le tarif
    cy.ClickBoutonContenant1("Calculer");

    // Sélectionner la première offre
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursIMMO);

    // Nom & prénom
    cy.NomSouscripteur(ParcoursData.FO.parcoursIMMO);
    cy.PrenomSouscripteur(ParcoursData.FO.parcoursIMMO);

    // Date de naissance
    cy.DateNaissance(ParcoursData.FO.parcoursIMMO);

    // Lieu de Naissance
    cy.LieuNaissance(ParcoursData.FO.parcoursIMMO);

    // Adresse
    cy.Adresse(ParcoursData.FO.parcoursIMMO);

    // Code Postal
    cy.CodePostal(ParcoursData.FO.parcoursIMMO);

    // Ville
    cy.Ville(ParcoursData.FO.parcoursIMMO);

    // Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ?
    cy.ProceduresJudiciaires(ParcoursData.FO.parcoursIMMO);

    // Attente de la génération du devis
    cy.wait(5000);

    // Avez-vous déjà souscrit à une assurance de protection juridique ?
    cy.AssuranceProtecJuri();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.FO.parcoursIMMO);

    // ---------------------
    // Devis - Récapitulatif du devis en cours
    // ---------------------

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

    cy.ClickBoutonContenant1("Valider");

    // ---------------------
    // Contrat - Informations complémentaires
    // ---------------------

    // Lieu de naissance
    cy.LieuNaissance(ParcoursData.FO.parcoursIMMO);

    // Date de naissance
    cy.DateNaissance(ParcoursData.FO.parcoursIMMO);

    // Téléphone
    cy.Telephone1(ParcoursData.FO.parcoursIMMO);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursIMMO);

    // Etape suivante
    cy.ClickBoutonContenant1("Étape suivante");

    // ---------------------
    // Contrat - Paiement
    // ---------------------
    cy.InfosPaiement(ParcoursData.FO.parcoursIMMO);

    // Check génération des documents
    cy.testBoutonRafraichir(0);

    // ---------------------
    // Contrat - Récapitulatif et Signature
    // ---------------------

    cy.SignatureElec(ParcoursData.FO.parcoursIMMO);
  });
});
