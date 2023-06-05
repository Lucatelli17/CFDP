import ParcoursData from '../../../../fixtures/dataCFDP.json'
import { faker } from '@faker-js/faker';



describe('parcours AGRICOLE RE7 FO', () => {
        beforeEach(() => {
                cy.visit(ParcoursData.re7FO.login.URLsouscription)
                cy.get('input[id="username"]')
                        .type(ParcoursData.re7FO.login.username)
                cy.get('input[id="password"]')
                        .type(ParcoursData.re7FO.login.password)
                cy.get('button[id="signin"]')
                        .click()
                cy.url().should('eq', 'https://espacepartenaire.re7.cfdp.fr/souscription')
        })

        const getIframeDocument = () => {
                return cy
                        .get('iframe[data-cy="iframe-souscription"]')
                        // Cypress yields jQuery element, which has the real
                        // DOM element under property "0".
                        // From the real DOM iframe element we can get
                        // the "document" element, it is stored in "contentDocument" property
                        // Cypress "its" command can access deep properties using dot notation
                        // https://on.cypress.io/its
                        .its('0.contentDocument').should('exist')
        }

        const getIframeBody = () => {
                // get the document
                return getIframeDocument()
                        // automatically retries until body is loaded
                        .its('body').should('not.be.undefined')
                        // wraps "body" DOM element to allow
                        // chaining more Cypress commands, like ".find(...)"
                        .then(cy.wrap)
        }


        it('Agricole', () => {
                let numeroDevis = "";

                // ---------------------
                // Sélection prospect + produit
                // ---------------------

                getIframeBody().find('a[href="/souscription/produits/Agricole"]')
                        .click()

                getIframeBody().find('[class="v-card__title"]')
                        .contains('Alsina Agricole')
                        .click()

                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                // ---------------------
                // Devis - Informations tarifantes
                // ---------------------

                // Sélection pays

                getIframeBody().find('input[data-cy="select-country"]')
                        .click()

                getIframeBody().find('div[role="option"]')
                        .contains('France')
                        .first()
                        .click()

                // Activité avec commercialisation directe

                getIframeBody().find('input[id="Activité avec commercialisation directe"]')
                        .click()

                getIframeBody().find('div[role="listbox"]')
                        .contains('Non')
                        .click()

                // Activité accessoire de diversification agricole

                getIframeBody().find('input[data-cy="8"]')
                        .click()

                getIframeBody().find('div[role="option"]:visible')
                        .first()
                        .click()

                // Activité principale

                getIframeBody().find('input[id="Activité principale"]')
                        .click()

                getIframeBody().find('div[role="listbox"]')
                        .contains('Elevage')
                        .click()

                // Chiffre d'affaires

                getIframeBody().find('input[data-cy="10"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.CA)

                // Forme juridique de l'exploitation

                getIframeBody().find('input[data-cy="39"]')
                        .click()

                getIframeBody().find('div[role="listbox"]')
                        .contains(ParcoursData.re7FO.parcoursAGRICOLE.formeJuridique)
                        .click()

                // Surface d'exploitation (Ha)

                getIframeBody().find('input[data-cy="11"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.surfaceExploitation)

                // CALCULER

                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()

                getIframeBody().find('button')
                        .contains('Sélectionner')
                        .first()
                        .click()

                // ---------------------
                // Devis - Informations complémentaires
                // ---------------------

                // Raison sociale  

                getIframeBody().find('input[data-cy="raisonSociale"]')
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.raisonSociale)

                // Pays Souscripteur

                getIframeBody().find('input[data-cy="pays"]')
                        .click();

                getIframeBody()
                        .find('div[role="option"]')
                        .contains("France")
                        .first()
                        .click();

                // Adresse Souscripteur

                getIframeBody().find('div[title="Adresse"]')
                        .first()
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.adresse1)

                // Ville

                getIframeBody().find('input[id="autoCompletion-ville"]')
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.ville)

                // Code Postal

                getIframeBody().find('input[data-cy="codePostal"]')
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.codePostal)

                // Sélection Civilité  

                getIframeBody().find('input[data-cy="civilite"]')
                        .click();

                getIframeBody()
                        .find('div[role="option"]')
                        .contains("Monsieur")
                        .first()
                        .click();

                // Nom & prénom représentant   

                getIframeBody().find('input[data-cy="nomRepresentant"]')
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.nom)

                getIframeBody().find('input[data-cy="prenom"]')
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.prenom)

                // getIframeBody().find('input[data-cy="nomRepresentant"]')
                //         .type(faker.name.lastName())
                // getIframeBody().find('input[data-cy="prenom"]')
                //         .type(faker.name.firstName())

                // En qualité de

                getIframeBody().find('input[data-cy="qualiteProfessionnelle"]')
                        .type(ParcoursData.re7FO.parcoursPRO.qualiteProfessionnelle)

                //procédures judiciaires

                getIframeBody().find('input[id="nombreProcedures"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.nbProcedures)

                // Assurance protection juridique

                getIframeBody().find('div[id="assuranceDejaSouscrite"]')
                        .find('[class="v-input--selection-controls__ripple"]')
                        .last()
                        .click()

                // Redressement judiciaire 

                getIframeBody().find('div[id="redressementJudiciaire"]')
                        .find('[class="v-input--selection-controls__ripple"]')
                        .last()
                        .click()

                // Redacteur devis

                getIframeBody().find('input[id="emisPar"]')
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.emisPar)

                // Récupération du numéro de devis
                // getIframeBody()
                //         .find("#app")
                //         .contains("Numéro de devis")
                //         .contains("HD")
                //         .then((numDevis) => {
                //                 numeroDevis = numDevis.text();
                //                 cy.wrap(numeroDevis).as("numeroDevis");
                //         });

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

                // Emettre le devis
                getIframeBody().find('button')
                        .contains('Emettre le devis')
                        .click()

                cy.wait(5000)

                // Transformer en contrat 

                getIframeBody().contains('Transformer en contrat')
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

                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                getIframeBody().find('input[data-cy="telephone1"]')
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.telephone)

                getIframeBody().find('input[data-cy="mail"]')
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.mail)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                // ---------------------
                // Informations de paiement
                // ---------------------

                getIframeBody().find('input[data-cy="fractionnement"]')
                        .click()

                getIframeBody().find('div[class="v-list-item__title"]')
                        .contains(ParcoursData.re7FO.parcoursAGRICOLE.fractionnement)
                        .click()

                getIframeBody().find('input[data-cy="moyenDePaiement"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.moyenPaiement, { force: true })
                        .type('{enter}', { force: true })

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
                        .type(faker.name.firstName())

                getIframeBody().find('input[data-cy="nom"]')
                        .type(faker.name.lastName())

                getIframeBody().find('input[data-cy="mail"]')
                        .type(faker.internet.email())

                getIframeBody().find('input[data-cy="portable"]')
                        .type(ParcoursData.re7FO.parcoursAGRICOLE.telephone)

                getIframeBody().find('h1[class="title-helios"]')
                        .parent()
                        .find('button')
                        .contains('Valider')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Circuit de signature électronique correctement lancé')
                        .should('be.visible')


        })


})