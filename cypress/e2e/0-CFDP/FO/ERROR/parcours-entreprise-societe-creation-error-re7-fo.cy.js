import ParcoursData from '../../../../fixtures/dataCFDP.json'

describe('parcours ENTREPRISE SOCIETE EN CREATION ERROR FO', () => {
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


        it('Parcours Entreprise Societe en creation Error', () => {
                let numeroDevis = "";
                getIframeBody().find('a[href="/souscription/produits/Professionnel"]')
                        .click()
                getIframeBody().find('[class="v-card__title"]')
                        .contains('Alsina Entreprise')
                        .click()

                // ---------------------
                // Saisie date d'effet
                // ---------------------

                // Date d'effet dans le passé

                getIframeBody().find('input[type="date"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.datedEffetPassee)

                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Veuillez saisir une date supérieure à la date du')
                        .should('be.visible')

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Le format de la date')
                        .and('contain', 'est pas correct')
                        .should('be.visible')

                // Date d'effet dans le futur (+ d'un an)

                getIframeBody().find('input[type="date"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.datedEffetFuture)

                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Veuillez saisir une date antérieure ou égale à la date du')
                        .should('be.visible')

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Le format de la date')
                        .and('contain', 'est pas correct')
                        .should('be.visible')

                // Date d'effet valide

                cy.wait(2000)

                getIframeBody().find('input[type="date"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.datedEffetValide)

                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                getIframeBody().find('input[data-cy="select-country"]')
                        .click()

                getIframeBody()
                        .find('div[role="option"]')
                        .first()
                        .click();

                getIframeBody().find('div[class="v-input--selection-controls__input"]')
                        .click()

                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

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
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')


                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Code NAF est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Nombre de salariés est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Nombre de véhicules terrestres à moteur est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'affaires HT est obligatoire')
                        .should('be.visible')

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
                        .contains('est pas disponible pour ce type')
                        .should('be.visible')

                getIframeBody().find('p[class="error-bloquant"]')
                        .contains('Contactez votre délégation de proximité si vous souhaitez une étude personnalisée')
                        .should('be.visible')

                getIframeBody().find('button')
                        .contains('Afficher les informations')
                        .click()

                // Code NAF

                getIframeBody().find('input[data-cy="42"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.codeNAF)

                getIframeBody().find('[role="listbox"]')
                        .contains(ParcoursData.re7FO.parcoursENTREPRISE.codeNAF)
                        .click()

                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()

                getIframeBody().find('button')
                        .contains('Afficher les informations')
                        .click()

                //Nombre de salariés

                getIframeBody().find('[id="Nombre de salariés"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.nbSalaries)

                //Nombre de véhicules terrestres à moteur

                getIframeBody().find('[id="Nombre de véhicules terrestres à moteur"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.nbVTM)

                // Chiffres d'affaires => ^ = commence par ...

                getIframeBody().find('[id^="Chiffre"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.CA)

                // CALCULER

                getIframeBody().find('button')
                        .contains('Calculer')
                        .click()

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

                // ---------------------
                // Informations complémentaires
                // ---------------------

                // Sans remplir les champs

                getIframeBody().find('input[data-cy="nombreEtablissementsSecondaires"]')
                        .clear()

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Raison sociale est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Forme juridique est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Adresse est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Ville est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Code postal est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Civilité est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Nom est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ En qualité de est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Activité précise est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Nombre d’établissements secondaires est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'activité appartiennent-ils à une SCI dont le souscripteur détient des parts ? est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'un redressement judiciaire depuis les 36 derniers mois ? est obligatoire')
                        .should('be.visible')

                // Raison sociale

                getIframeBody().find('input[data-cy="raisonSociale"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.qualiteProfessionnelle)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Raison sociale est obligatoire')
                        .should('not.exist')

                // Forme juridique

                getIframeBody().find('input[data-cy="formeJuridique"]')
                        .click()

                getIframeBody().find('div[class="v-list-item__title"]')
                        .contains(ParcoursData.re7FO.parcoursENTREPRISE.formeJuridique)
                        .click()

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Forme juridique est obligatoire')
                        .should('not.exist')

                // Adresse

                getIframeBody().find('input[id="autoCompletion-addresse"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.adresse1)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Adresse est obligatoire')
                        .should('not.exist')

                // Ville 

                getIframeBody().find('input[id="autoCompletion-ville"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.ville)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Ville est obligatoire')
                        .should('not.exist')

                // Code postal

                getIframeBody().find('input[data-cy="codePostal"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.codePostal)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')


                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Code postal est obligatoire')
                        .should('not.exist')

                // En qualité de
                getIframeBody().find('input[data-cy="qualiteProfessionnelle"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.qualiteProfessionnelle)
                cy.wait(3000)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ En qualité de est obligatoire')
                        .should('not.exist')

                // Sélection Civilité      
                getIframeBody().find('[class="col col-4"]')
                        .find('[role="button"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.civilite)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Civilité est obligatoire')
                        .should('not.exist')

                // Nom & prénom représentant         
                getIframeBody().find('[id="nomRepresentant"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.nom)
                getIframeBody().find('[id="prenom"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.prenom)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                // getIframeBody().find('div[role="status"]')
                //         .and('contain', 'Veuillez valider tous les champs')
                //         .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Nom est obligatoire')
                        .should('not.exist')

                // Activité précise
                getIframeBody().find('input[data-cy="activite"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.activite)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Activité précise est obligatoire')
                        .should('not.exist')

                // Nombre d'établissements secondaires 

                getIframeBody().find('input[data-cy="nombreEtablissementsSecondaires"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.nbEtablissementSecondaire)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Activité précise est obligatoire')
                        .should('not.exist')

                //procédures judiciaires
                getIframeBody().find('[id="nombreProcedures"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.nbProcedures)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Combien de procédures judiciaires avez-vous eu depuis les 36 derniers mois ? est obligatoire')
                        .should('not.exist')

                // Bouton radio locaux exploitation activité
                getIframeBody().find('div[id="locauxSciAvecPartsSouscripteur"]')
                        .find('input[type="radio"]')
                        .last()
                        .click({ force: true })

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('activité appartiennent-ils à une SCI dont le souscripteur détient des parts ? est obligatoire')
                        .should('not.exist')

                // Assurance protection juridique
                getIframeBody().find('div[id="assuranceDejaSouscrite"]')
                        .find('input[type="radio"]')
                        .last()
                        .click({ force: true })

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Avez-vous déjà souscrit à une assurance de protection juridique ? est obligatoire')
                        .should('not.exist')

                // Redressement judiciaire
                getIframeBody().find('div[id="redressementJudiciaire"]')
                        .find('input[type="radio"]')
                        .last()
                        .click({ force: true })

                // Redacteur devis
                getIframeBody().find('input[id="emisPar"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.emisPar)

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
                getIframeBody().find('a[class="button-visu v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default primary"]')
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

                // Saisie de la date

                getIframeBody().find('input[type="date"]')
                        .click()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.datedEffetPassee)
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()
                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Veuillez saisir une date supérieure à la date du')
                        .should('be.visible')

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Le format de la date')
                        .and('contain', 'est pas correct')
                        .should('be.visible')

                // Date d'effet dans le futur (+ d'un an)

                getIframeBody().find('input[type="date"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.datedEffetFuture)
                getIframeBody().find('button')
                        .contains('Valider')
                        .click()
                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Veuillez saisir une date antérieure ou égale à la date du')
                        .should('be.visible')

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Le format de la date')
                        .and('contain', 'est pas correct')
                        .should('be.visible')

                // Date d'effet valide
                cy.wait(2000)
                getIframeBody().find('input[type="date"]')
                        .click()
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.datedEffetValide)

                getIframeBody().find('button')
                        .contains('Valider')
                        .click()

                // Valider sans les champs obligatoires
                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Téléphone 1 est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Mail est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ SIRET est obligatoire')
                        .should('be.visible')

                // Saisie du numéro de téléphone en laissant le champ mail vierge

                getIframeBody().find('input[data-cy="telephone1"]')
                        .type(1111)

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Téléphone 1 est invalide')
                        .should('be.visible')

                getIframeBody().find('input[data-cy="telephone1"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.telephone)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Mail est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Téléphone 1 est obligatoire')
                        .should('not.exist')

                // Saisie du mail en laissant le champ téléphone vierge
                getIframeBody().find('input[data-cy="telephone1"]').clear()
                getIframeBody().find('input[data-cy="mail"]')
                        .type(1111)

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Mail est invalide')
                        .should('be.visible')

                getIframeBody().find('input[data-cy="mail"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.mail)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .and('contain', 'Veuillez valider tous les champs')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Téléphone 1 est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .contains('Le champ Mail est obligatoire')
                        .should('not.exist')

                // Ajout du numéro de téléphone et du SIRET
                getIframeBody().find('input[data-cy="telephone1"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.telephone)

                getIframeBody().find('input[data-cy="input-siret"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.siret)

                getIframeBody().find('button')
                        .contains('Étape suivante')
                        .click()

                // Paiement

                getIframeBody().find('button')
                        .contains('Enregistrer')
                        .click()

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Fractionnement est obligatoire')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Moyen de paiement est obligatoire')
                        .should('be.visible')

                getIframeBody().find('input[data-cy="fractionnement"]')
                        .click()

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
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.prenom)

                getIframeBody().find('input[data-cy="nom"]')
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.nom)

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
                        .and('contain', 'Le champ Téléphone  est invalide')
                        .should('be.visible')

                getIframeBody().find('div[class="v-messages__message"]')
                        .and('contain', 'Le champ Mail est invalide')
                        .should('be.visible')

                getIframeBody().find('input[data-cy="mail"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.mail)

                getIframeBody().find('input[data-cy="portable"]')
                        .clear()
                        .type(ParcoursData.re7FO.parcoursENTREPRISE.telephone)

                getIframeBody().find('h1[class="title-helios"]')
                        .parent()
                        .find('button')
                        .contains('Valider')
                        .click()

                getIframeBody().find('div[role="status"]')
                        .contains('Circuit de signature électronique correctement lancé')
                        .should('be.visible')



        })


})