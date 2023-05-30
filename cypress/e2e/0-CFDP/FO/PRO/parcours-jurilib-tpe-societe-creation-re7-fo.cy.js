import ParcoursData from '../../../../fixtures/dataCFDP.json'

describe('parcours JURILIB TPE SOCIETE EN CREATION FO', () => {
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


        it('Parcours Jurilib TPE Societe en creation', () => {
                let numeroDevis = "";
                getIframeBody().find('a[href="/souscription/produits/Professionnel"]')
                        .click()
                getIframeBody().find('[class="v-card__title"]')
                        .contains('Jurilib TPE')
                        .click()
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                getIframeBody().find('input[data-cy="select-country"]')
                        .click()
                getIframeBody().find('[id="list-item-183-1"]')
                        .click()
                getIframeBody().find('div[class="v-input--selection-controls__input"]')
                        .click()
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                // Code NAF
                getIframeBody().find('input[data-cy="42"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.codeNAF)
                getIframeBody().find('[role="listbox"]')
                        .contains(ParcoursData.re7FO.parcoursJURILIBPRO.codeNAF)
                        .click()
                //Nombre de salariés
                getIframeBody().find('[id="Nombre de salariés"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nbSalaries)
                //Nombre de véhicules terrestres à moteur
                getIframeBody().find('[id="Nombre de véhicules terrestres à moteur"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nbVTM)
                // Chiffres d'affaires => ^ = commence par ...
                getIframeBody().find('[id^="Chiffre"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.CA)
                // CALCULER
                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()

                // Sélection formule
                getIframeBody().find('button')
                        .contains('Sélectionner')
                        .first()
                        .click()

                // // Récupération du numéro de devis
                // getIframeBody()
                //         .find("#app")
                //         .contains("Numéro de devis")
                //         .contains("HD")
                //         .then((numDevis) => {
                //                 numeroDevis = numDevis.text();
                //                 cy.wrap(numeroDevis).as("numeroDevis");
                //         });

                // Raison sociale
                getIframeBody().find('input[data-cy="raisonSociale"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.qualiteProfessionnelle)

                // Forme juridique
                getIframeBody().find('input[data-cy="formeJuridique"]')
                        .click()
                getIframeBody().find('div[class="v-list-item__title"]')
                        .contains(ParcoursData.re7FO.parcoursJURILIBPRO.formeJuridique)
                        .click()

                // Adresse
                getIframeBody().find('input[id="autoCompletion-addresse"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.adresse1)

                // Ville 
                getIframeBody().find('input[id="autoCompletion-ville"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.ville)

                // Code postal
                getIframeBody().find('input[data-cy="codePostal"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.codePostal)

                // En qualité de
                getIframeBody().find('input[data-cy="qualiteProfessionnelle"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.qualiteProfessionnelle)
                cy.wait(3000)
                // Sélection Civilité      
                getIframeBody().find('[class="col col-4"]')
                        .find('[role="button"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.civilite)
                // Nom & prénom représentant         
                getIframeBody().find('[id="nomRepresentant"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nom)
                getIframeBody().find('[id="prenom"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.prenom)

                //procédures judiciaires
                getIframeBody().find('[id="nombreProcedures"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nbProcedures)
                // Activité précise
                getIframeBody().find('input[data-cy="activite"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.activite)
                // Bouton radio locaux exploitation activité
                getIframeBody().find('div[id="locauxSciAvecPartsSouscripteur"]')
                        .find('[class="v-input--selection-controls__ripple"]')
                        .last()
                        .click()
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
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.emisPar)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                cy.wait(5000)

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
                //         .click();
                // getIframeBody()
                //         .find('div[class="v-list-item__title"]')
                //         .contains("Transformer en contrat")
                //         .click();

                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                getIframeBody().find('input[data-cy="input-siret"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.siret)
                getIframeBody().find('input[data-cy="telephone1"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.telephone)
                getIframeBody().find('input[data-cy="mail"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.mail)
                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()
                getIframeBody().find('input[data-cy="fractionnement"]')
                        .click()
                getIframeBody().find('div[class="v-list-item__title"]')
                        .contains(ParcoursData.re7FO.parcoursENTREPRISE.fractionnement)
                        .click()
                getIframeBody().find('input[data-cy="moyenDePaiement"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.moyenPaiement, { force: true })
                        .type('{enter}', { force: true })
                getIframeBody().find('button')
                        .contains('Enregistrer')
                        .click()
                cy.wait(25000)

                // ---------------------
                // Envoi signature électronique
                // ---------------------

                getIframeBody().find('button')
                        .contains('Signer électroniquement')
                        .click()
                getIframeBody().find('input[data-cy="prenom"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.prenom)
                getIframeBody().find('input[data-cy="nom"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nom)
                getIframeBody().find('input[data-cy="mail"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.mail)
                getIframeBody().find('input[data-cy="portable"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.telephone)
                getIframeBody().find('h1[class="title-helios"]')
                        .parent()
                        .find('button')
                        .contains('Valider')
                        .click()
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Circuit de signature électronique correctement lancé')


        })


})