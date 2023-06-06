import ParcoursData from "../../../../fixtures/dataCFDP.json";
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

    // ---------------------
    // Sélection prospect + produit
    // ---------------------
    // ---------------------
    // Sélection prospect + produit
    // ---------------------

    getIframeBody().find('a[href="/souscription/produits/Immobilier"]').click();
    getIframeBody().find('a[href="/souscription/produits/Immobilier"]').click();

    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Association Syndicale Libre")
      .click();
    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Association Syndicale Libre")
      .click();

    getIframeBody().find("button").contains("Valider").click();
    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Devis - Informations Tarifantes
    // ---------------------
    // ---------------------
    // Devis - Informations Tarifantes
    // ---------------------

    // Sélection Pays
    // Sélection Pays

    getIframeBody().find('input[data-cy="select-country"]').click();
    getIframeBody().find('input[data-cy="select-country"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();
    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    // Nombre de villas individuelles
    // Nombre de villas individuelles

    getIframeBody()
      .find('input[id="Nombre de villas individuelles"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.nbVillas);
    getIframeBody()
      .find('input[id="Nombre de villas individuelles"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.nbVillas);

    // Type de gestion ASL
    // Type de gestion ASL

    getIframeBody().find('input[id="Type de gestion ASL"]').click();
    getIframeBody().find('input[id="Type de gestion ASL"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains(ParcoursData.re7FO.parcoursIMMO.typeASL)
      .click();
    getIframeBody()
      .find('div[role="option"]')
      .contains(ParcoursData.re7FO.parcoursIMMO.typeASL)
      .click();

    // Nb salariés
    // Nb salariés

    getIframeBody()
      .find('input[id="Nombre de salariés"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.nbSalaries);
    getIframeBody()
      .find('input[id="Nombre de salariés"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.nbSalaries);

    // CALCULER
    // CALCULER

    getIframeBody().find("button").contains("Calculer").click();
    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody().find("button").contains("Sélectionner").first().click();
    getIframeBody().find("button").contains("Sélectionner").first().click();

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------
    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Nom du syndic en exercice ou du président de l'ASL raisonSociale
    // Nom du syndic en exercice ou du président de l'ASL raisonSociale

    getIframeBody()
      .find('input[data-cy="raisonSociale"]')
      .type(ParcoursData.re7FO.parcoursIMMO.presidentASL);
    getIframeBody()
      .find('input[data-cy="raisonSociale"]')
      .type(ParcoursData.re7FO.parcoursIMMO.presidentASL);

    // Pays Souscripteur
    // Pays Souscripteur

    getIframeBody().find('input[data-cy="pays"]').click();
    getIframeBody().find('input[data-cy="pays"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();
    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    // Forme juridique
    // Forme juridique

    getIframeBody()
      .find('div[title="Forme juridique"]')
      .type(ParcoursData.re7FO.parcoursIMMO.formeJuridique);
    getIframeBody()
      .find('div[title="Forme juridique"]')
      .type(ParcoursData.re7FO.parcoursIMMO.formeJuridique);

    // Adresse Souscripteur
    // Adresse Souscripteur

    getIframeBody()
      .find('div[title="Adresse"]')
      .first()
      .type(ParcoursData.re7FO.parcoursIMMO.adresse1);
    getIframeBody()
      .find('div[title="Adresse"]')
      .first()
      .type(ParcoursData.re7FO.parcoursIMMO.adresse1);

    // Ville Souscripteur
    // Ville Souscripteur

    getIframeBody()
      .find('input[id="autoCompletion-ville"]')
      .type(ParcoursData.re7FO.parcoursIMMO.ville);
    getIframeBody()
      .find('input[id="autoCompletion-ville"]')
      .type(ParcoursData.re7FO.parcoursIMMO.ville);

    // Code Postal souscripteur
    // Code Postal souscripteur

    getIframeBody()
      .find('input[data-cy="codePostal"]')
      .type(ParcoursData.re7FO.parcoursIMMO.codePostal);
    getIframeBody()
      .find('input[data-cy="codePostal"]')
      .type(ParcoursData.re7FO.parcoursIMMO.codePostal);

    // Sélection Civilité représentant
    // Sélection Civilité représentant

    getIframeBody().find('input[data-cy="civilite"]').click();
    getIframeBody().find('input[data-cy="civilite"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("Monsieur")
      .first()
      .click();
    getIframeBody()
      .find('div[role="option"]')
      .contains("Monsieur")
      .first()
      .click();

    // Nom & prénom représentant
    // Nom & prénom représentant

    getIframeBody()
      .find('input[data-cy="nomRepresentant"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nom);
    getIframeBody()
      .find('input[data-cy="nomRepresentant"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nom);

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.prenom);
    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.prenom);

    // En qualité de
    // En qualité de

    getIframeBody()
      .find('input[data-cy="qualiteProfessionnelle"]')
      .type(ParcoursData.re7FO.parcoursPRO.qualiteProfessionnelle);
    getIframeBody()
      .find('input[data-cy="qualiteProfessionnelle"]')
      .type(ParcoursData.re7FO.parcoursPRO.qualiteProfessionnelle);

    // Wait pour attendre la génération du devis
    // Wait pour attendre la génération du devis

    cy.wait(10000);
    cy.wait(10000);

    // Nom de l'ASL
    // Nom de l'ASL

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nomASL);
    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nomASL);

    // Pays Bénéficiaire
    // Pays Bénéficiaire

    getIframeBody()
      .find('input[data-cy="paysBeneficiaire"]')
      .type("France", { force: true });
    getIframeBody()
      .find('input[data-cy="paysBeneficiaire"]')
      .type("France", { force: true });

    getIframeBody()
      .find('div[role="option"]:visible')
      .contains("France")
      .click();
    getIframeBody()
      .find('div[role="option"]:visible')
      .contains("France")
      .click();

    // Adresse Bénéficiaire
    // Adresse Bénéficiaire

    getIframeBody()
      .find('input[id="adresse1"]')
      .type(ParcoursData.re7FO.parcoursIMMO.adresse1);
    getIframeBody()
      .find('input[id="adresse1"]')
      .type(ParcoursData.re7FO.parcoursIMMO.adresse1);

    getIframeBody().find("#adresse1").type(" ").click();
    getIframeBody().find("#adresse1").type(" ").click();

    // Code postal bénéficiaire
    // Code postal bénéficiaire

    getIframeBody()
      .find('input[data-cy="codePostalBeneficaire"]')
      .type(ParcoursData.re7FO.parcoursIMMO.codePostal);
    getIframeBody()
      .find('input[data-cy="codePostalBeneficaire"]')
      .type(ParcoursData.re7FO.parcoursIMMO.codePostal);

    // Ville Bénéficiaire
    // Ville Bénéficiaire

    getIframeBody()
      .find('div[title="Ville"]')
      .last()
      .find("input:visible")
      .type(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire);
    getIframeBody()
      .find('div[title="Ville"]')
      .last()
      .find("input:visible")
      .type(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire);

    // getIframeBody().find('input[id="villeBeneficiaire"]').type(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire)
    // getIframeBody().find('input[id="villeBeneficiaire"]').type(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire)

    //procédures judiciaires
    //procédures judiciaires

    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.nbProcedures);
    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.nbProcedures);

    // Assurance protection juridique
    // Assurance protection juridique

    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('[class="v-input--selection-controls__ripple"]')
      .last()
      .click();
    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('[class="v-input--selection-controls__ripple"]')
      .last()
      .click();

    // Redacteur devis
    // Redacteur devis

    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.re7FO.parcoursIMMO.emisPar);
    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.re7FO.parcoursIMMO.emisPar);

    // // Récupération du numéro de devis
    // // Récupération du numéro de devis

    // getIframeBody()
    //         .find("#app")
    //         .contains("Numéro de devis")
    //         .contains("HD")
    //         .then((numDevis) => {
    //                 numeroDevis = numDevis.text();
    //                 cy.wrap(numeroDevis).as("numeroDevis");
    //         });
    // getIframeBody()
    //         .find("#app")
    //         .contains("Numéro de devis")
    //         .contains("HD")
    //         .then((numDevis) => {
    //                 numeroDevis = numDevis.text();
    //                 cy.wrap(numeroDevis).as("numeroDevis");
    //         });

    cy.wait(5000);
    cy.wait(5000);

    getIframeBody().find("button").contains("Étape suivante").click();
    getIframeBody().find("button").contains("Étape suivante").click();

    // Variation commission courtier
    // Variation commission courtier

    getIframeBody()
      .find('div[class="v-slider__thumb primary"]')
      .trigger("mousedown", { button: 0 })
      .trigger("mousemove", { clientX: 0, clientY: 50 })
      .trigger("mouseup");
    getIframeBody()
      .find('div[class="v-slider__thumb primary"]')
      .trigger("mousedown", { button: 0 })
      .trigger("mousemove", { clientX: 0, clientY: 50 })
      .trigger("mouseup");

    getIframeBody().find("button").contains("Recalculer tarif").click();
    getIframeBody().find("button").contains("Recalculer tarif").click();

    // Emettre le devis
    // Emettre le devis

    getIframeBody().find("button").contains("Emettre le devis").click();
    getIframeBody().find("button").contains("Emettre le devis").click();

    cy.wait(5000);
    cy.wait(5000);

    // Transformer en contrat
    getIframeBody().contains("Transformer en contrat").click();
    // Transformer en contrat
    getIframeBody().contains("Transformer en contrat").click();

    // // Checker que le devis existe dans la liste des devis
    // // Checker que le devis existe dans la liste des devis

    // cy.get('a[id="dropdown-subscribe"]')
    //         .click();
    // cy.get('a[id="dropdown-subscribe"]')
    //         .click();

    // cy.get(
    //         'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
    // ).click();
    // cy.get(
    //         'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
    // ).click();

    // getIframeBody()
    //         .get("@numeroDevis")
    //         .then((numeroDevis) => {
    //                 getIframeBody().find('input[id="input-26"]')
    //                         .click()
    //                         .type(numeroDevis);

    //                 cy.wait(2000)
    //         });

    // getIframeBody()
    //         .find("button")
    //         .contains("Rechercher")
    //         .click({ force: true });

    // getIframeBody()
    //         .find('[class="devis-list__container"]')
    //         .should("contain.text", numeroDevis);

    // cy.wait(2000)

    // // Cliquer sur la liste des actions du devis emis

    // getIframeBody().find('button[data-cy="listActions"]')
    //         .click();

    // getIframeBody()
    //         .find('div[class="v-list-item__title"]')
    //         .contains("Transformer en contrat")
    //         .click();

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .type(ParcoursData.re7FO.parcoursIMMO.telephone);

    getIframeBody()
      .find('input[data-cy="mail"]')
      .type(ParcoursData.re7FO.parcoursIMMO.mail);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody().find('input[data-cy="fractionnement"]').click();

    getIframeBody()
      .find('div[class="v-list-item__title"]')
      .contains(ParcoursData.re7FO.parcoursIMMO.fractionnement)
      .click();

    getIframeBody()
      .find('input[data-cy="moyenDePaiement"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.moyenPaiement, { force: true })
      .type("{enter}", { force: true });

    getIframeBody().find("button").contains("Enregistrer").click();

    cy.wait(35000);

    // ---------------------
    // Envoi signature électronique
    // ---------------------

    getIframeBody().find("button").contains("Signer électroniquement").click();

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.prenom);

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nom);

    getIframeBody()
      .find('input[data-cy="mail"]')
      .type(ParcoursData.re7FO.parcoursIMMO.mail);

    getIframeBody()
      .find('input[data-cy="portable"]')
      .type(ParcoursData.re7FO.parcoursIMMO.telephone);

    getIframeBody()
      .find('h1[class="title-helios"]')
      .parent()
      .find("button")
      .contains("Valider")
      .click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Circuit de signature électronique correctement lancé")
      .should("be.visible");
  });
});
