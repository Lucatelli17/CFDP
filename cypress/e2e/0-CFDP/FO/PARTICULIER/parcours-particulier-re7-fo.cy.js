import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours PARTICULIER RE7 FO", () => {
  beforeEach(() => {
    cy.visit(ParcoursData.re7FO.login.URLsouscription);
    cy.get('input[id="username"]').type(ParcoursData.re7FO.login.username);
    cy.get('input[id="password"]').type(ParcoursData.re7FO.login.password);
    cy.get('button[id="signin"]').click();
    cy.url().should("eq", "https://espacepartenaire.re7.cfdp.fr/souscription");
  });

  const getIframeDocument = () => {
    return (
      cy
        .get('iframe[data-cy="iframe-souscription"]')
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its("0.contentDocument")
        .should("exist")
    );
  };

  const getIframeBody = () => {
    // get the document
    return (
      getIframeDocument()
        // automatically retries until body is loaded
        .its("body")
        .should("not.be.undefined")
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
    );
  };

  it("Parcours Particulier", () => {
    let numeroDevis = "";

    //Sélection prospect + produit
    cy.SelectProduct("Particulier", "Alsina Particulier");

    // Sélection date
    cy.DateEffet();

    // ---------------------
    // Devis - Informations tarifantes
    // ---------------------

    // Sélection pays
    cy.SelectCountry1(ParcoursData.re7FO.parcoursPARTICULIER);

    // CALCULER
    cy.ClickBoutonContenant1("Calculer");

    // Sélection tarification
    cy.ClickBoutonContenant1("Sélectionner");

    // Sélection Civilité
    cy.SelectCivilite(ParcoursData.re7FO.parcoursPARTICULIER);

    // Nom & prénom représentant
    cy.NomSouscripteur(ParcoursData.re7FO.parcoursPARTICULIER);
    cy.PrenomSouscripteur(ParcoursData.re7FO.parcoursPARTICULIER);

    // Adresse
    cy.Adresse(ParcoursData.re7FO.parcoursPARTICULIER);

    // Ville
    cy.Ville(ParcoursData.re7FO.parcoursPARTICULIER);

    // Code Postal
    cy.CodePostal(ParcoursData.re7FO.parcoursPARTICULIER);

    // Procédures judiciaires
    cy.ProceduresJudiciaires(ParcoursData.re7FO.parcoursPARTICULIER);

    // Assurance protection juridique
    cy.AssuranceProtecJuri();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.re7FO.parcoursPARTICULIER);

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
    cy.Telephone1(ParcoursData.re7FO.parcoursPARTICULIER);

    // Mail
    cy.Mail1(ParcoursData.re7FO.parcoursPARTICULIER);

    // Lieu de naissance
    cy.LieuNaissance(ParcoursData.re7FO.parcoursPARTICULIER);

    // Date de naissance
    cy.DateNaissance(ParcoursData.re7FO.parcoursPARTICULIER);

    cy.ClickBoutonContenant1("Étape suivante");

    // Fractionnement
    cy.Fractionnement(ParcoursData.re7FO.parcoursPARTICULIER);

    // Moyen de paiement
    cy.MoyenPaiement(ParcoursData.re7FO.parcoursPARTICULIER);

    cy.ClickBoutonContenant1("Enregistrer");

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    cy.SignatureElec(ParcoursData.re7FO.parcoursPARTICULIER);
  });
});
