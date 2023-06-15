import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours SYNDICAT COPRO VERTICAL FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
    cy.selectionCodeCourtier(envChoisi, ParcoursData.FO.login.codeIA);
  });

  it("Parcours Syndicat Copro Vertical", () => {
    // ---------------------
    // Sélection prospect & produit
    // ---------------------

    getIframeBody().find('a[href="/souscription/produits/Immobilier"]').click();

    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Syndicat de Copropriétaires")
      .click();

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Informations tarifantes
    // ---------------------

    // Sélection pays

    getIframeBody().find('input[data-cy="select-country"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    // Type de copro

    getIframeBody().find('div[role="combobox"]').first().click();

    getIframeBody().find('div[role="listbox"]').contains("Verticale").click();

    // Type de gestion de la copro

    getIframeBody().find('div[role="combobox"]').last().click();

    getIframeBody()
      .find('div[role="listbox"]')
      .contains("Syndic professionnel")
      .click();

    // Surface développée totale (si copopriété verticale)

    getIframeBody()
      .find('input[id="Surface développée totale (Si copropriété verticale)"]')
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.nbMetrescarre);

    // CALCULER

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody().find("button").contains("Sélectionner").first().click();

    // ---------------------
    // Devis - Recherche client
    // ---------------------

    // Nouveau prospect

    getIframeBody().find("button").contains("Nouveau prospect").click();

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Raison sociale

    getIframeBody()
      .find('div[title="Raison sociale"]')
      .click()
      .type(ParcoursData.FO.parcoursIMMO.raisonSociale);

    // Pays Bénéficiaire

    getIframeBody().find('input[data-cy="pays"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    // Forme juridique

    getIframeBody()
      .find('div[title="Forme juridique"]')
      .type(ParcoursData.FO.parcoursIMMO.formeJuridique);

    // Adresse Souscripteur

    getIframeBody()
      .find('div[title="Adresse"]')
      .first()
      .type(ParcoursData.FO.parcoursIMMO.adresse1);

    // Ville

    getIframeBody()
      .find('input[id="autoCompletion-ville"]')
      .type(ParcoursData.FO.parcoursIMMO.ville);

    // Code Postal

    getIframeBody()
      .find('input[data-cy="codePostal"]')
      .type(ParcoursData.FO.parcoursIMMO.codePostal);

    // Sélection Civilité

    getIframeBody().find('input[data-cy="civilite"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("Monsieur")
      .first()
      .click();

    // Nom & prénom représentant

    getIframeBody()
      .find('input[data-cy="nomRepresentant"]')
      .type(ParcoursData.FO.parcoursIMMO.nom);

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.FO.parcoursIMMO.prenom);

    // En qualité de

    getIframeBody()
      .find('input[data-cy="qualiteProfessionnelle"]')
      .type(ParcoursData.FO.parcoursPRO.qualiteProfessionnelle);

    cy.wait(10000);

    // Nom de la copro

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.FO.parcoursIMMO.nomCopro);

    // Pays Bénéficiaire

    getIframeBody()
      .find('input[data-cy="paysBeneficiaire"]')
      .type("France", { force: true });

    getIframeBody()
      .find('div[role="option"]:visible')
      .contains("France")
      .click();

    // Adresse Bénéficiaire

    getIframeBody()
      .find('input[id="adresse1"]')
      .type(ParcoursData.FO.parcoursIMMO.adresse1, { force: true });

    // Ville Bénéficiaire

    getIframeBody()
      .find('div[title="Ville"]')
      .last()
      .type(ParcoursData.FO.parcoursIMMO.villeBeneficiaire);

    getIframeBody()
      .find('div[role="option"]:visible')
      .contains(ParcoursData.FO.parcoursIMMO.villeBeneficiaire)
      .first()
      .click();

    // Procédures judiciaires

    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.FO.parcoursIMMO.nbProcedures);

    // Assurance protection juridique

    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('[class="v-input--selection-controls__ripple"]')
      .last()
      .click();

    // Redacteur devis

    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.FO.parcoursIMMO.emisPar);

    // // Récupération du numéro de devis

    // getIframeBody()
    //         .find("#app")
    //         .contains("Numéro de devis")
    //         .contains("HD")
    //         .then((numDevis) => {
    //                 numeroDevis = numDevis.text();
    //                 cy.wrap(numeroDevis).as("numeroDevis");
    //         });

    cy.wait(5000);

    getIframeBody().find("button").contains("Étape suivante").click();

    // Variation commission courtier

    getIframeBody()
      .find('div[class="v-slider__thumb primary"]')
      .trigger("mousedown", { button: 0 })
      .trigger("mousemove", { clientX: 0, clientY: 50 })
      .trigger("mouseup");

    getIframeBody().find("button").contains("Recalculer tarif").click();

    // Emettre le devis

    getIframeBody().find("button").contains("Emettre le devis").click();

    cy.wait(5000);

    // Transformer en contrat
    getIframeBody().contains("Transformer en contrat").click();

    // cy.get('a[id="dropdown-subscribe"]')
    //         .click();

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
      .find('input[data-cy="input-siret"]')
      .type(ParcoursData.FO.parcoursIMMO.siret);

    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .type(ParcoursData.FO.parcoursIMMO.telephone);

    getIframeBody()
      .find('input[data-cy="mail"]')
      .type(ParcoursData.FO.parcoursIMMO.mail);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody().find('input[data-cy="fractionnement"]').click();

    getIframeBody()
      .find('div[class="v-list-item__title"]')
      .contains(ParcoursData.FO.parcoursIMMO.fractionnement)
      .click();

    getIframeBody()
      .find('input[data-cy="moyenDePaiement"]')
      .click()
      .type(ParcoursData.FO.parcoursIMMO.moyenPaiement, { force: true })
      .type("{enter}", { force: true });

    getIframeBody().find("button").contains("Enregistrer").click();

    cy.wait(35000);

    // ---------------------
    // Envoi signature électronique
    // ---------------------

    getIframeBody().find("button").contains("Signer électroniquement").click();

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.FO.parcoursIMMO.prenom);

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.FO.parcoursIMMO.nom);

    getIframeBody()
      .find('input[data-cy="mail"]')
      .type(ParcoursData.FO.parcoursIMMO.mail);

    getIframeBody()
      .find('input[data-cy="portable"]')
      .type(ParcoursData.FO.parcoursIMMO.telephone);

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
