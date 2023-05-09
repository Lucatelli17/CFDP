import ParcoursData from '../../../../fixtures/dataCFDP.json'

describe('parcours AGRICOLE RE7 FO', () => {
        beforeEach(() => {
                cy.visit(ParcoursData.re7FO.login.URLsouscription)
                cy.get('input[id="username"]').type(ParcoursData.re7FO.login.username)
                cy.get('input[id="password"]').type(ParcoursData.re7FO.login.password)
                cy.get('button[id="signin"]').click()
                cy.wait(4000)
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
                getIframeBody().wait(3000)
                getIframeBody().find('a[href="/souscription/produits/Agricole"]').click()
                getIframeBody().find('[class="v-card__title"]').contains('Alsina Agricole').click()
                getIframeBody().find('button').contains('Valider').click()

                // ---------------------
                // Devis - Informations tarifantes
                // ---------------------

                // Sélection pays
                getIframeBody().find('input[data-cy="select-country"]').click()
                getIframeBody().find('div[role="option"]').contains('France').first().click()

                // Activité avec commercialisation directe
                getIframeBody().find('input[id="Activité avec commercialisation directe"]').click()
                getIframeBody().find('div[role="listbox"]').contains('Non').click()

                // Activité accessoire de diversification agricole
                getIframeBody().find('input[data-cy="8"]').click()
                getIframeBody().find('div[role="option"]:visible').first().click()

                // Activité principale
                getIframeBody().find('input[id="Activité principale"]').click()
                getIframeBody().find('div[role="listbox"]').contains('Elevage').click()

                // Chiffre d'affaires
                getIframeBody().find('input[data-cy="10"]').clear().type(ParcoursData.re7FO.parcoursAGRICOLE.CA)

                // Forme juridique de l'exploitation
                getIframeBody().find('input[data-cy="39"]').click()
                getIframeBody().find('div[role="listbox"]').contains('EARL - Exploitation Agricole à Responsabilité Limitée').click()

                // Surface d'exploitation (Ha)
                getIframeBody().find('input[data-cy="11"]').clear().type(ParcoursData.re7FO.parcoursAGRICOLE.surfaceExploitation)

                cy.wait(1000)
                // CALCULER
                getIframeBody().find('button').contains('Calculer').click()
                getIframeBody().find('button').contains('Sélectionner').first().click()
                cy.wait(4000);

                // ---------------------
                // Devis - Informations complémentaires
                // ---------------------

                // Raison sociale     
                getIframeBody().find('input[data-cy="raisonSociale"]').type(ParcoursData.re7FO.parcoursAGRICOLE.raisonSociale)

                // Pays Souscripteur
                getIframeBody().find('input[data-cy="pays"]').click();
                getIframeBody()
                        .find('div[role="option"]')
                        .contains("France")
                        .first()
                        .click();

                // Adresse Souscripteur
                getIframeBody().find('div[title="Adresse"]').first().type(ParcoursData.re7FO.parcoursAGRICOLE.adresse1)

                // Ville
                getIframeBody().find('input[id="autoCompletion-ville"]').type(ParcoursData.re7FO.parcoursAGRICOLE.ville)

                // Code Postal
                getIframeBody().find('input[data-cy="codePostal"]').type(ParcoursData.re7FO.parcoursAGRICOLE.codePostal)

                // Sélection Civilité     
                getIframeBody().find('input[data-cy="civilite"]').click();
                getIframeBody()
                        .find('div[role="option"]')
                        .contains("Monsieur")
                        .first()
                        .click();

                // Nom & prénom représentant         
                getIframeBody().find('input[data-cy="nomRepresentant"]').type(ParcoursData.re7FO.parcoursAGRICOLE.nom)
                getIframeBody().find('input[data-cy="prenom"]').type(ParcoursData.re7FO.parcoursAGRICOLE.prenom)

                // En qualité de
                getIframeBody().find('input[data-cy="qualiteProfessionnelle"]').type(ParcoursData.re7FO.parcoursPRO.qualiteProfessionnelle)
                cy.wait(8000)

                //procédures judiciaires
                getIframeBody().find('input[id="nombreProcedures"]').click().type(ParcoursData.re7FO.parcoursAGRICOLE.nbProcedures)

                // Assurance protection juridique
                getIframeBody().find('div[id="assuranceDejaSouscrite"]').find('[class="v-input--selection-controls__ripple"]').last().click()

                // Redressement judiciaire 
                getIframeBody().find('div[id="redressementJudiciaire"]').find('[class="v-input--selection-controls__ripple"]').last().click()

                // Redacteur devis
                getIframeBody().find('input[id="emisPar"]').type(ParcoursData.re7FO.parcoursAGRICOLE.emisPar)

                // Récupération du numéro de devis
                getIframeBody()
                        .find("#app")
                        .contains("Numéro de devis")
                        .contains("HD")
                        .then((numDevis) => {
                                numeroDevis = numDevis.text();
                                cy.wrap(numeroDevis).as("numeroDevis");
                        });
                cy.wait(2000)

                // Emettre le devis
                getIframeBody().find('button').contains('Étape suivante').click()
                cy.wait(7000)
                getIframeBody().find('button').contains('Emettre le devis').click()
                cy.wait(2000)

                // Vérifier que les documents sont présents
                // getIframeBody().contains('Téléchargement').parent().then(($DL) => {
                //         if ($DL.find('button').contains('Rafraîchir')) {
                //                 getIframeBody().find('button').contains('Rafraîchir').click()
                //                 cy.wait(10000)
                //                 getIframeBody().find('[class="sticky top-10"]').should('contain.text', 'CONTRAT')
                //                 getIframeBody().find('[class="sticky top-10"]').should('contain.text', 'IPID')
                //         } else {
                //                 getIframeBody().find('[class="sticky top-10"]').should('contain.text', 'CONTRAT')
                //                 getIframeBody().find('[class="sticky top-10"]').should('contain.text', 'IPID')
                //         }
                // })

                // Checker que le devis existe dans la liste des devis
                cy.get('a[id="dropdown-subscribe"]').click();
                cy.get(
                        'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
                ).click();
                getIframeBody().wait(10000);
                getIframeBody()
                        .get("@numeroDevis")
                        .then((numeroDevis) => {
                                getIframeBody().wait(4000).find('input[id="input-26"]').click().type(numeroDevis);
                        });
                getIframeBody()
                        .find("button")
                        .contains("Rechercher")
                        .click({ force: true });
                cy.wait(2000);
                getIframeBody()
                        .find('[class="devis-list__container"]')
                        .should("contain.text", numeroDevis);

                // Cliquer sur la liste des actions du devis emis
                getIframeBody().find('button[data-cy="listActions"]').click();
                getIframeBody()
                        .find('div[class="v-list-item__title"]')
                        .contains("Transformer en contrat")
                        .click();
                cy.wait(2000);

                getIframeBody().find('button').contains('Valider').click()
                cy.wait(2000)
                getIframeBody().find('input[data-cy="telephone1"]').type(ParcoursData.re7FO.parcoursAGRICOLE.telephone)
                getIframeBody().find('input[data-cy="mail"]').type(ParcoursData.re7FO.parcoursAGRICOLE.mail)
                getIframeBody().find('button').contains('Étape suivante').click()
                cy.wait(3000)
                getIframeBody().find('input[data-cy="fractionnement"]').click().type(ParcoursData.re7FO.parcoursAGRICOLE.fractionnement, { force: true }).type('{enter}', { force: true })
                getIframeBody().find('input[data-cy="moyenDePaiement"]').click().type(ParcoursData.re7FO.parcoursAGRICOLE.moyenPaiement, { force: true }).type('{enter}', { force: true })
                getIframeBody().find('button').contains('Enregistrer').click()
                getIframeBody().wait(10000)

                // ---------------------
                // Envoi de la signature électronique
                // ---------------------

                getIframeBody().find('button').contains('Signer électroniquement').click()
                getIframeBody().find('input[data-cy="prenom"]').type(ParcoursData.re7FO.parcoursAGRICOLE.prenom)
                getIframeBody().find('input[data-cy="nom"]').type(ParcoursData.re7FO.parcoursAGRICOLE.nom)
                getIframeBody().find('input[data-cy="mail"]').type(ParcoursData.re7FO.parcoursAGRICOLE.mail)
                getIframeBody().find('input[data-cy="portable"]').type(ParcoursData.re7FO.parcoursAGRICOLE.telephone)
                cy.wait(2000)
                getIframeBody().find('h1[class="title-helios"]').parent().find('button').contains('Valider').click()
                cy.wait(2000)

        })


})