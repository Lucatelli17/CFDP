import ParcoursData from '../../../../fixtures/dataCFDP.json'

describe('parcours SYNDICAT COPRO VERTICAL NOUVEAU PROSPECT ERROR RE7 FO', () => {
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


        it('Parcours Syndicat Copro Vertical Nouveau Prospect Error', () => {
                let numeroDevis = "";

                // ---------------------
                // Sélection prospect + produit
                // ---------------------

                getIframeBody().find('a[href="/souscription/produits/Immobilier"]')
                        .click()
                getIframeBody().find('[class="v-card__title"]')
                        .contains('Alsina Syndicat de Copropriétaires')
                        .click()

                // ---------------------
                // Saisie date d'effet
                // ---------------------

                // Date d'effet dans le passé

                getIframeBody().find('input[type="date"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursIMMO.datedEffetPassee)

                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Le format de la date')
                        .and('contain', 'est pas correct')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Veuillez saisir une date supérieure à la date du')
                        .should('be.visible')



                // Date d'effet dans le futur (+ d'un an)

                getIframeBody().find('input[type="date"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursIMMO.datedEffetFuture)
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()
                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Veuillez saisir une date antérieure ou égale à la date du')
                        .should('be.visible')

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Le format de la date')
                        .and('contain', 'est pas correct')
                        .should('be.visible')

                // Date d'effet valide

                getIframeBody().find('input[type="date"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursIMMO.datedEffetValide)
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                // Calculer sans remplir les champs

                getIframeBody().find('input[id="Surface développée totale (Si copropriété verticale)"]')
                        .clear()

                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Sélectionner un pays est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Type de copropriété est obligatoire')
                        .should('be.visible')


                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Type de gestion de la copropriété est obligatoire')
                        .should('be.visible')


                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Surface développée totale (Si copropriété verticale) est obligatoire')
                        .should('be.visible')

                // Sélection Pays

                getIframeBody().find('input[data-cy="select-country"]')
                        .click()
                getIframeBody().find('div[role="option"]')
                        .contains('France')
                        .first()
                        .click()

                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .contains('Le champ Sélectionner un pays est obligatoire')
                        .should('not.exist')

                // Type copropriété

                getIframeBody().find('div[role="combobox"]')
                        .first()
                        .click()
                getIframeBody().find('div[role="listbox"]')
                        .contains('Verticale')
                        .click()

                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')


                getIframeBody().find('div[class^="v-messages__message"]')
                        .contains('Le champ Type de copropriété est obligatoire')
                        .should('not.exist')

                // Type de gestion copropriété

                getIframeBody().find('div[role="combobox"]')
                        .last()
                        .click()
                getIframeBody().find('div[role="listbox"]')
                        .contains('Syndic professionnel')
                        .click()

                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .contains('Le champ Type de gestion de la copropriété est obligatoire')
                        .should('not.exist')

                // Surface développée totale (si copropriété verticale)

                getIframeBody().find('input[id="Surface développée totale (Si copropriété verticale)"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursIMMO.nbMetrescarre)

                // CALCULER
                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()
                getIframeBody().find('button')
                        .contains('Sélectionner')
                        .first()
                        .click()

                // // ---------------------
                // // Devis - Recherche client
                // // ---------------------

                // Nouveau prospect
                getIframeBody().find('button')
                        .contains('Nouveau prospect')
                        .click()

                // // ---------------------
                // // Devis - Informations complémentaires
                // // ---------------------

                // Etape suivante sans remplir les champs

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Raison sociale est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Forme juridique est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Adresse est obligatoire')
                        .first()
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Ville est obligatoire')
                        .first()
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Code postal est obligatoire')
                        .first()
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Civilité est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Nom est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ En qualité de est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Nom de la copropriété est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Adresse est obligatoire')
                        .last()
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Ville est obligatoire')
                        .last()
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Code postal est obligatoire')
                        .last()
                        .should('be.visible')


                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire')
                        .should('be.visible')


                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Pays est obligatoire')
                        .should('be.visible')


                // Raison sociale     
                getIframeBody().find('div[title="Raison sociale"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursIMMO.raisonSociale)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .should('not.contain', 'Le champ Raison sociale est obligatoire')

                // Forme juridique
                getIframeBody().find('div[title="Forme juridique"]')
                        .type(ParcoursData.re7FO.parcoursIMMO.formeJuridique)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .should('not.contain', 'Le champ Forme juridique est obligatoire')

                // Adresse Souscripteur
                getIframeBody().find('div[title="Adresse"]')
                        .first()
                        .type(ParcoursData.re7FO.parcoursIMMO.adresse1)

                // Ville Souscripteur
                getIframeBody().find('input[id="autoCompletion-ville"]')
                        .type(ParcoursData.re7FO.parcoursIMMO.ville)

                // Code Postal Souscripteur
                getIframeBody().find('input[data-cy="codePostal"]')
                        .type(ParcoursData.re7FO.parcoursIMMO.codePostal)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .should('not.contain', 'Veuillez valider tous les champs')

                cy.wait(3000)
                getIframeBody().find('div[title="Adresse"]')
                        .first()
                        .find('div[class^="v-messages__message"]')
                        .should('not.contain', 'Le champ Adresse est obligatoire')

                cy.wait(3000)

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Ville est obligatoire')
                        .first()
                        .should('not.be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .and('contain', 'Le champ Code postal est obligatoire')
                        .first()
                        .should('not.be.visible')

                // Sélection Civilité     
                getIframeBody().find('input[data-cy="civilite"]')
                        .click();
                getIframeBody()
                        .find('div[role="option"]')
                        .contains("Monsieur")
                        .first()
                        .click();

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class^="v-messages__message"]')
                        .should('not.contain', 'Le champ Civilité est obligatoire')

                // // Nom & prénom représentant         
                // getIframeBody().find('input[data-cy="nomRepresentant"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.nom)
                // getIframeBody().find('input[data-cy="prenom"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.prenom)
                // // En qualité de
                // getIframeBody().find('input[data-cy="qualiteProfessionnelle"]')
                //         .type(ParcoursData.re7FO.parcoursPRO.qualiteProfessionnelle)
                // cy.wait(10000)
                // // Nom de la copro
                // getIframeBody().find('input[data-cy="nom"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.nomCopro)
                // // Pays Bénéficiaire
                // getIframeBody().find('input[data-cy="paysBeneficiaire"]')
                //         .type('France', { force: true })
                // getIframeBody()
                //         .find('div[role="option"]:visible')
                //         .contains("France")
                //         .click();

                //          // Pays Bénéficiaire
                //          getIframeBody().find('input[data-cy="pays"]')
                //          .click();
                //  getIframeBody()
                //          .find('div[role="option"]')
                //          .contains("France")
                //          .first()
                //          .click();

                //  getIframeBody().find('button')
                //          .contains('Étape suivante')
                //          .click()

                //  getIframeBody().find('div[role="status"]')
                //          .and('contain', 'Veuillez valider tous les champs')
                //          .should('be.visible')

                //  getIframeBody().find('div[class^="v-messages__message"]')
                //          .should('not.contain', 'Le champ Pays est obligatoire')

                // // Adresse Bénéficiaire
                // getIframeBody().find('input[id="adresse1"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.adresse1, { force: true })
                // // Ville Bénéficiaire
                // getIframeBody().find('div[title="Ville"]')
                //         .last()
                //         .type(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire)
                // getIframeBody()
                //         .find('div[role="option"]:visible')
                //         .contains(ParcoursData.re7FO.parcoursIMMO.villeBeneficiaire)
                //         .first()
                //         .click();

                // //procédures judiciaires
                // getIframeBody().find('input[id="nombreProcedures"]')
                //         .click()
                //         .type(ParcoursData.re7FO.parcoursIMMO.nbProcedures)
                // // Assurance protection juridique
                // getIframeBody().find('div[id="assuranceDejaSouscrite"]')
                //         .find('[class="v-input--selection-controls__ripple"]')
                //         .last()
                //         .click()
                // // Redacteur devis
                // getIframeBody().find('input[id="emisPar"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.emisPar)
                // // // Récupération du numéro de devis
                // // getIframeBody()
                // //         .find("#app")
                // //         .contains("Numéro de devis")
                // //         .contains("HD")
                // //         .then((numDevis) => {
                // //                 numeroDevis = numDevis.text();
                // //                 cy.wrap(numeroDevis).as("numeroDevis");
                // //         });

                // cy.wait(5000)

                // getIframeBody().find('button')
                //         .contains('Étape suivante')
                //         .click()

                // // Variation commission courtier
                // getIframeBody().find('div[class="v-slider__thumb primary"]')
                //         .trigger('mousedown', { button: 0 })
                //         .trigger('mousemove', { clientX: 0, clientY: 50 })
                //         .trigger('mouseup');

                // getIframeBody().find('button')
                //         .contains('Recalculer tarif')
                //         .click()

                // // Emettre le devis 
                // getIframeBody().find('button')
                //         .contains('Emettre le devis')
                //         .click()
                // cy.wait(5000)

                // // Transformer en contrat 
                // getIframeBody().find('a[class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default primary"]')
                //         .click()

                // // cy.get('a[id="dropdown-subscribe"]')
                // //         .click();
                // // cy.get(
                // //         'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
                // // ).click();
                // // getIframeBody()
                // //         .get("@numeroDevis")
                // //         .then((numeroDevis) => {
                // //                 getIframeBody().find('input[id="input-26"]')
                // //                         .click()
                // //                         .type(numeroDevis);
                // //                 cy.wait(2000)
                // //         });
                // // getIframeBody()
                // //         .find("button")
                // //         .contains("Rechercher")
                // //         .click({ force: true });
                // // getIframeBody()
                // //         .find('[class="devis-list__container"]')
                // //         .should("contain.text", numeroDevis);
                // // cy.wait(2000)
                // // // Cliquer sur la liste des actions du devis emis
                // // getIframeBody().find('button[data-cy="listActions"]')
                // //         .click();
                // // getIframeBody()
                // //         .find('div[class="v-list-item__title"]')
                // //         .contains("Transformer en contrat")
                // //         .click();




                // getIframeBody().find('button')
                //         .contains('Valider')
                //         .click()
                // getIframeBody().find('input[data-cy="input-siret"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.siret)
                // getIframeBody().find('input[data-cy="telephone1"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.telephone)
                // getIframeBody().find('input[data-cy="mail"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.mail)
                // getIframeBody().find('button')
                //         .contains('Étape suivante')
                //         .click()
                // getIframeBody().find('input[data-cy="fractionnement"]')
                //         .click()
                // getIframeBody().find('div[class="v-list-item__title"]')
                //         .contains(ParcoursData.re7FO.parcoursIMMO.fractionnement)
                //         .click()
                // getIframeBody().find('input[data-cy="moyenDePaiement"]')
                //         .click()
                //         .type(ParcoursData.re7FO.parcoursIMMO.moyenPaiement, { force: true })
                //         .type('{enter}', { force: true })
                // getIframeBody().find('button')
                //         .contains('Enregistrer')
                //         .click()
                // cy.wait(30000)

                // // ---------------------
                // // Envoi signature électronique
                // // ---------------------

                // getIframeBody().find('button')
                //         .contains('Signer électroniquement')
                //         .click()
                // getIframeBody().find('input[data-cy="prenom"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.prenom)
                // getIframeBody().find('input[data-cy="nom"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.nom)
                // getIframeBody().find('input[data-cy="mail"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.mail)
                // getIframeBody().find('input[data-cy="portable"]')
                //         .type(ParcoursData.re7FO.parcoursIMMO.telephone)
                // getIframeBody().find('h1[class="title-helios"]')
                //         .parent()
                //         .find('button')
                //         .contains('Valider')
                //         .click()
                // getIframeBody().find('div[role="status"]')
                //         .should('be.visible')
                //         .and('contain', 'Circuit de signature électronique correctement lancé')


        })


})