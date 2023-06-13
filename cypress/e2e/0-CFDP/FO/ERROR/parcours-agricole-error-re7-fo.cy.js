import ParcoursData from "../../../../fixtures/dataCFDP.json";
import { faker } from "@faker-js/faker";

describe("parcours AGRICOLE ERROR RE7 FO", () => {
  let envChoisi = ParcoursData.environnementChoisi;

  beforeEach(() => {
    cy.loginFO(envChoisi, ParcoursData.FO.login);
  });

  it("Agricole error", () => {
    // ---------------------
    // Sélection produit
    // ---------------------

    getIframeBody().find('a[href="/souscription/produits/Agricole"]').click();
    getIframeBody()
      .find('[class="v-card__title"]')
      .contains("Alsina Agricole")
      .click();

    // ---------------------
    // Saisie date d'effet
    // ---------------------

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursAGRICOLE.datedEffetPassee);

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
      .type(ParcoursData.FO.parcoursAGRICOLE.datedEffetFuture);

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
      .type(ParcoursData.FO.parcoursAGRICOLE.datedEffetValide);

    getIframeBody().find("button").contains("Valider").click();

    // ---------------------
    // Devis - Informations tarifantes
    // ---------------------

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
      .and("contain", "Le champ Forme juridique")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Activité avec commercialisation directe est obligatoire"
      )
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Activité principale est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Activité accessoire de diversification agricole  est obligatoire"
      )
      .should("be.visible");

    // Sélection pays

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

    // Activité avec commercialisation directe

    getIframeBody()
      .find('input[id="Activité avec commercialisation directe"]')
      .click();

    getIframeBody().find('div[role="listbox"]').contains("Non").click();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "Le champ Activité avec commercialisation directe est obligatoire"
      )
      .should("not.exist");

    // Activité accessoire de diversification agricole

    getIframeBody().find('input[data-cy="8"]').click();

    getIframeBody().find('div[role="option"]:visible').first().click();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "Le champ Activité accessoire de diversification agricole  est obligatoire"
      )
      .should("not.exist");

    // Activité principale

    getIframeBody().find('input[id="Activité principale"]').click();

    getIframeBody().find('div[role="listbox"]').contains("Elevage").click();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Activité principale est obligatoire")
      .should("not.exist");

    // Forme juridique de l'exploitation
    getIframeBody().find('input[data-cy="39"]').click();

    getIframeBody()
      .find('div[role="listbox"]')
      .contains(ParcoursData.FO.parcoursAGRICOLE.formeJuridique)
      .click();

    // Chiffre d'affaires

    getIframeBody().find('input[data-cy="10"]').clear();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "affaires HT est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('input[data-cy="10"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.CA);

    // Surface d'exploitation (Ha)
    getIframeBody().find('input[data-cy="11"]').clear();

    getIframeBody().find("button").contains("Calculer").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "exploitation est obligatoire")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("affaires HT est obligatoire")
      .should("not.exist");

    getIframeBody()
      .find('input[data-cy="11"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.surfaceExploitation);

    // CALCULER

    getIframeBody().find("button").contains("Calculer").click();

    // Sélection tarif

    getIframeBody().find("button").contains("Sélectionner").first().click();

    // // ---------------------
    // // Devis - Informations complémentaires
    // // ---------------------

    // Récupération du numéro de devis
    // getIframeBody()
    //         .find("#app")
    //         .contains("Numéro de devis")
    //         .contains("HD")
    //         .then((numDevis) => {
    //                 numeroDevis = numDevis.text();
    //                 cy.wrap(numeroDevis).as("numeroDevis");
    //         });

    // cy.wait(5000)

    getIframeBody().find('input[data-cy="nombreSalaries"]').clear();

    getIframeBody()
      .find('input[data-cy="nombreTravailleursExploitation"]')
      .clear();

    getIframeBody().find('input[data-cy="nombreVehicules"]').clear();

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    // Erreur Raison sociale

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Raison sociale est obligatoire")
      .should("be.visible");

    // Erreur Adresse souscripteur

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Adresse est obligatoire")
      .should("be.visible");

    // Erreur Ville souscripteur

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Ville est obligatoire")
      .should("be.visible");

    // Erreur Code postal souscripteur

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Code postal est obligatoire")
      .should("be.visible");

    // Erreur Civilité représentant

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Civilité est obligatoire")
      .should("be.visible");

    // Erreur Nom représentant

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nom est obligatoire")
      .should("be.visible");

    // Erreur En qualité de

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ En qualité de est obligatoire")
      .should("be.visible");

    // Erreur procédures judiciaires

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

    // Erreur redressement judiciaire

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "un redressement judiciaire depuis les 36 derniers mois ? est obligatoire"
      )
      .should("be.visible");

    // Erreur nombre véhicules

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and(
        "contain",
        "Le champ Nombre de véhicules et engins agricoles est obligatoire"
      )
      .should("be.visible");

    // Erreur nombre personnes travaillant sur l'exploitation

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Nombre de personnes travaillant sur l")
      .should("be.visible");

    // Erreur nombre salariés

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Dont salariés permanents est obligatoire")
      .should("be.visible");

    // Raison sociale

    getIframeBody()
      .find('input[data-cy="raisonSociale"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.raisonSociale);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Raison sociale est obligatoire")
      .should("not.exist");

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
      .type(ParcoursData.FO.parcoursAGRICOLE.adresse1);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Adresse est obligatoire")
      .should("not.exist");

    // Ville Souscripteur

    getIframeBody()
      .find('input[id="autoCompletion-ville"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.ville);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Ville est obligatoire")
      .should("not.exist");

    // Code Postal Souscripteur

    getIframeBody()
      .find('input[data-cy="codePostal"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.codePostal);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Code postal est obligatoire")
      .should("not.exist");

    // En qualité de

    getIframeBody()
      .find('input[data-cy="qualiteProfessionnelle"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.qualiteProfessionnelle);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ En qualité de est obligatoire")
      .should("not.exist");

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
      .find('div[class="v-messages__message"]')
      .contains("Le champ Civilité est obligatoire")
      .should("not.exist");

    // Nom & prénom représentant

    getIframeBody()
      .find('input[data-cy="nomRepresentant"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.nom);

    getIframeBody()
      .find('input[data-cy="prenom"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.prenom);

    // getIframeBody().find('input[data-cy="nomRepresentant"]')
    //         .type(faker.name.lastName())
    // getIframeBody().find('input[data-cy="prenom"]')
    //         .type(faker.name.firstName())

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Nom est obligatoire")
      .should("not.exist");

    //procédures judiciaires

    getIframeBody()
      .find('input[id="nombreProcedures"]')
      .click()
      .type(ParcoursData.FO.parcoursAGRICOLE.nbProcedures);

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

    // Assurance protection juridique

    getIframeBody()
      .find('div[id="assuranceDejaSouscrite"]')
      .find('div[class="v-input--selection-controls__input"]')
      .last()
      .click();

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

    // Redressement judiciaire

    getIframeBody()
      .find('div[id="redressementJudiciaire"]')
      .find('div[class="v-input--selection-controls__input"]')
      .last()
      .click();

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "un redressement judiciaire depuis les 36 derniers mois ? est obligatoire"
      )
      .should("not.exist");

    // Nombre véhicules

    getIframeBody()
      .find('input[data-cy="nombreVehicules"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.nbVehicules);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains(
        "Le champ Nombre de véhicules et engins agricoles est obligatoire"
      )
      .should("not.exist");

    // Nombre salariés

    getIframeBody()
      .find('input[data-cy="nombreSalaries"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.nbSalaries);

    getIframeBody().find("button").contains("Étape suivante").click();

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Veuillez valider tous les champs")
      .should("be.visible");

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .contains("Le champ Dont salariés permanents est obligatoire")
      .should("not.exist");

    // Nombre personnes travaillant sur l'exploitation

    getIframeBody()
      .find('input[data-cy="nombreTravailleursExploitation"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.nbPersonnesExploitation);

    // Redacteur devis

    getIframeBody()
      .find('input[id="emisPar"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.emisPar);

    // Champs obligatoires remplis

    getIframeBody()
      .find('div[role="status"]')
      .and("contain", "Le devis a été initialisé")
      .should("be.visible");

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

    // Emettre le devis

    getIframeBody().find("button").contains("Emettre le devis").click();

    cy.wait(5000);

    // Transformer en contrat

    getIframeBody()
      .find(
        'a[class="button-visu v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default primary"]'
      )
      .click();

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
    //         });
    // cy.wait(2000)
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

    // Saisie de la date

    // Date d'effet dans le passé

    getIframeBody()
      .find('input[type="date"]')
      .click()
      .type(ParcoursData.FO.parcoursAGRICOLE.datedEffetPassee);

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
      .type(ParcoursData.FO.parcoursAGRICOLE.datedEffetFuture);

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
      .type(ParcoursData.FO.parcoursAGRICOLE.datedEffetValide);

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
      .and("contain", "Le champ Mail est obligatoire");

    // Saisie du numéro de téléphone en laissant le champ mail vierge

    getIframeBody().find('input[data-cy="telephone1"]').type(1111);

    getIframeBody()
      .find('div[class="v-messages__message"]')
      .and("contain", "Le champ Téléphone 1 est invalide")
      .should("be.visible");

    getIframeBody()
      .find('input[data-cy="telephone1"]')
      .clear()
      .type(ParcoursData.FO.parcoursAGRICOLE.telephone);

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
      .type(ParcoursData.FO.parcoursAGRICOLE.mail);

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
      .type(ParcoursData.FO.parcoursAGRICOLE.telephone);

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
      .type(ParcoursData.FO.parcoursAGRICOLE.prenom);

    getIframeBody()
      .find('input[data-cy="nom"]')
      .type(ParcoursData.FO.parcoursAGRICOLE.nom);

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
      .type(ParcoursData.FO.parcoursAGRICOLE.mail);

    getIframeBody()
      .find('input[data-cy="portable"]')
      .clear()
      .type(ParcoursData.FO.parcoursAGRICOLE.telephone);

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
