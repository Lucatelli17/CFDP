import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ASSOCIATION ERROR RE7 FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
  });

  it("Association Error", () => {
    // ---------------------
    // Sélection prospect + produit
    // ---------------------

    getIframeBody()
      .find('a[href="/souscription/produits/Association"]')
      .click();

    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Association")
      .click();

    // ---------------------
    // Saisie date d'effet
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursASSOCIATION.datedEffetPassee);

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
      .type(ParcoursData.FO.parcoursASSOCIATION.datedEffetFuture);

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
      .type(ParcoursData.FO.parcoursASSOCIATION.datedEffetValide);

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Devis - Informations tarifantes
    // ---------------------

    // Aucun champs remplis
    getIframeBody().find('input[id="Nombre de salariés"]').clear();

    getIframeBody().find('input[data-cy="19"]').clear();

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
      .and("contain", "Le champ Secteur d")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nombre de salariés est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Type d")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "adhérents est obligatoire")
      .should("be.visible");

    // Nombre d'adhérents

    getIframeBody()
      .find('input[data-cy="19"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.nbAdherents);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("adhérents est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Nombre de salariés

    getIframeBody()
      .find('input[id="Nombre de salariés"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.nbSalaries);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nombre de salariés est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Sélection pays

    getIframeBody().find('input[data-cy="select-country"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Sélectionner un pays est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Type d'association

    getIframeBody().find('input[data-cy="20"]').click();

    getIframeBody().find('div[role="option"]').contains("Employeur").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Type d")
      .should("not.exist");

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Secteur d'activité de l'association

    getIframeBody().find('input[data-cy="18"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("Action Humanitaire et Caritative")
      .click();

    // getIframeBody().find('div[class="v-messages__message"]')
    //         .contains('Le champ Secteur d')
    //         .should('not.exist')

    // CALCULER

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody().find("button").contains("Sélectionner").first().click();

    // // ---------------------
    // // Devis - Informations complémentaires
    // // ---------------------

    // Aucun champs remplis

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Raison sociale est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Forme juridique est obligatoire")
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
      .and("contain", "Le champ Civilité est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nom est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ En qualité de est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Activité statutaire précise est obligatoire")
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

    // Raison sociale

    getIframeBody()
      .find('input[data-cy="raisonSociale"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.raisonSociale);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Raison sociale est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Pays Souscripteur

    getIframeBody().find('input[data-cy="pays"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    // Adresse Souscripteur

    getIframeBody()
      .find('div[title="Adresse"]')
      .first()
      .type(ParcoursData.FO.parcoursASSOCIATION.adresse1);

    // getIframeBody().find('div[class="v-messages__message"]')
    //         .contains('Le champ Adresse est obligatoire')
    //         .should('not.exist')

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Ville Souscripteur

    getIframeBody()
      .find('input[id="autoCompletion-ville"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.ville);

    // getIframeBody().find('div[class="v-messages__message"]')
    //         .contains('Le champ Ville est obligatoire')
    //         .should('not.exist')

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Code Postal Souscripteur

    getIframeBody()
      .find('input[data-cy="codePostal"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.codePostal);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Code postal est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Forme juridique

    getIframeBody()
      .find('div[title="Forme juridique"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.formeJuridique);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Forme juridique est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Sélection Civilité représentant

    getIframeBody().find('input[data-cy="civilite"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("Monsieur")
      .first()
      .click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Civilité est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Nom & prénom représentant

    getIframeBody()
      .find('input[data-cy="nomRepresentant"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.nom);

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.prenom);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nom est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // En qualité de

    getIframeBody()
      .find('input[data-cy="qualiteProfessionnelle"]')
      .type(ParcoursData.FO.parcoursPRO.qualiteProfessionnelle);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ En qualité de est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    //procédures judiciaires

    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.FO.parcoursASSOCIATION.nbProcedures);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire"
      )
      .should("not.exist");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Activité statutaire précise

    getIframeBody()
      .find('input[id="activite"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.activiteStatutaire);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Activité statutaire précise est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Assurance protection juridique

    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('input[type="radio"]')
      .last()
      .click({ force: true });

    // Redacteur devis

    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.emisPar);

    // // // Récupération du numéro de devis
    // // getIframeBody()
    // //         .find("#app")
    // //         .contains("Numéro de devis")
    // //         .contains("HD")
    // //         .then((numDevis) => {
    // //                 numeroDevis = numDevis.text();
    // //                 cy.wrap(numeroDevis).as("numeroDevis");
    // //         });

    getIframeBody().find("button").contains("Étape suivante").click();

    cy.wait(5000);

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

    // getIframeBody().find('div[role="status"]')
    //         .and('contain', 'Devis transformé en contrat')
    //         .should('be.visible')

    // // Vérifier que les documents sont présents
    // // getIframeBody().contains('Téléchargement').parent().then(($DL) => {
    // //         if ($DL.find('button').contains('Rafraîchir')) {
    // //                 getIframeBody().find('button').contains('Rafraîchir').click()
    // //                 cy.wait(10000)
    // //                 getIframeBody().find('[class="sticky top-10"]').should('contain.text', 'CONTRAT')
    // //                 getIframeBody().find('[class="sticky top-10"]').should('contain.text', 'IPID')
    // //         } else {
    // //                 getIframeBody().find('[class="sticky top-10"]').should('contain.text', 'CONTRAT')
    // //                 getIframeBody().find('[class="sticky top-10"]').should('contain.text', 'IPID')
    // //         }
    // // })

    // // Checker que le devis existe dans la liste des devis

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
    // //         });

    // // cy.wait(2000)

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
    // Saisie date d'effet du contrat
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursASSOCIATION.datedEffetPassee);

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
      .type(ParcoursData.FO.parcoursASSOCIATION.datedEffetFuture);

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
      .type(ParcoursData.FO.parcoursASSOCIATION.datedEffetValide);

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
      .should("be.visible")
      .and("contain", "Le champ Téléphone 1 est invalide");

    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .clear()
      .type(ParcoursData.FO.parcoursASSOCIATION.telephone);

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
      .should("be.visible")
      .and("contain", "Le champ Mail est invalide");

    getIframeBody()
      .find('input[data-cy="mail"]')
      .clear()
      .type(ParcoursData.FO.parcoursASSOCIATION.mail);

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
      .type(ParcoursData.FO.parcoursASSOCIATION.telephone);

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
      .contains(ParcoursData.FO.parcoursASSOCIATION.fractionnement)
      .click();

    getIframeBody()
      .find('input[data-cy="moyenDePaiement"]')
      .click()
      .type(ParcoursData.FO.parcoursASSOCIATION.moyenPaiement, {
        force: true,
      })
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
      .type(ParcoursData.FO.parcoursASSOCIATION.prenom);

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.FO.parcoursASSOCIATION.nom);

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
      .type(ParcoursData.FO.parcoursASSOCIATION.mail);

    getIframeBody()
      .find('input[data-cy="portable"]')
      .clear()
      .type(ParcoursData.FO.parcoursASSOCIATION.telephone);

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
