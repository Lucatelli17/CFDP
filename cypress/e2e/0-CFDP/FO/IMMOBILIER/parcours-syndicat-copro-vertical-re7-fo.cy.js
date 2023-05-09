import ParcoursData from '../../../../fixtures/dataCFDP.json'

describe('parcours SYNDICAT COPRO VERTICAL RE7 FO', () => {
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


        it('Parcours Syndicat Copro Vertical', () => {
                let numeroDevis = "";
                cy.wait(2000)
                getIframeBody().find('a[href="/souscription/produits/Immobilier"]').click()
                getIframeBody().find('[class="v-card__title"]').contains('Alsina Syndicat de Copropriétaires').click()
                getIframeBody().find('button').contains('Valider').click()
                // Sur Re7 pas sur int
                getIframeBody().find('input[data-cy="select-country"]').click()
                getIframeBody().find('div[role="option"]').contains('France').first().click()
                getIframeBody().find('div[role="combobox"]').first().click()
                getIframeBody().find('div[role="listbox"]').contains('Verticale').click()
                getIframeBody().find('div[role="combobox"]').last().click()
                getIframeBody().find('div[role="listbox"]').contains('Syndic professionnel').click()
                getIframeBody().find('input[id="Surface développée totale (Si copropriété verticale)"]').clear().type(ParcoursData.re7FO.parcoursIMMO.nbMetrescarre)
                cy.wait(1000)
                // CALCULER
                getIframeBody().find('button').contains('Calculer').click()
                getIframeBody().find('button').contains('Sélectionner').first().click()
                cy.wait(3000);

                // ---------------------
                // Devis - Recherche client
                // ---------------------

                // Nouveau prospect
                getIframeBody().find('button').contains('Nouveau prospect').click()

                // ---------------------
                // Devis - Informations complémentaires
                // ---------------------

                // Raison sociale     
                getIframeBody().find('div[title="Raison sociale"]').click().type(ParcoursData.re7FO.parcoursIMMO.raisonSociale)
                // Pays Bénéficiaire
                getIframeBody().find('input[data-cy="pays"]').click();
                getIframeBody()
                        .find('div[role="option"]')
                        .contains("France")
                        .first()
                        .click();
                // Forme juridique
                getIframeBody().find('div[title="Forme juridique"]').type(ParcoursData.re7FO.parcoursIMMO.formeJuridique)
                // Adresse Souscripteur
                getIframeBody().find('div[title="Adresse"]').first().type(ParcoursData.re7FO.parcoursIMMO.adresse1)
                // Ville
                getIframeBody().find('input[id="autoCompletion-ville"]').type(ParcoursData.re7FO.parcoursIMMO.ville)
                // Code Postal
                getIframeBody().find('input[data-cy="codePostal"]').type(ParcoursData.re7FO.parcoursIMMO.codePostal)
                // Sélection Civilité     
                getIframeBody().find('input[data-cy="civilite"]').click();
                getIframeBody()
                        .find('div[role="option"]')
                        .contains("Monsieur")
                        .first()
                        .click();
                // Nom & prénom représentant         
                getIframeBody().find('input[data-cy="nomRepresentant"]').type(ParcoursData.re7FO.parcoursIMMO.nom)
                getIframeBody().find('input[data-cy="prenom"]').type(ParcoursData.re7FO.parcoursIMMO.prenom)
                // En qualité de
                getIframeBody().find('input[data-cy="qualiteProfessionnelle"]').type(ParcoursData.re7FO.parcoursPRO.qualiteProfessionnelle)
                cy.wait(10000)
                // Nom de la copro
                getIframeBody().find('input[data-cy="nom"]').type(ParcoursData.re7FO.parcoursIMMO.nomCopro)
                // Pays Bénéficiaire
                getIframeBody().find('input[data-cy="paysBeneficiaire"]').type('France', { force: true })
                cy.wait(2000)
                getIframeBody()
                        .find('div[role="option"]:visible')
                        .contains("France")
                        .click();

                // getIframeBody()
                //         .find('div[role="option"]')
                //         .contains("France")
                //         .first()
                //         .click({ force: true });
                // Adresse Bénéficiaire
                getIframeBody().find('input[id="adresse1"]').type(ParcoursData.re7FO.parcoursIMMO.adresse1, { force: true })
                // Ville Bénéficiaire
                getIframeBody().find('div[title="Ville"]').last().type(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire)
                cy.wait(1000)
                getIframeBody()
                        .find('div[role="option"]:visible')
                        .contains(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire)
                        .first()
                        .click();
                // Code Postal Bénéficiaire
                // getIframeBody().find('input[data-cy="codePostalBeneficaire"]').type(ParcoursData.re7FO.parcoursIMMO.codePostal)
                // // Nb véhicules
                // getIframeBody().find('input[id="nombreVehicules"]').type(ParcoursData.re7FO.parcoursIMMO.nbVehicules)
                // // Nb résidences secondaires
                // getIframeBody().find('input[id="nombreResidencesSecondaires"]').type(ParcoursData.re7FO.parcoursIMMO.nbVehiculesSecondaires)
                //procédures judiciaires
                getIframeBody().find('input[id="nombreProcedures"]').click().type(ParcoursData.re7FO.parcoursIMMO.nbProcedures)
                // Assurance protection juridique
                getIframeBody().find('div[id="assuranceDejaSouscrite"]').find('[class="v-input--selection-controls__ripple"]').last().click()
                // Redacteur devis
                getIframeBody().find('input[id="emisPar"]').type(ParcoursData.re7FO.parcoursIMMO.emisPar)
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
                getIframeBody().wait(5000)
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
                getIframeBody().find('input[data-cy="input-siret"]').type(ParcoursData.re7FO.parcoursIMMO.siret)
                getIframeBody().find('input[data-cy="telephone1"]').type(ParcoursData.re7FO.parcoursIMMO.telephone)
                getIframeBody().find('input[data-cy="mail"]').type(ParcoursData.re7FO.parcoursIMMO.mail)
                // getIframeBody().find('input[data-cy="lieuNaissance"]').type(ParcoursData.re7FO.parcoursIMMO.lieuNaissance)
                // getIframeBody().find('input[type=date]').last().click().type(ParcoursData.re7FO.parcoursIMMO.dateNaissance)
                getIframeBody().find('button').contains('Étape suivante').click()
                cy.wait(2000)
                getIframeBody().find('input[data-cy="fractionnement"]').click().type(ParcoursData.re7FO.parcoursIMMO.fractionnement, { force: true }).type('{enter}', { force: true })
                getIframeBody().find('input[data-cy="moyenDePaiement"]').click().type(ParcoursData.re7FO.parcoursIMMO.moyenPaiement, { force: true }).type('{enter}', { force: true })
                getIframeBody().find('button').contains('Enregistrer').click()
                cy.wait(10000)
                getIframeBody().find('button').contains('Signer électroniquement').click()
                getIframeBody().find('input[data-cy="prenom"]').type(ParcoursData.re7FO.parcoursIMMO.prenom)
                getIframeBody().find('input[data-cy="nom"]').type(ParcoursData.re7FO.parcoursIMMO.nom)
                getIframeBody().find('input[data-cy="mail"]').type(ParcoursData.re7FO.parcoursIMMO.mail)
                getIframeBody().find('input[data-cy="portable"]').type(ParcoursData.re7FO.parcoursIMMO.telephone)
                cy.wait(2000)
                getIframeBody().find('h1[class="title-helios"]').parent().find('button').contains('Valider').click()
                cy.wait(25000)

        })


})