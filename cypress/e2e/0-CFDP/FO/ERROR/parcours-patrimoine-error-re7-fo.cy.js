import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours IMMOBILIER Alsina patrimoine immobilier Error FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
    cy.selectionCodeCourtier(envChoisi, ParcoursData.FO.login.codeIA);
  });

  it("Parcours Patrimoine Error", () => {
    // ---------------------
    // Sélection prospect + produit
    // ---------------------

    getIframeBody().find('a[href="/souscription/produits/Immobilier"]').click();

    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Patrimoine Immobilier")
      .click();

    // ---------------------
    // Saisie date d'effet
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetPassee);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Veuillez saisir une date supérieure à la date du")
      .should("be.visible");

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le format de la date")
      .and("contain", "est pas correct")
      .should("be.visible");

    // Date d'effet dans le futur (+ d'un an)

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetFuture);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Veuillez saisir une date antérieure ou égale à la date du"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le format de la date")
      .and("contain", "est pas correct")
      .should("be.visible");

    // Date d'effet valide

    cy.wait(2000);

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetValide);

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Devis - Tarification
    // ---------------------

    // Sans remplir les champs

    getIframeBody()
      .find('input[id="Nombre de lots à usage commercial"]')
      .clear();

    getIframeBody().find('input[id="Nombre de lots à usage rural"]').clear();

    getIframeBody().find('input[id="Nombre total de lots"]').clear();

    getIframeBody().find('input[data-cy="22"]').clear();

    getIframeBody()
      .find('input[id="Nombre de lots à usage de location meublée"]')
      .clear();

    getIframeBody()
      .find('input[id="Nombre de lots à usage de terrain nu"]')
      .clear();

    getIframeBody()
      .find('input[id="Nombre de lots à usage professionnel"]')
      .clear();

    getIframeBody()
      .find('input[id="Nombre de lots à usage de garage /cave"]')
      .clear();

    getIframeBody()
      .find(
        'input[id="Nombre de lots à usage de location saisonnière occasionnelle"]'
      )
      .clear();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Sélectionner un pays est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "dans une résidence de tourisme est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de lots à usage commercial est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nombre de lots à usage rural est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nombre total de lots est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "habitation est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de lots à usage de location meublée est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de lots à usage de terrain nu est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de lots à usage professionnel est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de lots à usage de garage /cave est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de lots à usage de location saisonnière occasionnelle est obligatoire"
      )
      .should("be.visible");

    // Selectionner un pays

    getIframeBody().find('input[data-cy="select-country"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Sélectionner un pays est obligatoire")
      .should("not.exist");

    // Présence d'un lot dans une résidence de tourisme

    getIframeBody().find('input[data-cy="21"]').click();

    getIframeBody().find('div[role="option"]').contains("Non").first().click();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("dans une résidence de tourisme est obligatoire")
      .should("not.exist");

    // Nombre de lots à usage commercial

    getIframeBody()
      .find('input[id="Nombre de lots à usage commercial"]')
      .type(ParcoursData.FO.parcoursIMMO.nbLotsUsageCo);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nombre de lots à usage commercial est obligatoire")
      .should("not.exist");

    // Nombre de lots à usage rural

    getIframeBody()
      .find('input[id="Nombre de lots à usage rural"]')
      .type(ParcoursData.FO.parcoursIMMO.nbLotsUsageRu);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nombre de lots à usage rural est obligatoire")
      .should("not.exist");

    // Nombre total de lots

    getIframeBody()
      .find('input[id="Nombre total de lots"]')
      .type(ParcoursData.FO.parcoursIMMO.nbTotalLots);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nombre total de lots est obligatoire")
      .should("not.exist");

    // Nombre de lots à usage d'habitation

    getIframeBody()
      .find('input[data-cy="22"]')
      .type(ParcoursData.FO.parcoursIMMO.nbLotsUsageHa);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("habitation est obligatoire")
      .should("not.exist");

    // Nombre de lots à usage de location meublée

    getIframeBody()
      .find('input[id="Nombre de lots à usage de location meublée"]')
      .type(ParcoursData.FO.parcoursIMMO.nbLotsUsageLo);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "Le champ Nombre de lots à usage de location meublée est obligatoire"
      )
      .should("not.exist");

    // Nombre de lots à usage de terrain nu

    getIframeBody()
      .find('input[id="Nombre de lots à usage de terrain nu"]')
      .type(ParcoursData.FO.parcoursIMMO.nbLotsUsageTe);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nombre de lots à usage de terrain nu est obligatoire")
      .should("not.exist");

    // Nombre de lots à usage professionnel

    getIframeBody()
      .find('input[id="Nombre de lots à usage professionnel"]')
      .type(ParcoursData.FO.parcoursIMMO.nbLotsUsagePro);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nombre de lots à usage professionnel est obligatoire")
      .should("not.exist");

    // Nombre de lots à usage de garage/cave

    getIframeBody()
      .find('input[id="Nombre de lots à usage de garage /cave"]')
      .type(ParcoursData.FO.parcoursIMMO.nbLotsUsageGa);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "Le champ Nombre de lots à usage de garage /cave est obligatoire"
      )
      .should("not.exist");

    // Nombre de lots à usage de location saisonnière occasionnelle

    getIframeBody()
      .find(
        'input[id="Nombre de lots à usage de location saisonnière occasionnelle"]'
      )
      .type(ParcoursData.FO.parcoursIMMO.nbLotsUsageSaison);

    // Calculer le tarif

    getIframeBody().find("button").contains("Calculer").click();

    // Sélectionner la première offre

    getIframeBody().find("button").contains("Sélectionner").first().click();

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Sans remplir les champs

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Civilité est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nom est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Prénom est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Adresse est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Ville est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Code postal est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire"
      )
      .should("be.visible");

    // Civilité

    getIframeBody().find('input[data-cy="civilite"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("Monsieur")
      .first()
      .click();

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Civilité est obligatoire")
      .should("not.exist");

    // Nom

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.FO.parcoursIMMO.nom);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nom est obligatoire")
      .should("not.exist");

    // Prénom

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.FO.parcoursIMMO.prenom);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Prénom est obligatoire")
      .should("not.exist");

    // Date de naissance

    getIframeBody()
      .find("input[type=date]")
      .last()
      .click()
      .type(ParcoursData.FO.parcoursIMMO.dateNaissance);

    // Lieu de Naissance

    getIframeBody()
      .find('input[data-cy="lieuNaissance"]')
      .type(ParcoursData.FO.parcoursIMMO.lieuNaissance);

    // Adresse

    getIframeBody()
      .find('input[id="adresse1"]')
      .type(ParcoursData.FO.parcoursIMMO.adresse1);

    // Ville

    getIframeBody().find('input[id="ville"]').click().type("Lille");

    // Code Postal

    getIframeBody().find('input[id="codePostal"]').click().type("92210");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Adresse est obligatoire")
      .should("not.exist");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Ville est obligatoire")
      .should("not.exist");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Code postal est obligatoire")
      .should("not.exist");

    // Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ?

    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.FO.parcoursIMMO.nbProcedures);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire"
      )
      .should("not.exist");

    // Avez-vous déjà souscrit à une assurance de protection juridique ?

    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('input[type="radio"]')
      .last()
      .click({ force: true });

    // Redacteur devis

    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.FO.parcoursIMMO.emisPar);

    // // Récupération du numéro de devis

    // getIframeBody()
    //   .find("#app")
    //   .contains("Numéro de devis")
    //   .contains("HD")
    //   .then((numDevis) => {
    //     numeroDevis = numDevis.text();
    //     cy.wrap(numeroDevis).as("numeroDevis");
    //   });

    // ---------------------
    // Devis - Récapitulatif du devis en cours
    // ---------------------

    cy.wait(5000);

    getIframeBody().find("button").contains("Étape suivante").click();

    // Variation commission courtier

    getIframeBody()
      .find('div[class="v-slider__thumb primary"]')
      .trigger("mousedown", { button: 0 })
      .trigger("mousemove", { clientX: 0, clientY: 50 })
      .trigger("mouseup");

    getIframeBody().find("button").contains("Recalculer tarif").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Recalcul tarif effectué")
      .should("be.visible");

    // Emettre le devis

    getIframeBody().find("button").contains("Emettre le devis").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le devis a bien été émis")
      .should("be.visible");

    cy.wait(5000);

    // Transformer en contrat

    getIframeBody().contains("Transformer en contrat").click();

    // // Checker que le devis existe dans la liste des devis

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
    //         .first()
    //         .click();

    // getIframeBody()
    //         .find('div[class="v-list-item__title"]')
    //         .contains("Transformer en contrat")
    //         .click();

    // ---------------------
    // Saisie date d'effet
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetPassee);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Veuillez saisir une date supérieure à la date du")
      .should("be.visible");

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le format de la date")
      .and("contain", "est pas correct")
      .should("be.visible");

    // Date d'effet dans le futur (+ d'un an)

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetFuture);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Veuillez saisir une date antérieure ou égale à la date du"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le format de la date")
      .and("contain", "est pas correct")
      .should("be.visible");

    // Date d'effet valide

    cy.wait(2000);

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetValide);

    getIframeBody().find("button").contains("Valider").click();

    // Valider sans les champs obligatoires

    getIframeBody().find('input[type="date"]').clear();

    getIframeBody().find('input[data-cy="lieuNaissance"]').clear();

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Téléphone 1 est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Mail est obligatoire")
      .should("be.visible");

    // getIframeBody().find('div[class="v-messages__message"]')
    //   .and('contain', 'Le champ Date de naissance est obligatoire')
    //   .should('be.visible')

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Lieu de naissance est obligatoire")
      .should("be.visible");

    // Saisie du numéro de téléphone en laissant le champ mail vierge

    getIframeBody()
      .find('input[type="date"]')
      .last()
      .click()
      .type(ParcoursData.FO.parcoursIMMO.dateNaissance, { force: true });

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Date de naissance est obligatoire")
      .should("not.exist");

    getIframeBody()
      .find('input[data-cy="lieuNaissance"]')
      .type(ParcoursData.FO.parcoursIMMO.lieuNaissance);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Lieu de naissance est obligatoire")
      .should("not.exist");

    getIframeBody().find('input[data-cy="telephone1"]').type(1111);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Téléphone 1 est invalide")
      .should("be.visible");

    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.telephone);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Mail est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Téléphone 1 est obligatoire")
      .should("not.exist");

    // Saisie du mail en laissant le champ téléphone vierge

    getIframeBody().find('input[data-cy="telephone1"]').clear();

    getIframeBody().find('input[data-cy="mail"]').type(1111);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Mail est invalide")
      .should("be.visible");

    getIframeBody()
      .find('input[data-cy="mail"]')
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.mail);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Téléphone 1 est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Mail est obligatoire")
      .should("not.exist");

    // Ajout du numéro de téléphone

    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .type(ParcoursData.FO.parcoursIMMO.telephone);

    getIframeBody().find("button").contains("Étape suivante").click();

    // Paiement

    getIframeBody().find("button").contains("Enregistrer").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Fractionnement est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Moyen de paiement est obligatoire")
      .should("be.visible");

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

    // getIframeBody().find('div[class="v-messages__message"]')
    //         .contains('Le champ Fractionnement est obligatoire')
    //         .should('not.exist')

    // getIframeBody().find('div[class="v-messages__message"]')
    //         .contains('Le champ Moyen de paiement est obligatoire')
    //         .should('not.exist')

    getIframeBody().find("button").contains("Enregistrer").click();

    cy.wait(30000);

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    getIframeBody().find("button").contains("Signer électroniquement").click();

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.FO.parcoursIMMO.prenom);

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.FO.parcoursIMMO.nom);

    getIframeBody().find('input[data-cy="mail"]').type("1111");

    getIframeBody().find('input[data-cy="portable"]').type("AAAA");

    getIframeBody()
      .find('h1[class="title-helios"]')
      .parent()
      .find("button")
      .contains("Valider")
      .click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Téléphone  est invalide")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Mail est invalide")
      .should("be.visible");

    getIframeBody()
      .find('input[data-cy="mail"]')
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.mail);

    getIframeBody()
      .find('input[data-cy="portable"]')
      .clear()
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
