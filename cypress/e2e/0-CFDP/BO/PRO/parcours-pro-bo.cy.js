import ParcoursData from '../fixtures/dataCFDP.json'

describe('parcours PRO BO', () => {
        beforeEach(() => {
                cy.visit(ParcoursData.intBO.login.URL)
                cy.url().should('eq', 'https://espacepartenaire.int.cfdp.fr/gestion/login')
                cy.get('input[name="_username"]').type(ParcoursData.intBO.login.username)
                cy.get('input[name="_password"]').type(ParcoursData.intBO.login.password)
                cy.get('button[name="_submit"]').click()
                cy.wait(4000)
                cy.url().should('eq', ParcoursData.intBO.login.URLcreerDevis)
                getIframeBody().find('input').first().type(ParcoursData.intBO.login.courtier, { force: true })
                getIframeBody().find('button').contains('Sélectionner').click()
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


        it('Parcours Pro', () => {
                cy.wait(3000)
                let numeroDevis = "";
                getIframeBody().find('a[href="/souscription/produits/Professionnel"]').click()
                getIframeBody().find('[class="v-card__title"]').contains('Alsina Professionnel').click()
                getIframeBody().find('button').contains('Valider').click()
                getIframeBody().find('input[data-cy="select-country"]').click()
                getIframeBody().find('[id="list-item-183-1"]').click()
                getIframeBody().contains('Retrouver toutes les informations légales par nom').parent().find('[class="v-select__selections"]').type(ParcoursData.intBO.parcoursPRO.nomEntreprise)
                cy.wait(1000)
                getIframeBody().find('[role="listbox"]').contains('50203544700031').click()
                getIframeBody().find('button').contains('Valider').click()
                // Devis réalisé 
                cy.wait(3000)
                // Code NAF
                getIframeBody().find('input[data-cy="42"]').click().type(ParcoursData.intBO.parcoursPRO.codeNAF)
                getIframeBody().find('[role="listbox"]').contains('20.51Z').click()
                //Nombre de salariés
                getIframeBody().find('[id="Nombre de salariés"]').clear().type(ParcoursData.intBO.parcoursPRO.nbSalaries)
                //Nombre de véhicules terrestres à moteur
                getIframeBody().find('[id="Nombre de véhicules terrestres à moteur"]').clear().type(ParcoursData.intBO.parcoursPRO.nbVTM)
                // Chiffres d'affaires => ^ = commence par ...
                getIframeBody().find('[id^="Chiffre"]').clear().type(ParcoursData.intBO.parcoursPRO.CA)
                // CALCULER
                getIframeBody().find('button').contains('Calculer').click()
                getIframeBody().find('button').contains('Sélectionner').first().click()
                cy.wait(5000);
                // Récupération du numéro de devis
                getIframeBody()
                        .find("#app")
                        .contains("Numéro de devis")
                        .contains("HD")
                        .then((numDevis) => {
                                numeroDevis = numDevis.text();
                                cy.wrap(numeroDevis).as("numeroDevis");
                        });
                cy.wait(5000)
                // Sélection Civilité      
                getIframeBody().find('[class="col col-4"]').find('[role="button"]').type(ParcoursData.intBO.parcoursPRO.civilite)
                // Nom & prénom représentant         
                getIframeBody().find('[id="nomRepresentant"]').type(ParcoursData.intBO.parcoursPRO.nom)
                getIframeBody().find('[id="prenom"]').type(ParcoursData.intBO.parcoursPRO.prenom)
                // En qualité de
                getIframeBody().find('input[data-cy="qualiteProfessionnelle"]').type(ParcoursData.intBO.parcoursPRO.qualiteProfessionnelle)
                //procédures judiciaires
                getIframeBody().find('[id="nombreProcedures"]').click().type(ParcoursData.intBO.parcoursPRO.nbProcedures)
                // Activité précise
                getIframeBody().find('input[data-cy="activite"]').type(ParcoursData.intBO.parcoursPRO.activite)
                // Bouton radio locaux exploitation activité
                getIframeBody().find('div[id="locauxSciAvecPartsSouscripteur"]').find('[class="v-input--selection-controls__ripple"]').last().click()
                // Assurance protection juridique
                getIframeBody().find('div[id="assuranceDejaSouscrite"]').find('[class="v-input--selection-controls__ripple"]').last().click()
                // Redressement judiciaire
                getIframeBody().find('div[id="redressementJudiciaire"]').find('[class="v-input--selection-controls__ripple"]').last().click()
                // Redacteur devis
                getIframeBody().find('input[id="emisPar"]').type(ParcoursData.intBO.parcoursPRO.emisPar)
                getIframeBody().find('button').contains('Étape suivante').click()
                cy.wait(5000)
                // Emettre le devis
                getIframeBody().find('button').contains('Emettre le devis').click()
                cy.wait(10000)
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
                        'a[href="https://espacepartenaire.int.cfdp.fr/souscription/devis-etablis"]'
                ).click();
                cy.wait(4000);
                getIframeBody()
                        .get("@numeroDevis")
                        .then((numeroDevis) => {
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
                getIframeBody().find('button[data-cy="listActions"]').click();
                getIframeBody()
                        .find('div[class="v-list-item__title"]')
                        .contains("Transformer en contrat")
                        .click();
                cy.wait(2000);



                getIframeBody().find('button').contains('Valider').click()
                cy.wait(2000)
                getIframeBody().find('input[data-cy="telephone1"]').type(ParcoursData.intBO.parcoursPRO.telephone)
                getIframeBody().find('input[data-cy="mail"]').type(ParcoursData.intBO.parcoursPRO.mail)
                getIframeBody().find('button').contains('Étape suivante').click()
                cy.wait(2000)
                getIframeBody().find('input[data-cy="fractionnement"]').click().type(ParcoursData.intBO.parcoursPRO.fractionnement, { force: true }).type('{enter}', { force: true })
                getIframeBody().find('input[data-cy="moyenDePaiement"]').click().type(ParcoursData.intBO.parcoursPRO.moyenPaiement, { force: true }).type('{enter}', { force: true })
                getIframeBody().find('button').contains('Enregistrer').click()
                cy.wait(2000)
                getIframeBody().find('button').contains('Signer électroniquement').click()
                getIframeBody().find('input[data-cy="prenom"]').type(ParcoursData.intBO.parcoursPRO.prenom)
                getIframeBody().find('input[data-cy="nom"]').type(ParcoursData.intBO.parcoursPRO.nom)
                getIframeBody().find('input[data-cy="mail"]').type(ParcoursData.intBO.parcoursPRO.mail)
                getIframeBody().find('input[data-cy="portable"]').type(ParcoursData.intBO.parcoursPRO.telephone)
                cy.wait(2000)
                getIframeBody().find('h1[class="title-helios"]').parent().find('button').contains('Valider').click()
                cy.wait(25000)

        })


})