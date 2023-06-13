import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours IMMOBILIER Alsina patrimoine immobilier FO", () => {
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

  it("Parcours Patrimoine", () => {
    let numeroDevis = "";

    // Sélection prospect + produit
    cy.SelectProduct("Immobilier", "Alsina Patrimoine Immobilier");

    // ---------------------
    // Devis - Date d'effet souhaitée
    // ---------------------
    cy.DateEffet();

    // ---------------------
    // Devis - Tarification
    // ---------------------

    // Selectionner un pays
    cy.SelectCountry1(ParcoursData.re7FO.parcoursIMMO);

    // Présence d'un lot dans une résidence de tourisme
    cy.LotResidenceTourisme(ParcoursData.re7FO.parcoursIMMO);

    // Nombre total de lots
    cy.NbTotalLots(ParcoursData.re7FO.parcoursIMMO);

    // Calculer le tarif
    cy.ClickBoutonContenant1("Calculer");

    // Sélectionner la première offre
    cy.ClickBoutonContenant1("Sélectionner");

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Civilité
    cy.SelectCivilite(ParcoursData.re7FO.parcoursIMMO);

    // Nom & prénom
    cy.NomSouscripteur(ParcoursData.re7FO.parcoursIMMO);
    cy.PrenomSouscripteur(ParcoursData.re7FO.parcoursIMMO);

    // Date de naissance
    cy.DateNaissance(ParcoursData.re7FO.parcoursIMMO);

    // Lieu de Naissance
    cy.LieuNaissance(ParcoursData.re7FO.parcoursIMMO);

    // Adresse
    cy.Adresse(ParcoursData.re7FO.parcoursIMMO);

    // Ville
    cy.Ville(ParcoursData.re7FO.parcoursIMMO);

    // Code Postal
    cy.CodePostal(ParcoursData.re7FO.parcoursIMMO);

    // Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ?
    cy.ProceduresJudiciaires(ParcoursData.re7FO.parcoursIMMO);

    // Avez-vous déjà souscrit à une assurance de protection juridique ?
    cy.AssuranceProtecJuri();

    // Redacteur devis
    cy.RedacteurDevis(ParcoursData.re7FO.parcoursIMMO);

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
    cy.LieuNaissance(ParcoursData.re7FO.parcoursIMMO);

    // Date de naissance
    cy.DateNaissance(ParcoursData.re7FO.parcoursIMMO);

    // Téléphone
    cy.Telephone1(ParcoursData.re7FO.parcoursIMMO);

    // Mail
    cy.Mail1(ParcoursData.re7FO.parcoursIMMO);

    // Etape suivante
    cy.ClickBoutonContenant1("Étape suivante");

    // ---------------------
    // Contrat - Paiement
    // ---------------------
    cy.InfosPaiement(ParcoursData.re7FO.parcoursIMMO);

    // Check génération des documents
    cy.testBoutonRafraichir();

    // ---------------------
    // Contrat - Récapitulatif et Signature
    // ---------------------

    cy.SignatureElec(ParcoursData.re7FO.parcoursIMMO);
  });
});
