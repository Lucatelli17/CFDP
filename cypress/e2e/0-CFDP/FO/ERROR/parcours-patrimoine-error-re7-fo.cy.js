import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours IMMOBILIER Alsina patrimoine immobilier Error FO", () => {
  beforeEach(() => {
    cy.visit(ParcoursData.re7FO.login.URLsouscription);
    cy.get('input[id="username"]')
      .type(ParcoursData.re7FO.login.username);
    cy.get('input[id="password"]')
      .type(ParcoursData.re7FO.login.password);
    cy.get('button[id="signin"]')
      .click();
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

  it("Parcours Patrimoine Error", () => {
    let numeroDevis = "";

    // ---------------------
    // Sélection prospect + produit
    // ---------------------

    getIframeBody().find('a[href="/souscription/produits/Immobilier"]')
      .click();
    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Patrimoine Immobilier")
      .click();

    // ---------------------
    // Saisie date d'effet
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody().find('input[type="date"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.datedEffetPassee)
    getIframeBody().find('button')
      .contains('Valider')
      .click()
    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Veuillez saisir une date supérieure à la date du')
    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Le format de la date')
      .and('contain', 'est pas correct')

    // Date d'effet dans le futur (+ d'un an)

    getIframeBody().find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.datedEffetFuture)
    getIframeBody().find('button')
      .contains('Valider')
      .click()
    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Veuillez saisir une date antérieure ou égale à la date du')
    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Le format de la date')
      .and('contain', 'est pas correct')

    // Date d'effet valide
    cy.wait(2000)
    getIframeBody().find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.re7FO.parcoursIMMO.datedEffetValide)
    getIframeBody().find('button')
      .contains('Valider')
      .click()

    // ---------------------
    // Devis - Tarification
    // ---------------------

    // Sans remplir les champs

    getIframeBody().find('input[id="Nombre de lots à usage commercial"]')
      .clear();

    getIframeBody().find('input[id="Nombre de lots à usage rural"]')
      .clear();

    getIframeBody().find('input[id="Nombre total de lots"]')
      .clear();

    getIframeBody().find('input[data-cy="22"]')
      .clear();

    getIframeBody().find('input[id="Nombre de lots à usage de location meublée"]')
      .clear();

    getIframeBody().find('input[id="Nombre de lots à usage de terrain nu"]')
      .clear();

    getIframeBody().find('input[id="Nombre de lots à usage professionnel"]')
      .clear();

    getIframeBody().find('input[id="Nombre de lots à usage de garage /cave"]')
      .clear();

    getIframeBody().find('input[id="Nombre de lots à usage de location saisonnière occasionnelle"]')
      .clear();

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Sélectionner un pays est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'dans une résidence de tourisme est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Nombre de lots à usage commercial est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Nombre de lots à usage rural est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Nombre total de lots est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'habitation est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Nombre de lots à usage de location meublée est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Nombre de lots à usage de terrain nu est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Nombre de lots à usage professionnel est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Nombre de lots à usage de garage /cave est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Nombre de lots à usage de location saisonnière occasionnelle est obligatoire')

    // Selectionner un pays
    getIframeBody().find('input[data-cy="select-country"]')
      .click();
    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Sélectionner un pays est obligatoire')
      .should('not.exist')

    // Présence d'un lot dans une résidence de tourisme
    getIframeBody().find('input[data-cy="21"]')
      .click();
    getIframeBody().find('div[role="option"]')
      .contains("Non")
      .first()
      .click();

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('dans une résidence de tourisme est obligatoire')
      .should('not.exist')

    // Nombre de lots à usage commercial

    getIframeBody().find('input[id="Nombre de lots à usage commercial"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbLotsUsageCo);

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Nombre de lots à usage commercial est obligatoire')
      .should('not.exist')

    // Nombre de lots à usage rural

    getIframeBody().find('input[id="Nombre de lots à usage rural"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbLotsUsageRu);

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Nombre de lots à usage rural est obligatoire')
      .should('not.exist')

    // Nombre total de lots

    getIframeBody().find('input[id="Nombre total de lots"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbTotalLots);

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Nombre total de lots est obligatoire')
      .should('not.exist')

    // Nombre de lots à usage d'habitation

    getIframeBody().find('input[data-cy="22"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbLotsUsageHa);

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('habitation est obligatoire')
      .should('not.exist')

    // Nombre de lots à usage de location meublée

    getIframeBody().find('input[id="Nombre de lots à usage de location meublée"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbLotsUsageLo);

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Nombre de lots à usage de location meublée est obligatoire')
      .should('not.exist')

    // Nombre de lots à usage de terrain nu

    getIframeBody().find('input[id="Nombre de lots à usage de terrain nu"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbLotsUsageTe);

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Nombre de lots à usage de terrain nu est obligatoire')
      .should('not.exist')

    // Nombre de lots à usage professionnel

    getIframeBody().find('input[id="Nombre de lots à usage professionnel"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbLotsUsagePro);

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Nombre de lots à usage professionnel est obligatoire')
      .should('not.exist')

    // Nombre de lots à usage de garage/cave

    getIframeBody().find('input[id="Nombre de lots à usage de garage /cave"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbLotsUsageGa);

    getIframeBody().find('button')
      .contains('Calculer')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Nombre de lots à usage de garage /cave est obligatoire')
      .should('not.exist')

    // Nombre de lots à usage de location saisonnière occasionnelle

    getIframeBody().find('input[id="Nombre de lots à usage de location saisonnière occasionnelle"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nbLotsUsageSaison);

    // Calculer le tarif
    getIframeBody().find("button")
      .contains("Calculer")
      .click();

    // Sélectionner la première offre
    getIframeBody().find("button")
      .contains("Sélectionner")
      .first()
      .click();

    // ---------------------
    // Devis - Informations complémentaires
    // ---------------------

    // Sans remplir les champs 

    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Civilité est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Nom est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Prénom est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Adresse est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Ville est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Code postal est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire')

    // Civilité
    getIframeBody().find('input[data-cy="civilite"]')
      .click();
    getIframeBody()
      .find('div[role="option"]')
      .contains("Monsieur")
      .first()
      .click();

    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Civilité est obligatoire')
      .should('not.exist')

    // Nom
    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.nom);

    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Nom est obligatoire')
      .should('not.exist')

    // Prénom
    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursIMMO.prenom);

    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Prénom est obligatoire')
      .should('not.exist')

    // Date de naissance
    getIframeBody()
      .find("input[type=date]")
      .last()
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.dateNaissance);

    // Lieu de Naissance
    getIframeBody()
      .find('input[data-cy="lieuNaissance"]')
      .type(ParcoursData.re7FO.parcoursIMMO.lieuNaissance);

    // Adresse
    getIframeBody()
      .find('input[id="adresse1"]')
      .type(ParcoursData.re7FO.parcoursIMMO.adresse1);

    // Ville
    getIframeBody().find('input[id="ville"]')
      .click()
      .type("Lille");

    // Code Postal
    getIframeBody().find('input[id="codePostal"]')
      .click()
      .type("92210");

    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Adresse est obligatoire')
      .should('not.exist')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Ville est obligatoire')
      .should('not.exist')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Code postal est obligatoire')
      .should('not.exist')

    // Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ?
    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.re7FO.parcoursIMMO.nbProcedures);


    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire')
      .should('not.exist')

    // Avez-vous déjà souscrit à une assurance de protection juridique ?
    getIframeBody().find('div[id="assuranceDejaSouscrite"]')
      .find('input[type="radio"]')
      .last()
      .click({ force: true })

    // Redacteur devis
    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.re7FO.parcoursIMMO.emisPar);

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

    cy.wait(5000)

    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()

    // Variation commission courtier
    getIframeBody().find('div[class="v-slider__thumb primary"]')
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', { clientX: 0, clientY: 50 })
      .trigger('mouseup');

    getIframeBody().find('button')
      .contains('Recalculer tarif')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Recalcul tarif effectué')

    // Emettre le devis
    getIframeBody().find('button')
      .contains('Emettre le devis')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Le devis a bien été émis')
    cy.wait(5000)

    // Transformer en contrat 
    getIframeBody().find('a[class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default primary"]')
      .click()


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
    // Saisie date d'effet du contrat
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody().find('input[type="date"]')
      .click()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.datedEffetPassee)
    getIframeBody().find('button')
      .contains('Valider')
      .click()
    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Veuillez saisir une date supérieure à la date du')
    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Le format de la date')
      .and('contain', 'est pas correct')

    // Date d'effet dans le futur (+ d'un an)

    getIframeBody().find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.datedEffetFuture)
    getIframeBody().find('button')
      .contains('Valider')
      .click()
    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Veuillez saisir une date antérieure ou égale à la date du')
    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Le format de la date')
      .and('contain', 'est pas correct')

    // Date d'effet valide
    cy.wait(2000)
    getIframeBody().find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.datedEffetValide)
    getIframeBody().find('button')
      .contains('Valider')
      .click()

    // Valider sans les champs obligatoires

    getIframeBody().find('input[type="date"]')
      .clear()

    getIframeBody().find('input[data-cy="lieuNaissance"]')
      .clear()

    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()

    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Téléphone 1 est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Mail est obligatoire')

    // getIframeBody().find('div[class="v-messages__message"]')
    //   .should('be.visible')
    //   .and('contain', 'Le champ Date de naissance est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Lieu de naissance est obligatoire')

    // Saisie du numéro de téléphone en laissant le champ mail vierge

    getIframeBody().find('input[type="date"]')
      .last()
      .click()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.dateNaissance, { force: true })

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Date de naissance est obligatoire')
      .should('not.exist')

    getIframeBody().find('input[data-cy="lieuNaissance"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.lieuNaissance)

    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Lieu de naissance est obligatoire')
      .should('not.exist')

    getIframeBody().find('input[data-cy="telephone1"]')
      .type(1111)
    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Téléphone 1 est invalide')
    getIframeBody().find('input[data-cy="telephone1"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.telephone)
    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()
    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')
    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Mail est obligatoire')
    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Téléphone 1 est obligatoire')
      .should('not.exist')

    // Saisie du mail en laissant le champ téléphone vierge
    getIframeBody().find('input[data-cy="telephone1"]').clear()
    getIframeBody().find('input[data-cy="mail"]')
      .type(1111)
    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Mail est invalide')
    getIframeBody().find('input[data-cy="mail"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.mail)
    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()
    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Veuillez valider tous les champs')
    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Téléphone 1 est obligatoire')
    getIframeBody().find('div[class="v-messages__message"]')
      .contains('Le champ Mail est obligatoire')
      .should('not.exist')

    // Ajout du numéro de téléphone
    getIframeBody().find('input[data-cy="telephone1"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.telephone)
    getIframeBody().find('button')
      .contains('Étape suivante')
      .click()

    // Paiement

    getIframeBody().find('button')
      .contains('Enregistrer')
      .click()

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Fractionnement est obligatoire')

    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Moyen de paiement est obligatoire')

    getIframeBody().find('input[data-cy="fractionnement"]').click()
    getIframeBody().find('div[class="v-list-item__title"]')
      .contains(ParcoursData.re7FO.parcoursPARTICULIER.fractionnement)
      .click()
    getIframeBody().find('input[data-cy="moyenDePaiement"]')
      .click()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.moyenPaiement, { force: true })
      .type('{enter}', { force: true })

    // getIframeBody().find('div[class="v-messages__message"]')
    //         .contains('Le champ Fractionnement est obligatoire')
    //         .should('not.exist')

    // getIframeBody().find('div[class="v-messages__message"]')
    //         .contains('Le champ Moyen de paiement est obligatoire')
    //         .should('not.exist')

    getIframeBody().find('button')
      .contains('Enregistrer')
      .click()
    cy.wait(30000)

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    getIframeBody().find('button')
      .contains('Signer électroniquement')
      .click()
    getIframeBody().find('input[data-cy="prenom"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.prenom)
    getIframeBody().find('input[data-cy="nom"]')
      .type(ParcoursData.re7FO.parcoursPARTICULIER.nom)
    getIframeBody().find('input[data-cy="mail"]')
      .type('1111')
    getIframeBody().find('input[data-cy="portable"]')
      .type('AAAA')
    getIframeBody().find('h1[class="title-helios"]')
      .parent()
      .find('button')
      .contains('Valider')
      .click()
    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Téléphone  est invalide')
    getIframeBody().find('div[class="v-messages__message"]')
      .should('be.visible')
      .and('contain', 'Le champ Mail est invalide')
    getIframeBody().find('input[data-cy="mail"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.mail)
    getIframeBody().find('input[data-cy="portable"]')
      .clear()
      .type(ParcoursData.re7FO.parcoursPARTICULIER.telephone)
    getIframeBody().find('h1[class="title-helios"]')
      .parent()
      .find('button')
      .contains('Valider')
      .click()
    getIframeBody().find('div[role="status"]')
      .should('be.visible')
      .and('contain', 'Circuit de signature électronique correctement lancé')

  });
});
