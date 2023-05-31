import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ASSO SYNDICALE RE7 FO", () => {
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

  beforeEach(() => {
    cy.visit(ParcoursData.re7FO.login.URLsouscription);
    cy.login(ParcoursData.re7FO.login);
  });

  it("Parcours Asso Syndicale", () => {
    let numeroDevis = "";
    // ---------------------
    // Sélection du produit
    // ---------------------
    cy.SelectProduct("Immobilier", "Alsina Association Syndicale Libre");
    // ---------------------
    // Devis - Date d'effet souhaitée
    // ---------------------
    cy.DateEffet();
    // ---------------------
    // Devis - Informations Tarifantes
    // ---------------------
    // Sélection Pays
    cy.SelectCountry1("France");
    // Nombre de villas individuelles
    cy.NbVillasIndividuelles(ParcoursData.re7FO.parcoursIMMO.nbVillas);
    // Type de gestion ASL
    cy.TypeGestionASL(ParcoursData.re7FO.parcoursIMMO.typeASL);
    // Nb salariés
    cy.NbSalaries(ParcoursData.re7FO.parcoursIMMO.nbSalaries);
    // Calculer et sélectionner l'offre
    cy.ClickBoutonContenant("Calculer");
    cy.ClickBoutonContenant("Sélectionner");
    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------
    // Nom du syndic en exercice ou du président de l'ASL raisonSociale
    cy.InputDataCy(
      "raisonSociale",
      ParcoursData.re7FO.parcoursIMMO.presidentASL
    );
    // Pays Souscripteur
    cy.SelectCountry2("France");
    // Forme juridique
    cy.InputDivTitle(
      "Forme juridique",
      ParcoursData.re7FO.parcoursIMMO.formeJuridique
    );
    // Adresse Souscripteur
    cy.InputDivTitle("Adresse", ParcoursData.re7FO.parcoursIMMO.adresse1);
    // Ville Souscripteur
    cy.InputId("autoCompletion-ville", ParcoursData.re7FO.parcoursIMMO.ville);
    // Code Postal souscripteur
    cy.InputDataCy("codePostal", ParcoursData.re7FO.parcoursIMMO.codePostal);
    // Sélection Civilité représentant
    cy.SelectCivilite("Monsieur");
    // Nom & prénom représentant
    cy.InputDataCy("nomRepresentant", ParcoursData.re7FO.parcoursIMMO.nom);
    cy.InputDataCy("prenom", ParcoursData.re7FO.parcoursIMMO.prenom);
    // En qualité de
    cy.InputDataCy(
      "qualiteProfessionnelle",
      ParcoursData.re7FO.parcoursPRO.qualiteProfessionnelle
    );
    // Wait pour attendre la génération du devis
    cy.wait(10000);
    // Nom de l'ASL
    cy.InputDataCy("nom", ParcoursData.re7FO.parcoursIMMO.nomASL);
    // Pays Bénéficiaire
    cy.SelectCountry3("France");
    // Adresse Bénéficiaire
    cy.InputId("adresse1", ParcoursData.re7FO.parcoursIMMO.adresse1);
    getIframeBody().find("#adresse1").type(" ").click();
    // Code postal bénéficiaire
    cy.InputDataCy(
      "codePostalBeneficaire",
      ParcoursData.re7FO.parcoursIMMO.codePostal
    );
    // Ville Bénéficiaire
    cy.VilleBeneficiaire(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire);
    // getIframeBody().find('input[id="villeBeneficiaire"]').type(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire)
    //procédures judiciaires
    cy.InputId(
      "nombreProcedures",
      ParcoursData.re7FO.parcoursIMMO.nbProcedures
    );
    // Assurance protection juridique
    cy.AssuranceProtecJuri();
    // Redacteur devis
    cy.InputId("emisPar", ParcoursData.re7FO.parcoursIMMO.emisPar);
    // Bouton étape suivante
    cy.ClickBoutonContenant("Étape suivante");
    // Variation commission courtier
    cy.VariationCommissionCourtier();
    cy.ClickBoutonContenant("Recalculer tarif");
    // Emettre le devis
    cy.ClickBoutonContenant("Emettre le devis");
    cy.wait(5000);
    // Transformer en contrat
    cy.ClicTransfoContrat();
    // Validation date d'effet
    cy.ClickBoutonContenant("Valider");
    // Telephone
    cy.InputDataCy("telephone1", ParcoursData.re7FO.parcoursIMMO.telephone);
    // Mail
    cy.InputDataCy("mail", ParcoursData.re7FO.parcoursIMMO.mail);
    // Bouton étape suivante
    cy.ClickBoutonContenant("Étape suivante");
    // Fractionnement
    cy.Fractionnement(ParcoursData.re7FO.parcoursIMMO.fractionnement);
    // Paiement
    cy.MoyenPaiement(ParcoursData.re7FO.parcoursIMMO.moyenPaiement);
    cy.ClickBoutonContenant("Enregistrer");
    cy.wait(25000);
    // ---------------------
    // Envoi signature électronique
    // ---------------------
    cy.SignatureElec(ParcoursData.re7FO.parcoursIMMO);
  });
});
