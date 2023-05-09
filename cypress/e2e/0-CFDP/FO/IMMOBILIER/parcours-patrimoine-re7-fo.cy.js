import ParcoursData from "../../fixtures/dataCFDP.json";

describe("parcours IMMOBILIER Alsina patrimoine immobilier FO", () => {
  beforeEach(() => {
    cy.visit(ParcoursData.re7FO.login.URLsouscription);
    cy.get('input[id="username"]').type(ParcoursData.re7FO.login.username);
    cy.get('input[id="password"]').type(ParcoursData.re7FO.login.password);
    cy.get('button[id="signin"]').click();
    cy.wait(4000);
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

  it("Parcours Entreprise", () => {
    let numeroDevis = "";

    // ---------------------
    // Sélection de l'offre
    // ---------------------

    getIframeBody().find('a[href="/souscription/produits/Immobilier"]').click();
    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Patrimoine Immobilier")
      .click();

    // ---------------------
    // Devis - Date d'effet souhaitée
    // ---------------------
    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Devis - Tarification
    // ---------------------

    // Selectionner un pays
    getIframeBody().find('input[data-cy="select-country"]').click();
    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();
    // Présence d'un lot dans une résidence de tourisme
    getIframeBody().find('input[data-cy="21"]').click();
    getIframeBody().find('div[role="option"]').contains("Non").first().click();
    // Nombre de lots à usage d'habitation
    // getIframeBody().find('input[data-cy="22"]').clear().type(1);
    // Calculer le tarif
    getIframeBody().find("button").contains("Calculer").click();
    // Sélectionner la première offre
    getIframeBody().find("button").contains("Sélectionner").first().click();
    cy.wait(5000);

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Civilité
    getIframeBody().find('input[data-cy="civilite"]').click();
    getIframeBody()
      .find('div[role="option"]')
      .contains("Monsieur")
      .first()
      .click();
    // Nom
    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.nom);
    // Prénom
    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.prenom);
    // Date de naissance
    getIframeBody()
      .find("input[type=date]")
      .last()
      .click()
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.dateNaissance);
    // Lieu de Naissance
    getIframeBody()
      .find('input[data-cy="lieuNaissance"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.lieuNaissance);
    // Adresse
    getIframeBody()
      .find('input[id="adresse1"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.adresse1);
    // Ville
    getIframeBody().find('input[id="ville"]').click().type("Lille");
    // Code Postal
    getIframeBody().find('input[id="codePostal"]').click().type("92210");
    // getIframeBody().find("#adresse1").type(" ").click();
    getIframeBody().wait(2000);
    // Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ?
    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.nbProcedures);
    // Avez-vous déjà souscrit à une assurance de protection juridique ?
    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('[class="v-input--selection-controls__ripple"]')
      .last()
      .click();
    // Redacteur devis
    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.emisPar);

    // Récupération du numéro de devis
    getIframeBody()
      .find("#app")
      .contains("Numéro de devis")
      .contains("HD")
      .then((numDevis) => {
        numeroDevis = numDevis.text();
        cy.wrap(numeroDevis).as("numeroDevis");
      });
    cy.wait(5000);

    // Etape suivante du devis
    getIframeBody().find("button").contains("Étape suivante").click();
    cy.wait(5000);

    // ---------------------
    // Devis - Récapitulatif du devis en cours
    // ---------------------

    // Emettre le devis
    getIframeBody().find("button").contains("Emettre le devis").click();
    cy.wait(5000);

    // ---------------------
    // Vérification de la présence du devis dans la liste des devis
    // ---------------------

    // Navigation vers la liste des devis
    cy.get('a[id="dropdown-subscribe"]').click();
    cy.get(
      'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
    ).click();
    cy.wait(4000);

    // Recherche du devis via le numéro du devis
    getIframeBody()
      .get("@numeroDevis")
      .then((numeroDevis) => {
        getIframeBody().find('input[id="input-26"]').click().type(numeroDevis);
      });
    getIframeBody()
      .find("button")
      .contains("Rechercher")
      .click({ force: true });
    cy.wait(2000);

    // Vérification de la présence du numéro du devis dans la liste des devis affichés
    getIframeBody()
      .find('[class="devis-list__container"]')
      .should("contain.text", numeroDevis);

    // Cliquer sur la liste des actions du devis et sur transformer en contrat
    getIframeBody().find('button[data-cy="listActions"]').click();
    getIframeBody()
      .find('div[class="v-list-item__title"]')
      .contains("Transformer en contrat")
      .click();
    cy.wait(2000);

    // ---------------------
    // Contrat - Date d'effet souhaitée
    // ---------------------
    getIframeBody().find("button").contains("Valider").click();
    cy.wait(2000);

    // ---------------------
    // Contrat - Informations complémentaires
    // ---------------------

    // Lieu de naissance
    getIframeBody()
      .find('input[data-cy="lieuNaissance"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.lieuNaissance);
    // Date de naissance
    getIframeBody()
      .find("input[type=date]")
      .last()
      .click()
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.dateNaissance);
    // Téléphone
    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.telephone);
    // Mail
    getIframeBody()
      .find('input[data-cy="mail"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.mail);

    // Etape suivante
    getIframeBody().find("button").contains("Étape suivante").click();
    cy.wait(2000);

    // ---------------------
    // Contrat - Paiement
    // ---------------------

    // Fractionnement
    getIframeBody()
      .find('input[data-cy="fractionnement"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.fractionnement, {
        force: true,
      })
      .type("{enter}", { force: true });
    // Moyen de paiement
    getIframeBody()
      .find('input[data-cy="moyenDePaiement"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.moyenPaiement, {
        force: true,
      })
      .type("{enter}", { force: true });
    // Enregistrer
    getIframeBody().find("button").contains("Enregistrer").click();
    // Attente pour le chargement des documents
    cy.wait(10000);

    // ---------------------
    // Contrat - Récapitulatif et Signature
    // ---------------------

    // Signer électroniquement
    getIframeBody().find("button").contains("Signer électroniquement").click();
    // Prénom de la signature
    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.prenom);
    // Nom de la signature
    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.nom);
    // Mail de la signature
    getIframeBody()
      .find('input[data-cy="mail"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.mail);
    // Téléphone de la signature
    getIframeBody()
      .find('input[data-cy="portable"]')
      .type(ParcoursData.re7FO.parcoursIMMOBILIER.telephone);
    cy.wait(2000);
    // Valider la signature
    getIframeBody()
      .find('h1[class="title-helios"]')
      .parent()
      .find("button")
      .contains("Valider")
      .click();
    cy.wait(10000);
  });
});
