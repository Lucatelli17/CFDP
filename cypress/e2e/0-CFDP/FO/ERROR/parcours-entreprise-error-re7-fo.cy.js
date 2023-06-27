import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours ENTREPRISE ERROR FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
    //cy.selectionCodeCourtier(envChoisi, ParcoursData.FO.login.codeIA);
  });

  it("Parcours Entreprise Error", () => {
    // ---------------------
    // Sélection prospect + produit
    // ---------------------

    getIframeBody()
      .find('a[href="/souscription/produits/Professionnel"]')
      .click();

    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Entreprise")
      .click();

    // ---------------------
    // Saisie date d'effet
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursENTREPRISE.datedEffetPassee);

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
      .type(ParcoursData.FO.parcoursENTREPRISE.datedEffetFuture);

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
      .type(ParcoursData.FO.parcoursENTREPRISE.datedEffetValide);

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Vérification numéro de SIRET
    // ---------------------

    // SIRET erroné

    getIframeBody().find('input[data-cy="select-country"]').click();

    getIframeBody().find('div[role="option"]').first().click();

    getIframeBody()
      .find('input[data-cy="input-siret"]')
      .click()
      .type("111111111111111");

    getIframeBody().find("button").contains("Valider").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "SIRET is not valid")
      .should("be.visible");

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // SIRET ok

    getIframeBody()
      .contains("Retrouver toutes les informations légales par nom")
      .parent()
      .find('[class="v-select__selections"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.nomEntreprise);

    getIframeBody()
      .find('[role="listbox"]')
      .contains(ParcoursData.FO.parcoursENTREPRISE.siret)
      .click();

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Informations tarifantes
    // ---------------------

    // Sans les champs remplis

    getIframeBody().find('[id="Nombre de salariés"]').clear();

    getIframeBody()
      .find('[id="Nombre de véhicules terrestres à moteur"]')
      .clear();

    getIframeBody().find('[id^="Chiffre"]').clear();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Code NAF est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nombre de salariés est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de véhicules terrestres à moteur est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "affaires HT est obligatoire")
      .should("be.visible");

    getIframeBody().find('[id="Nombre de salariés"]').type(0);

    getIframeBody()
      .find('[id="Nombre de véhicules terrestres à moteur"]')
      .type(0);

    getIframeBody().find('[id^="Chiffre"]').type(0);

    // Code NAF erroné

    getIframeBody().find('input[data-cy="42"]').click().type("01.11Z");

    getIframeBody().find('[role="listbox"]').contains("01.11Z").click();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('p[class="error-bloquant"]')
      .contains("est pas disponible pour ce type")
      .should("be.visible");

    getIframeBody()
      .find('p[class="error-bloquant"]')
      .contains(
        "Contactez votre délégation de proximité si vous souhaitez une étude personnalisée"
      )
      .should("be.visible");

    getIframeBody()
      .find("button")
      .contains("Afficher les informations")
      .click();

    // Code NAF

    getIframeBody()
      .find('input[data-cy="42"]')
      .click()
      .clear()
      .type(ParcoursData.FO.parcoursENTREPRISE.codeNAF);

    getIframeBody()
      .find('[role="listbox"]')
      .contains(ParcoursData.FO.parcoursENTREPRISE.codeNAF)
      .click();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Problème lors de la tarification")
      .should("be.visible");

    getIframeBody()
      .find("button")
      .contains("Afficher les informations")
      .click();

    //Nombre de salariés

    getIframeBody()
      .find('[id="Nombre de salariés"]')
      .clear()
      .type(ParcoursData.FO.parcoursENTREPRISE.nbSalaries);

    //Nombre de véhicules terrestres à moteur

    getIframeBody()
      .find('[id="Nombre de véhicules terrestres à moteur"]')
      .clear()
      .type(ParcoursData.FO.parcoursENTREPRISE.nbVTM);

    // Chiffres d'affaires

    getIframeBody().find('[id^="Chiffre"]').clear().type(100000000);

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('p[class="error-bloquant"]')
      .contains(
        "pas disponible pour les professionnels ayant un CA de plus de 50 000 000"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Problème lors de la tarification")
      .should("be.visible");

    getIframeBody()
      .find("button")
      .contains("Afficher les informations")
      .click();

    getIframeBody()
      .find('[id^="Chiffre"]')
      .clear()
      .type(ParcoursData.FO.parcoursENTREPRISE.CA);

    getIframeBody().find("button").contains("Calculer").click();

    // Sélection Tarification

    getIframeBody().find("button").contains("Sélectionner").first().click();

    // // Récupération du numéro de devis
    // getIframeBody()
    //         .find("#app")
    //         .contains("Numéro de devis")
    //         .contains("HD")
    //         .then((numDevis) => {
    //                 numeroDevis = numDevis.text();
    //                 cy.wrap(numeroDevis).as("numeroDevis");
    //         });

    // Etape suivante sans remplir les champs obligatoires

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    //Erreur Civilité

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Civilité est obligatoire")
      .should("be.visible");

    // Erreur Nom

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nom est obligatoire")
      .should("be.visible");

    // Erreur En qualité de

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ En qualité de est obligatoire")
      .should("be.visible");

    // Erreur Activité précise

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Activité précise est obligatoire")
      .should("be.visible");

    // Erreur Locaux servant à l'exploitation de l'activité

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "activité appartiennent-ils à une SCI dont le souscripteur détient des parts ? est obligatoire"
      )
      .should("be.visible");

    // Erreur Procédures judiciaires

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire"
      )
      .should("be.visible");

    // Erreur Assurance protection juridique

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire"
      )
      .should("be.visible");

    // Erreur Redressement judiciaire dans les 36 derniers mois

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "redressement judiciaire depuis les 36 derniers mois ? est obligatoire"
      )
      .should("be.visible");

    // Bouton radio locaux exploitation activité

    getIframeBody()
      .find('div[id="locauxSciAvecPartsSouscripteur"]')
      .find('input[type="radio"]')
      .last()
      .click({ force: true });

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "activité appartiennent-ils à une SCI dont le souscripteur détient des parts ? est obligatoire"
      )
      .should("not.exist");

    // Bouton radio assurance protection juridique

    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('input[type="radio"]')
      .last()
      .click({ force: true });

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire"
      )
      .should("not.exist");

    // Bouton radio redressement judiciaire

    getIframeBody()
      .find('div[id="redressementJudiciaire"]')
      .find('input[type="radio"]')
      .last()
      .click({ force: true });

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "redressement judiciaire depuis les 36 derniers mois ? est obligatoire"
      )
      .should("not.exist");

    // En qualité de

    getIframeBody()
      .find('input[data-cy="qualiteProfessionnelle"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.qualiteProfessionnelle);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ En qualité de est obligatoire")
      .should("not.exist");

    // Sélection Civilité

    getIframeBody()
      .find('[class="col col-4"]')
      .find('[role="button"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.civilite);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Civilité est obligatoire")
      .should("not.exist");

    // Nom & prénom représentant

    getIframeBody()
      .find('[id="nomRepresentant"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.nom);
    getIframeBody()
      .find('[id="prenom"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.prenom);

    //procédures judiciaires

    getIframeBody()
      .find('[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.FO.parcoursENTREPRISE.nbProcedures);

    // Activité précise

    getIframeBody()
      .find('input[data-cy="activite"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.activite);

    // Redacteur devis

    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.emisPar);

    // Sans Nom

    getIframeBody().find('[id="nomRepresentant"]').clear();

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nom est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('[id="nomRepresentant"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.nom);

    // Sans activité précise

    getIframeBody().find('input[data-cy="activite"]').clear();

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Activité précise est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('input[data-cy="activite"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.activite);

    // Sans procédures judiciaires

    getIframeBody().find('[id="nombreProcedures"]').clear();

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.FO.parcoursENTREPRISE.nbProcedures);

    // // Champs obligatoires remplis
    // getIframeBody().find('div[role="status"]')
    //         .and('contain', 'Le devis a été initialisé')
    //         .should('be.visible')

    getIframeBody().find("button").contains("Étape suivante").click();

    //  Devis mis à jour

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Devis mis à jour")
      .should("be.visible");

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
    // cy.get('a[id="dropdown-subscribe"]').click();
    // cy.get(
    //         'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
    // ).click();
    // getIframeBody()
    //         .get("@numeroDevis")
    //         .then((numeroDevis) => {
    //                 getIframeBody().find('input[id="input-26"]')
    //                 .click()
    //                 .type(numeroDevis);
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
    // .click();
    // getIframeBody()
    //         .find('div[class="v-list-item__title"]')
    //         .contains("Transformer en contrat")
    //         .click();

    // ---------------------
    // Saisie date d'effet contrat
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursENTREPRISE.datedEffetPassee);

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
      .type(ParcoursData.FO.parcoursENTREPRISE.datedEffetFuture);

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
      .type(ParcoursData.FO.parcoursENTREPRISE.datedEffetValide);

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
      .type(ParcoursData.FO.parcoursENTREPRISE.telephone);

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
      .type(ParcoursData.FO.parcoursENTREPRISE.mail);

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
      .type(ParcoursData.FO.parcoursENTREPRISE.telephone);

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

    getIframeBody().find("button").contains("Enregistrer").click();

    cy.wait(30000);

    // ---------------------
    // Envoi de la signature électronique
    // ---------------------

    getIframeBody().find("button").contains("Signer électroniquement").click();

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.prenom);

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.FO.parcoursENTREPRISE.nom);

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
      .type(ParcoursData.FO.parcoursENTREPRISE.mail);

    getIframeBody()
      .find('input[data-cy="portable"]')
      .clear()
      .type(ParcoursData.FO.parcoursENTREPRISE.telephone);

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
