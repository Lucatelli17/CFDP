import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours PARTICULIER RE7 FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
  });

  it("Parcours Particulier", () => {
    //Sélection prospect + produit
    cy.SelectProduct("Particulier", "Alsina Particulier");

    // Sélection date
    cy.DateEffet();

    // ---------------------
    // Devis - Informations tarifantes
    // ---------------------

    // Sélection pays
    cy.SelectCountry1(ParcoursData.FO.parcoursPARTICULIER);

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélection tarification
    cy.ClickBoutonContenant1("Sélectionner");

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.FO.parcoursPARTICULIER);

    // Nom & prénom représentant
    cy.NomSouscripteur(ParcoursData.FO.parcoursPARTICULIER);
    cy.PrenomSouscripteur(ParcoursData.FO.parcoursPARTICULIER);

    // Adresse
    cy.Adresse(ParcoursData.FO.parcoursPARTICULIER);

    // Ville
    cy.Ville(ParcoursData.FO.parcoursPARTICULIER);

    // Code Postal
    cy.CodePostal(ParcoursData.FO.parcoursPARTICULIER);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.FO.parcoursPARTICULIER);

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.FO.parcoursPARTICULIER);

    cy.wait(8000);

    cy.ClickBoutonContenant1("Étape suivante");

    cy.wait(8000);

    // Variation commission courtier
    cy.VariationCommissionCourtier();

    cy.ClickBoutonContenant1("Recalculer tarif");

    // Emettre le devis
    cy.ClickBoutonContenant1("Emettre le devis");

    cy.wait(5000);

    // Transformer en contrat
    cy.ClickBoutonContenant2("Transformer en contrat");

    // Saisie date effet contrat
    cy.ClickBoutonContenant1("Valider");

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Téléphone
    cy.Telephone1(ParcoursData.FO.parcoursPARTICULIER);

    // Mail
    cy.Mail1(ParcoursData.FO.parcoursPARTICULIER);

    // Lieu de naissance
    cy.LieuNaissance(ParcoursData.FO.parcoursPARTICULIER);

    // Date de naissance
    cy.DateNaissance(ParcoursData.FO.parcoursPARTICULIER);

    cy.ClickBoutonContenant1("Étape suivante");

    // Fractionnement
    cy.Fractionnement(ParcoursData.FO.parcoursPARTICULIER);

    // Moyen de paiement
    cy.MoyenPaiement(ParcoursData.FO.parcoursPARTICULIER);

    cy.ClickBoutonContenant1("Enregistrer");

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.FO.parcoursPARTICULIER);
  });
});
