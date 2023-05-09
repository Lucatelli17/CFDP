import ParcoursData from '../../../../fixtures/dataCFDP.json'

describe('parcours ASSO SYNDICALE RE7 FO', () => {
        beforeEach(() => {
                cy.visit(ParcoursData.re7FO.login.URLsouscription)
                cy.get('input[id="username"]').type(ParcoursData.re7FO.login.username)
                cy.get('input[id="password"]').type(ParcoursData.re7FO.login.password)
                cy.get('button[id="signin"]').click()
                cy.wait(5000)
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


        it('Parcours Asso Syndicale', () => {
                let numeroDevis = "";
                cy.wait(2000)
                getIframeBody().find('a[href="/souscription/produits/Immobilier"]').click()
                getIframeBody().find('[class="v-card__title"]').contains('Alsina Association Syndicale Libre').click()
                getIframeBody().find('button').contains('Valider').click()
                // Sur Re7 pas sur int

                // ---------------------
                // Devis - Informations Tarifantes
                // ---------------------

                // Sélection Pays
                getIframeBody().find('input[data-cy="select-country"]').click()
                getIframeBody().find('div[role="option"]').contains('France').first().click()

                // Nombre de villas individuelles
                getIframeBody().find('input[id="Nombre de villas individuelles"]').clear().type(ParcoursData.re7FO.parcoursIMMO.nbVillas)

                // Type de gestion ASL
                getIframeBody().find('input[id="Type de gestion ASL"]').click()
                getIframeBody().find('div[role="option"]').contains(ParcoursData.re7FO.parcoursIMMO.typeASL).click()

                // Nb salariés
                getIframeBody().find('input[id="Nombre de salariés"]').clear().type(ParcoursData.re7FO.parcoursIMMO.nbSalaries)
                // getIframeBody().find('div[role="combobox"]').first().click()
                // getIframeBody().find('div[role="listbox"]').contains('Horizontale').click()
                // getIframeBody().find('div[role="combobox"]').last().click()
                // getIframeBody().find('div[role="listbox"]').contains('Syndic bénévole ou coopératif').click()
                // getIframeBody().find('div[title="Nombre de lots (Si copropriété horizontale)"]').clear().type(ParcoursData.re7FO.parcoursIMMO.nbLots)
                cy.wait(1000)

                // CALCULER
                getIframeBody().find('button').contains('Calculer').click()
                getIframeBody().find('button').contains('Sélectionner').first().click()
                cy.wait(3000);

                // ---------------------
                // Devis - Informations complémentaires
                // ---------------------

                // Nom du syndic en exercice ou du président de l'ASL raisonSociale
                getIframeBody().find('input[data-cy="raisonSociale"]').type(ParcoursData.re7FO.parcoursIMMO.presidentASL)

                // Pays Souscripteur
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

                // Ville Souscripteur
                getIframeBody().find('input[id="autoCompletion-ville"]').type(ParcoursData.re7FO.parcoursIMMO.ville)

                // Code Postal souscripteur
                getIframeBody().find('input[data-cy="codePostal"]').type(ParcoursData.re7FO.parcoursIMMO.codePostal)

                // Sélection Civilité représentant   
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

                // Nom de l'ASL
                getIframeBody().find('input[data-cy="nom"]').type(ParcoursData.re7FO.parcoursIMMO.nomASL)

                // Pays Bénéficiaire
                getIframeBody().find('input[data-cy="paysBeneficiaire"]').type('France', { force: true })
                cy.wait(2000)
                getIframeBody()
                        .find('div[role="option"]:visible')
                        .contains("France")
                        .click();

                // Adresse Bénéficiaire
                getIframeBody().find('input[id="adresse1"]').type(ParcoursData.re7FO.parcoursIMMO.adresse1)
                getIframeBody().wait(1500)
                getIframeBody().find('#adresse1').type(' ').click()
                // getIframeBody()
                //         .find('div[role="option"]:visible')
                //         .contains(ParcoursData.re7FO.parcoursIMMO.adresse1)
                //         .first()
                //         .click();
                cy.wait(1000)

                // Code postal bénéficiaire
                getIframeBody().find('input[data-cy="codePostalBeneficaire"]').type(ParcoursData.re7FO.parcoursIMMO.codePostal)

                // Ville Bénéficiaire
                getIframeBody().find('input[data-cy="ville"]').type(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire)

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
                cy.wait(4000)
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
                getIframeBody().find('input[data-cy="telephone1"]').type(ParcoursData.re7FO.parcoursIMMO.telephone)
                getIframeBody().find('input[data-cy="mail"]').type(ParcoursData.re7FO.parcoursIMMO.mail)
                // getIframeBody().find('input[data-cy="lieuNaissance"]').type(ParcoursData.re7FO.parcoursIMMO.lieuNaissance)
                // getIframeBody().find('input[type=date]').last().click().type(ParcoursData.re7FO.parcoursIMMO.dateNaissance)
                getIframeBody().find('button').contains('Étape suivante').click()
                cy.wait(2000)
                getIframeBody().find('input[data-cy="fractionnement"]').click().type(ParcoursData.re7FO.parcoursIMMO.fractionnement, { force: true }).type('{enter}', { force: true })
                getIframeBody().find('input[data-cy="moyenDePaiement"]').click().type(ParcoursData.re7FO.parcoursIMMO.moyenPaiement, { force: true }).type('{enter}', { force: true })
                getIframeBody().find('button').contains('Enregistrer').click()
                cy.wait(2000)
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