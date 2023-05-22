import ParcoursData from '../../../../fixtures/dataCFDP.json'

describe('parcours JURILIB TPE ERROR FO', () => {
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


        it('Parcours Jurilib TPE Error', () => {
                let numeroDevis = "";

                // ---------------------
                // Sélection prospect + produit
                // ---------------------

                getIframeBody().find('a[href="/souscription/produits/Professionnel"]')
                        .click()
                getIframeBody().find('[class="v-card__title"]')
                        .contains('Jurilib TPE')
                        .click()

                // ---------------------
                // Saisie date d'effet
                // ---------------------

                // Date d'effet dans le passé

                getIframeBody().find('input[type="date"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.datedEffetPassee)
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez saisir une date supérieure à la date du')
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Le format de la date')
                        .and('contain', 'est pas correct')

                // Date d'effet dans le futur (+ d'un an)

                getIframeBody().find('input[type="date"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.datedEffetFuture)
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez saisir une date antérieure ou égale à la date du')
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Le format de la date')
                        .and('contain', 'est pas correct')

                // Date d'effet valide
                cy.wait(2000)
                getIframeBody().find('input[type="date"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.datedEffetValide)
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                // ---------------------
                // Vérification numéro de SIRET
                // ---------------------

                // SIRET erroné

                getIframeBody().find('input[data-cy="select-country"]')
                        .click()
                getIframeBody()
                        .find('div[role="option"]')
                        .first()
                        .click();
                getIframeBody().find('input[data-cy="input-siret"]')
                        .click()
                        .type('111111111111111')
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'SIRET is not valid')
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')

                // SIRET ok

                getIframeBody().contains('Retrouver toutes les informations légales par nom')
                        .parent()
                        .find('[class="v-select__selections"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nomEntreprise)
                getIframeBody().find('[role="listbox"]')
                        .contains(ParcoursData.re7FO.parcoursJURILIBPRO.siret)
                        .click()
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                // Devis réalisé 

                // ---------------------
                // Informations tarifantes
                // ---------------------

                // Sans les champs remplis

                getIframeBody().find('[id="Nombre de salariés"]')
                        .clear()

                getIframeBody().find('[id="Nombre de véhicules terrestres à moteur"]')
                        .clear()

                getIframeBody().find('[id^="Chiffre"]')
                        .clear()

                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')

                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Code NAF est obligatoire')

                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Nombre de salariés est obligatoire')

                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Nombre de véhicules terrestres à moteur est obligatoire')

                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'affaires HT est obligatoire')

                getIframeBody().find('[id="Nombre de salariés"]')
                        .type(0)

                getIframeBody().find('[id="Nombre de véhicules terrestres à moteur"]')
                        .type(0)

                getIframeBody().find('[id^="Chiffre"]')
                        .type(0)

                // Code NAF erroné

                getIframeBody().find('input[data-cy="42"]')
                        .click()
                        .type('01.11Z')
                getIframeBody().find('[role="listbox"]')
                        .contains('01.11Z')
                        .click()
                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()
                getIframeBody().find('p[class="error-bloquant"]')
                        .should('be.visible')
                        .contains('est pas disponible pour ce type')
                        .click()
                getIframeBody().find('p[class="error-bloquant"]')
                        .should('be.visible')
                        .contains('Contactez votre délégation de proximité si vous souhaitez une étude personnalisée')
                        .click()
                getIframeBody().find('button')
                        .contains('Afficher les informations')
                        .click()

                // Code NAF

                getIframeBody().find('input[data-cy="42"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.codeNAF)
                getIframeBody().find('[role="listbox"]')
                        .contains(ParcoursData.re7FO.parcoursJURILIBPRO.codeNAF)
                        .click()
                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Problème lors de la tarification')
                getIframeBody().find('button')
                        .contains('Afficher les informations')
                        .click()

                //Nombre de salariés
                getIframeBody().find('[id="Nombre de salariés"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nbSalaries)

                //Nombre de véhicules terrestres à moteur

                getIframeBody().find('[id="Nombre de véhicules terrestres à moteur"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nbVTM)

                // Chiffres d'affaires

                getIframeBody().find('[id^="Chiffre"]')
                        .clear()
                        .type(100000000)
                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()
                getIframeBody().find('p[class="error-bloquant"]')
                        .should('be.visible')
                        .contains('pas disponible pour les professionnels ayant un CA de plus de 50 000 000')
                        .click()
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Problème lors de la tarification')
                getIframeBody().find('button')
                        .contains('Afficher les informations')
                        .click()
                getIframeBody().find('[id^="Chiffre"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.CA)
                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()

                // Sélection Tarification

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

                // Etape suivante sans remplir les champs obligatoires

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')
                //Erreur Civilité
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Civilité est obligatoire')
                // Erreur Nom
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Nom est obligatoire')
                // Erreur En qualité de
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ En qualité de est obligatoire')
                // Erreur Activité précise
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Activité précise est obligatoire')
                // Erreur Locaux servant à l'exploitation de l'activité
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'activité appartiennent-ils à une SCI dont le souscripteur détient des parts ? est obligatoire')
                // Erreur Procédures judiciaires
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire')
                // Erreur Assurance protection juridique
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire')
                // Erreur Redressement judiciaire dans les 36 derniers mois
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'redressement judiciaire depuis les 36 derniers mois ? est obligatoire')

                // Bouton radio locaux exploitation activité
                getIframeBody().find('div[id="locauxSciAvecPartsSouscripteur"]')
                        .find('input[type="radio"]')
                        .last()
                        .click({ force: true })

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('activité appartiennent-ils à une SCI dont le souscripteur détient des parts ? est obligatoire')
                        .should('not.exist')

                // Bouton radio assurance protection juridique
                getIframeBody().find('div[id="assuranceDejaSouscrite"]')
                        .find('input[type="radio"]')
                        .last()
                        .click({ force: true })


                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire')
                        .should('not.exist')

                // Bouton radio redressement judiciaire
                getIframeBody().find('div[id="redressementJudiciaire"]')
                        .find('input[type="radio"]')
                        .last()
                        .click({ force: true })

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('redressement judiciaire depuis les 36 derniers mois ? est obligatoire')
                        .should('not.exist')

                // Sélection Civilité      
                getIframeBody().find('[class="col col-4"]')
                        .find('[role="button"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.civilite)
                // Prénom représentant         
                getIframeBody().find('[id="nomRepresentant"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nom)
                getIframeBody().find('[id="prenom"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.prenom)
                // En qualité de
                getIframeBody().find('input[data-cy="qualiteProfessionnelle"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.qualiteProfessionnelle)
                //procédures judiciaires
                getIframeBody().find('[id="nombreProcedures"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nbProcedures)
                // Activité précise
                getIframeBody().find('input[data-cy="activite"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.activite)
                // Redacteur devis
                getIframeBody().find('input[id="emisPar"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.emisPar)

                // Sans Nom
                getIframeBody().find('[id="nomRepresentant"]')
                        .clear()
                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Nom est obligatoire')
                getIframeBody().find('[id="nomRepresentant"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nom)

                // Sans activité précise
                getIframeBody().find('input[data-cy="activite"]')
                        .clear()
                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Activité précise est obligatoire')
                getIframeBody().find('input[data-cy="activite"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.activite)

                // Sans procédures judiciaires
                getIframeBody().find('[id="nombreProcedures"]')
                        .clear()
                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire')
                getIframeBody().find('[id="nombreProcedures"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nbProcedures)

                // // Champs obligatoires remplis 
                // getIframeBody().find('div[role="status"]')
                //         .should('be.visible')
                //         .and('contain', 'Le devis a été initialisé')

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()
                //  Devis mis à jour 
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Devis mis à jour')

                // Variation commission courtier
                getIframeBody().find('div[class="v-slider__thumb primary"]')
                        .trigger('mousedown', { button: 0 })
                        .trigger('mousemove', { clientX: 0, clientY: 50 })
                        .trigger('mouseup');

                getIframeBody().find('button')
                        .contains('Recalculer tarif')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Recalcul tarif effectué')

                // Emettre le devis
                getIframeBody().find('button').contains('Emettre le devis').click()

                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Le devis a bien été émis')
                cy.wait(5000)

                // Transformer en contrat 
                getIframeBody().find('a[class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default primary"]')
                        .click()

                // // Checker que le devis existe dans la liste des devis
                // cy.get('a[id="dropdown-subscribe"]').click();
                // cy.get(
                //         'a[href="https://espacepartenaire.re7.cfdp.fr/souscription/devis-etablis"]'
                // ).click();
                // getIframeBody()
                //         .get("@numeroDevis")
                //         .then((numeroDevis) => {
                //                 getIframeBody().find('input[id="input-26"]')
                //                 .click()
                //                 .type(numeroDevis);
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
                // .click();
                // getIframeBody()
                //         .find('div[class="v-list-item__title"]')
                //         .contains("Transformer en contrat")
                //         .click();

                // Saisie de la date

                getIframeBody().find('input[type="date"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.datedEffetPassee)
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez saisir une date supérieure à la date du')
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Le format de la date')
                        .and('contain', 'est pas correct')

                // Date d'effet dans le futur (+ d'un an)

                getIframeBody().find('input[type="date"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.datedEffetFuture)
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez saisir une date antérieure ou égale à la date du')
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Le format de la date')
                        .and('contain', 'est pas correct')

                // Date d'effet valide
                cy.wait(2000)
                getIframeBody().find('input[type="date"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.datedEffetValide)
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                // Valider sans les champs obligatoires
                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Téléphone 1 est obligatoire')
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Mail est obligatoire')

                // Saisie du numéro de téléphone en laissant le champ mail vierge
                getIframeBody().find('input[data-cy="telephone1"]')
                        .type(1111)
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Téléphone 1 est invalide')
                getIframeBody().find('input[data-cy="telephone1"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.telephone)
                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Mail est obligatoire')
                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Téléphone 1 est obligatoire')
                        .should('not.exist')

                // Saisie du mail en laissant le champ téléphone vierge
                getIframeBody().find('input[data-cy="telephone1"]').clear()
                getIframeBody().find('input[data-cy="mail"]')
                        .type(1111)
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Mail est invalide')
                getIframeBody().find('input[data-cy="mail"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.mail)
                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()
                getIframeBody().find('div[role="status"]')
                        .should('be.visible')
                        .and('contain', 'Veuillez valider tous les champs')
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Téléphone 1 est obligatoire')
                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Mail est obligatoire')
                        .should('not.exist')

                // Ajout du numéro de téléphone
                getIframeBody().find('input[data-cy="telephone1"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.telephone)
                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                // Paiement

                getIframeBody().find('button')
                        .contains('Enregistrer')
                        .click()

                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Fractionnement est obligatoire')

                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Moyen de paiement est obligatoire')

                getIframeBody().find('input[data-cy="fractionnement"]').click()
                getIframeBody().find('div[class="v-list-item__title"]')
                        .contains(ParcoursData.re7FO.parcoursASSOCIATION.fractionnement)
                        .click()
                getIframeBody().find('input[data-cy="moyenDePaiement"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursASSOCIATION.moyenPaiement, { force: true })
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
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.prenom)
                getIframeBody().find('input[data-cy="nom"]')
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.nom)
                getIframeBody().find('input[data-cy="mail"]')
                        .type('1111')
                getIframeBody().find('input[data-cy="portable"]')
                        .type('AAAA')
                getIframeBody().find('h1[class="title-helios"]')
                        .parent()
                        .find('button')
                        .contains('Valider')
                        .click()
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Téléphone  est invalide')
                getIframeBody().find('div[class="v-messages__message"]')
                        .should('be.visible')
                        .and('contain', 'Le champ Mail est invalide')
                getIframeBody().find('input[data-cy="mail"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursJURILIBPRO.mail)
                getIframeBody().find('input[data-cy="portable"]')
                        .clear()
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