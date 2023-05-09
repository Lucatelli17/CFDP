import ParcoursData from '../../../../fixtures/dataCFDP.json'

describe('parcours PARTICULIER RE7 FO', () => {
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


        it('Parcours Particulier', () => {
                let numeroDevis = "";

                // ---------------------
                // Sélection prospect & produit
                // ---------------------
                getIframeBody().wait(4000)
                getIframeBody().find('a[href="/souscription/produits/Particulier"]').click()
                getIframeBody().find('[class="v-card__title"]').contains('Alsina Particulier').click()
                getIframeBody().find('button').contains('Valider').click()

                // ---------------------
                // Devis - Informations tarifantes
                // ---------------------

                getIframeBody().find('input[data-cy="select-country"]').click()
                getIframeBody().find('div[role="option"]').contains('France').first().click()
                cy.wait(1000)
                // CALCULER
                getIframeBody().find('button').contains('Calculer').click()
                getIframeBody().find('button').contains('Sélectionner').first().click()
                cy.wait(3000);
                // Sélection Civilité     
                getIframeBody().find('input[data-cy="civilite"]').click()
                getIframeBody().contains('Madame, Monsieur').click()
                // Nom & prénom représentant         
                getIframeBody().find('input[id="nom"]').type(ParcoursData.re7FO.parcoursPARTICULIER.nom)
                getIframeBody().find('input[id="prenom"]').type(ParcoursData.re7FO.parcoursPARTICULIER.prenom)
                // Adresse
                getIframeBody().find('input[id="adresse1"]').type(ParcoursData.re7FO.parcoursPARTICULIER.adresse1)
                getIframeBody().wait(1500)
                getIframeBody().find('#adresse1').type(' ').click()
                getIframeBody().wait(2000)
                getIframeBody().find('div[class="v-menu__content theme--light menuable__content__active v-autocomplete__content"]').find('div[role="option"]').first().click({ force: true })
                getIframeBody().wait(1000)
                //procédures judiciaires
                getIframeBody().find('input[id="nombreProcedures"]').click().type(ParcoursData.re7FO.parcoursPARTICULIER.nbProcedures)
                // Assurance protection juridique
                getIframeBody().find('div[id="assuranceDejaSouscrite"]').find('[class="v-input--selection-controls__ripple"]').last().click()
                // Redacteur devis
                getIframeBody().find('input[id="emisPar"]').type(ParcoursData.re7FO.parcoursPARTICULIER.emisPar)
                getIframeBody().wait(5000)
                // Récupération du numéro de devis
                getIframeBody()
                        .find("#app")
                        .contains("Numéro de devis")
                        .contains("HD")
                        .then((numDevis) => {
                                numeroDevis = numDevis.text();
                                cy.wrap(numeroDevis).as("numeroDevis");
                        });
                cy.wait(1000)
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
                cy.wait(4000);
                getIframeBody()
                        .get("@numeroDevis")
                        .then((numeroDevis) => {
                                getIframeBody().wait(5000)
                                getIframeBody().find('input[id="input-26"]').click().type(numeroDevis);
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
                getIframeBody().find('button[data-cy="listActions"]').first().click();
                getIframeBody()
                        .find('div[class="v-list-item__title"]')
                        .contains("Transformer en contrat")
                        .click();
                cy.wait(2000);




                getIframeBody().find('button').contains('Valider').click()
                cy.wait(2000)

                // ---------------------
                // Devis - Informations complémentaires
                // ---------------------

                getIframeBody().find('input[data-cy="telephone1"]').type(ParcoursData.re7FO.parcoursPARTICULIER.telephone)
                getIframeBody().find('input[data-cy="mail"]').type(ParcoursData.re7FO.parcoursPARTICULIER.mail)
                getIframeBody().find('input[data-cy="lieuNaissance"]').type(ParcoursData.re7FO.parcoursPARTICULIER.lieuNaissance)
                getIframeBody().find('input[type=date]').last().click().type(ParcoursData.re7FO.parcoursPARTICULIER.dateNaissance)
                getIframeBody().find('button').contains('Étape suivante').click()
                getIframeBody().wait(3000)
                getIframeBody().find('input[data-cy="fractionnement"]').click().type(ParcoursData.re7FO.parcoursPARTICULIER.fractionnement, { force: true }).type('{enter}', { force: true })
                getIframeBody().find('input[data-cy="moyenDePaiement"]').click().type(ParcoursData.re7FO.parcoursPARTICULIER.moyenPaiement, { force: true }).type('{enter}', { force: true })
                getIframeBody().find('button').contains('Enregistrer').click()

                // ---------------------
                // Envoi de la signature électronique
                // ---------------------

                getIframeBody().find('button').contains('Signer électroniquement').click()
                getIframeBody().find('input[data-cy="prenom"]').type(ParcoursData.re7FO.parcoursPARTICULIER.prenom)
                getIframeBody().find('input[data-cy="nom"]').type(ParcoursData.re7FO.parcoursPARTICULIER.nom)
                getIframeBody().find('input[data-cy="mail"]').type(ParcoursData.re7FO.parcoursPARTICULIER.mail)
                getIframeBody().find('input[data-cy="portable"]').type(ParcoursData.re7FO.parcoursPARTICULIER.telephone)
                cy.wait(2000)
                getIframeBody().find('h1[class="title-helios"]').parent().find('button').contains('Valider').click()
                cy.wait(25000)

        })


})