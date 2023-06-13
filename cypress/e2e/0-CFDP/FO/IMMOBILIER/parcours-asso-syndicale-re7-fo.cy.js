import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ASSO SYNDICALE RE7 FO", () => {
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

  it("Parcours Asso Syndicale", () => {
    let numeroDevis = "";

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
    cy.SelectCountry1(ParcoursData.re7FO.parcoursIMMO);

    // Nombre de villas individuelles
    cy.NbVillasIndividuelles(ParcoursData.re7FO.parcoursIMMO);

    // Type de gestion ASL
    cy.TypeGestionASL(ParcoursData.re7FO.parcoursIMMO);

    // Nb salariés
    cy.NbSalaries(ParcoursData.re7FO.parcoursIMMO);

    // Calculer le tarif
    cy.ClickBoutonContenant1("Calculer");

    // Sélectionner la première offre
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Nom du syndic en exercice ou du président de l'ASL raisonSociale
    cy.NomSyndic(ParcoursData.re7FO.parcoursIMMO);

    // Pays Souscripteur
    cy.SelectCountry2(ParcoursData.re7FO.parcoursIMMO);

    // Forme juridique
    cy.FormeJuridique(ParcoursData.re7FO.parcoursIMMO);

    // Adresse Souscripteur
    cy.Adresse(ParcoursData.re7FO.parcoursIMMO);

    // Ville Souscripteur
    cy.Ville2(ParcoursData.re7FO.parcoursIMMO);

    // Code Postal souscripteur
    cy.CodePostal(ParcoursData.re7FO.parcoursIMMO);

    // Sélection Civilité représentant
    cy.SelectCivilite(ParcoursData.re7FO.parcoursIMMO);

    // Nom & prénom représentant
    cy.NomRepresentant(ParcoursData.re7FO.parcoursIMMO);
    cy.PrenomRepresentant(ParcoursData.re7FO.parcoursIMMO);

    // En qualité de
    cy.EnQualiteDe(ParcoursData.re7FO.parcoursIMMO);

    // Wait pour attendre la génération du devis
    cy.wait(5000);

    // Nom de l'ASL
    cy.NomAsl(ParcoursData.re7FO.parcoursIMMO);

    // Pays Bénéficiaire
    cy.SelectCountry3(ParcoursData.re7FO.parcoursIMMO);

    // Adresse Bénéficiaire
    cy.AdresseBenef(ParcoursData.re7FO.parcoursIMMO);

    // Code postal bénéficiaire
    cy.codePostalBenef(ParcoursData.re7FO.parcoursIMMO);

    // Ville Bénéficiaire
    cy.VilleBeneficiaire(ParcoursData.re7FO.parcoursIMMO);

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

    // ---------------------
    // Contrat - Date d'effet souhaitée
    // ---------------------
    cy.DateEffet();

    // Téléphone
    cy.Telephone1(ParcoursData.re7FO.parcoursIMMO);

    // Mail
    cy.Mail1(ParcoursData.re7FO.parcoursIMMO);

    cy.ClickBoutonContenant1("Étape suivante");

    cy.InfosPaiement(ParcoursData.re7FO.parcoursIMMO);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Contrat - Récapitulatif et Signature
    // ---------------------

    cy.SignatureElec(ParcoursData.re7FO.parcoursIMMO);
  });
});
