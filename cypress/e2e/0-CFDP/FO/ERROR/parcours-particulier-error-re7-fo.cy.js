import ParcoursData from "../../../../fixtures/dataCFDP.json";

describe("parcours PARTICULIER ERROR RE7 FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
  });

  it("Parcours Particulier Error", () => {
    // ---------------------
    // Sélection prospect & produit
    // ---------------------

    getIframeBody()
      .find('a[href="/souscription/produits/Particulier"]')
      .click();

    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Particulier")
      .click();

    // ---------------------
    // Saisie date d'effet
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursPARTICULIER.datedEffetPassee);

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
      .type(ParcoursData.FO.parcoursPARTICULIER.datedEffetFuture);

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
      .type(ParcoursData.FO.parcoursPARTICULIER.datedEffetValide);

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Devis - Informations tarifantes
    // ---------------------

    // Sans sélectionner de pays

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Sélectionner un pays est obligatoire")
      .should("be.visible");

    // Sélection du pays

    getIframeBody().find('input[data-cy="select-country"]').click();

    getIframeBody()
      .find('div[role="option"]')
      .contains("France")
      .first()
      .click();

    // CALCULER

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody().find("button").contains("Sélectionner").first().click();

    // Sans remplir les champs

    getIframeBody().find('input[data-cy="nombreVehicules"]').clear();

    getIframeBody()
      .find('input[data-cy="nombreResidencesSecondaires"]')
      .clear();

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
      .and("contain", "Le champ Nombre de véhicules est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de résidences secondaires est obligatoire"
      )
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

    // Sélection Civilité

    getIframeBody().find('input[data-cy="civilite"]').click();

    getIframeBody().contains("Madame, Monsieur").click();

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
      .find('input[id="nom"]')
      .type(ParcoursData.FO.parcoursPARTICULIER.nom);

    getIframeBody()
      .find('input[id="prenom"]')
      .type(ParcoursData.FO.parcoursPARTICULIER.prenom);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nom est obligatoire")
      .should("not.exist");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Prénom est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Adresse

    getIframeBody()
      .find('input[id="adresse1"]')
      .type(ParcoursData.FO.parcoursPARTICULIER.adresse1);

    // Ville

    getIframeBody()
      .find('input[id="ville"]')
      .type(ParcoursData.FO.parcoursPARTICULIER.ville);

    // Code postal

    getIframeBody()
      .find('input[id="codePostal"]')
      .type(ParcoursData.FO.parcoursPARTICULIER.codePostal);

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

    // Nombre de véhicules

    getIframeBody()
      .find('input[data-cy="nombreVehicules"]')
      .type(ParcoursData.FO.parcoursPARTICULIER.nombreVehicules);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nombre de véhicules est obligatoire")
      .should("not.exist");

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .contains("Veuillez valider tous les champs")
      .should("be.visible");

    // Nombre de résidences secondaires

    getIframeBody()
      .find('input[data-cy="nombreResidencesSecondaires"]')
      .type(ParcoursData.FO.parcoursPARTICULIER.nombreResidencesSecondaires);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nombre de résidences secondaires est obligatoire")
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
      .type(ParcoursData.FO.parcoursPARTICULIER.nbProcedures);

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

    // Assurance protection juridique

    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('input[type="radio"]')
      .last()
      .click({ force: true });

    // getIframeBody().find('div[class="v-messages__message"]')
    //         .contains('Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire')
    //         .should('not.exist')

    // Redacteur devis

    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.FO.parcoursPARTICULIER.emisPar);

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
    // Saisie date d'effet du contrat
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursPARTICULIER.datedEffetPassee);

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
      .type(ParcoursData.FO.parcoursPARTICULIER.datedEffetFuture);

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
      .type(ParcoursData.FO.parcoursPARTICULIER.datedEffetValide);

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

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Date de naissance est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Lieu de naissance est obligatoire")
      .should("be.visible");

    // Saisie du numéro de téléphone en laissant le champ mail vierge

    getIframeBody()
      .find('input[type="date"]')
      .last()
      .click()
      .type(ParcoursData.FO.parcoursPARTICULIER.dateNaissance, {
        force: true,
      });

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Date de naissance est obligatoire")
      .should("not.exist");

    getIframeBody()
      .find('input[data-cy="lieuNaissance"]')
      .type(ParcoursData.FO.parcoursPARTICULIER.lieuNaissance);

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
      .type(ParcoursData.FO.parcoursPARTICULIER.telephone);

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
      .type(ParcoursData.FO.parcoursPARTICULIER.mail);

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
      .type(ParcoursData.FO.parcoursPARTICULIER.telephone);

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
      .contains(ParcoursData.FO.parcoursPARTICULIER.fractionnement)
      .click();

    getIframeBody()
      .find('input[data-cy="moyenDePaiement"]')
      .click()
      .type(ParcoursData.FO.parcoursPARTICULIER.moyenPaiement, {
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
      .type(ParcoursData.FO.parcoursPARTICULIER.prenom);

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.FO.parcoursPARTICULIER.nom);

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
      .type(ParcoursData.FO.parcoursPARTICULIER.mail);

    getIframeBody()
      .find('input[data-cy="portable"]')
      .clear()
      .type(ParcoursData.FO.parcoursPARTICULIER.telephone);

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
