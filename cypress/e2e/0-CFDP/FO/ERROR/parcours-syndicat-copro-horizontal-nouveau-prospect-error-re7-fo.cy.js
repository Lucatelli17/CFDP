import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours SYNDICAT COPRO HORIZONTAL NOUVEAU PROSPECT ERROR RE7 FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
  });

  it("Parcours Syndicat Copro Horizontal Nouveau Prospect Error", () => {
    // ---------------------
    // Sélection prospect & produit
    // ---------------------

    getIframeBody().find('a[href="/souscription/produits/Immobilier"]').click();
    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Syndicat de Copropriétaires")
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
      .find('div[role="status"]')
      .and("contain", "Le format de la date")
      .and("contain", "est pas correct")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Veuillez saisir une date supérieure à la date du")
      .should("be.visible");

    // Date d'effet dans le futur (+ d'un an)

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetFuture);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class^="v-messages__message"]')
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

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetValide);

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Informations tarifantes
    // ---------------------

    // Calculer sans remplir les champs

    getIframeBody()
      .find('input[id="Nombre de lots (Si copropriété horizontale)"]')
      .clear();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Sélectionner un pays est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Type de copropriété est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and(
        "contain",
        "Le champ Type de gestion de la copropriété est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de lots (Si copropriété horizontale) est obligatoire"
      )
      .should("be.visible");

    // Sélection Pays

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
      .find('div[class^="v-messages__message"]')
      .contains("Le champ Sélectionner un pays est obligatoire")
      .should("not.exist");

    // Type copropriété

    getIframeBody().find('div[role="combobox"]').first().click();

    getIframeBody().find('div[role="listbox"]').contains("Horizontale").click();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .contains("Le champ Type de copropriété est obligatoire")
      .should("not.exist");

    // Type de gestion copropriété

    getIframeBody().find('div[role="combobox"]').last().click();

    getIframeBody()
      .find('div[role="listbox"]')
      .contains("Syndic bénévole ou coopératif")
      .click();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .contains("Le champ Type de gestion de la copropriété est obligatoire")
      .should("not.exist");

    // Nb lots

    getIframeBody()
      .find('div[title="Nombre de lots (Si copropriété horizontale)"]')
      .type(ParcoursData.FO.parcoursIMMO.nbLots);

    // CALCULER

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody().find("button").contains("Sélectionner").first().click();

    // ---------------------
    // Devis - Recherche client
    // ---------------------

    // Nouveau prospect

    getIframeBody().find("button").contains("Nouveau prospect").click();

    // // ---------------------
    // // Devis - Informations complémentaires
    // // ---------------------

    // Etape suivante sans remplir les champs

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Raison sociale est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Forme juridique est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Adresse est obligatoire")
      .first()
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Ville est obligatoire")
      .first()
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Code postal est obligatoire")
      .first()
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Civilité est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Nom est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ En qualité de est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Nom de la copropriété est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Adresse est obligatoire")
      .last()
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Ville est obligatoire")
      .last()
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Code postal est obligatoire")
      .last()
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and(
        "contain",
        "Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and(
        "contain",
        "Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Le champ Pays est obligatoire")
      .should("be.visible");

    // Raison sociale

    getIframeBody()
      .find('div[title="Raison sociale"]')
      .click()
      .type(ParcoursData.FO.parcoursIMMO.raisonSociale);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .should("not.contain", "Le champ Raison sociale est obligatoire");

    // Forme juridique

    getIframeBody()
      .find('div[title="Forme juridique"]')
      .type(ParcoursData.FO.parcoursIMMO.formeJuridique);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .should("not.contain", "Le champ Forme juridique est obligatoire");

    // Adresse Souscripteur + adresse Bénéficiaire

    getIframeBody()
      .find('div[title="Adresse"]')
      .first()
      .type(ParcoursData.FO.parcoursIMMO.adresse1);

    getIframeBody()
      .find('input[id="adresse1"]')
      .type(ParcoursData.FO.parcoursIMMO.adresse1, { force: true });

    // Ville Souscripteur + Ville bénéficiaire

    // getIframeBody().find('input[id="autoCompletion-ville"]')
    //         .type(ParcoursData.FO.parcoursIMMO.ville)

    getIframeBody()
      .find('input[id="autoCompletion-ville"]')
      .first()
      .type(ParcoursData.FO.parcoursIMMO.ville);

    getIframeBody()
      .find('div[role="option"]:visible')
      .contains(ParcoursData.FO.parcoursIMMO.ville)
      .first()
      .click();

    getIframeBody()
      .find('div[title="Ville"]')
      .last()
      .type(ParcoursData.FO.parcoursIMMO.villeBeneficiaire);

    // // Code postal bénéficiaire

    getIframeBody()
      .find('input[data-cy="codePostalBeneficaire"]')
      .type(ParcoursData.FO.parcoursIMMO.codePostal);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .should("not.contain", "Veuillez valider tous les champs");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .should("not.contain", "Le champ Adresse est obligatoire");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .should("not.contain", "Le champ Ville est obligatoire");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .should("not.contain", "Le champ Code postal est obligatoire");

    // Sélection Civilité

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
      .find('div[class^="v-messages__message"]')
      .should("not.contain", "Le champ Civilité est obligatoire");

    // Nom & prénom représentant

    getIframeBody()
      .find('input[data-cy="nomRepresentant"]')
      .type(ParcoursData.FO.parcoursIMMO.nom);

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.FO.parcoursIMMO.prenom);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .should("not.contain", "Le champ Nom est obligatoire");

    // En qualité de

    getIframeBody()
      .find('input[data-cy="qualiteProfessionnelle"]')
      .type(ParcoursData.FO.parcoursIMMO.qualiteProfessionnelle);

    cy.wait(3000);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .should("not.contain", "Le champ En qualité de est obligatoire");

    // Nom de la copro

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.FO.parcoursIMMO.nomCopro);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .should("not.contain", "Le champ Nom de la copropriété est obligatoire");

    // Pays Bénéficiaire

    getIframeBody()
      .find('input[data-cy="paysBeneficiaire"]')
      .type("France", { force: true });

    getIframeBody()
      .find('div[role="option"]:visible')
      .contains("France")
      .click();

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .should("not.contain", "Le champ Pays est obligatoire");

    //          // Pays Bénéficiaire

    //          getIframeBody().find('input[data-cy="pays"]')
    //          .click();

    //  getIframeBody()
    //          .find('div[role="option"]')
    //          .contains("France")
    //          .first()
    //          .click();

    //  getIframeBody().find('button')
    //          .contains('Étape suivante')
    //          .click()

    //  getIframeBody().find('div[role="status"]')
    //          .and('contain', 'Veuillez valider tous les champs')
    //          .should('be.visible')

    //  getIframeBody().find('div[class^="v-messages__message"]')
    //          .should('not.contain', 'Le champ Pays est obligatoire')

    // // Ville Bénéficiaire

    // getIframeBody().find('div[title="Ville"]')
    //         .last()
    //         .type(ParcoursData.FO.parcoursIMMO.villeBeneficiaire)

    // getIframeBody()
    //         .find('div[role="option"]:visible')
    //         .contains(ParcoursData.FO.parcoursIMMO.villeBeneficiaire)
    //         .first()
    //         .click();

    // getIframeBody().find('button')
    //         .contains('Étape suivante')
    //         .click()

    // getIframeBody().find('div[role="status"]')
    //         .and('contain', 'Veuillez valider tous les champs')
    //         .should('be.visible')

    // cy.wait(3000)

    // getIframeBody().find('div[title="Adresse"]')
    //         .first()
    //         .find('div[class^="v-messages__message"]')
    //         .should('not.contain', 'Le champ Adresse est obligatoire')

    // cy.wait(3000)

    // getIframeBody().find('div[class^="v-messages__message"]')
    //         .and('contain', 'Le champ Ville est obligatoire')
    //         .first()
    //         .should('not.contain', 'Le champ Ville est obligatoire')

    // getIframeBody().find('div[class^="v-messages__message"]')
    //         .and('contain', 'Le champ Code postal est obligatoire')
    //         .first()
    //         .should('not.contain', 'Le champ Code postal est obligatoire')

    // Procédures judiciaires

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
      .find('div[class^="v-messages__message"]')
      .should(
        "not.contain",
        "Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire"
      );

    // Assurance protection juridique

    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('input[type="radio"]')
      .last()
      .click({ force: true });

    // Redacteur devis

    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.FO.parcoursIMMO.emisPar);

    // // // Récupération du numéro de devis

    // // getIframeBody()
    // //         .find("#app")
    // //         .contains("Numéro de devis")
    // //         .contains("HD")
    // //         .then((numDevis) => {
    // //                 numeroDevis = numDevis.text();
    // //                 cy.wrap(numeroDevis).as("numeroDevis");
    // //         });

    // cy.wait(5000)

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

    cy.wait(5000);

    // Transformer en contrat
    getIframeBody().contains("Transformer en contrat").click();

    // // cy.get('a[id="dropdown-subscribe"]')
    // //         .click();

    // // cy.get(
    // //         'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
    // // ).click();

    // // getIframeBody()
    // //         .get("@numeroDevis")
    // //         .then((numeroDevis) => {
    // //                 getIframeBody().find('input[id="input-26"]')
    // //                         .click()
    // //                         .type(numeroDevis);

    // //                 cy.wait(2000)
    // //         });

    // // getIframeBody()
    // //         .find("button")
    // //         .contains("Rechercher")
    // //         .click({ force: true });

    // // getIframeBody()
    // //         .find('[class="devis-list__container"]')
    // //         .should("contain.text", numeroDevis);

    // // cy.wait(2000)

    // // // Cliquer sur la liste des actions du devis emis

    // // getIframeBody().find('button[data-cy="listActions"]')
    // //         .click();

    // // getIframeBody()
    // //         .find('div[class="v-list-item__title"]')
    // //         .contains("Transformer en contrat")
    // //         .click();

    // ---------------------
    // Saisie date d'effet contrat
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetPassee);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le format de la date")
      .and("contain", "est pas correct")
      .should("be.visible");

    getIframeBody()
      .find('div[class^="v-messages__message"]')
      .and("contain", "Veuillez saisir une date supérieure à la date du")
      .should("be.visible");

    // Date d'effet dans le futur (+ d'un an)

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetFuture);

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class^="v-messages__message"]')
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

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .clear()
      .type(ParcoursData.FO.parcoursIMMO.datedEffetValide);

    getIframeBody().find("button").contains("Valider").click();

    // Valider sans les champs obligatoires

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

    // Saisie du numéro de téléphone en laissant le champ mail vierge

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

    // getIframeBody().find('input[data-cy="input-siret"]')
    //         .type(ParcoursData.FO.parcoursIMMO.siret)

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

    getIframeBody().find("button").contains("Enregistrer").click();

    cy.wait(35000);

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
