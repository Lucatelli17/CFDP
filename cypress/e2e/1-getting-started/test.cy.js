// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
    beforeEach(() => {
      cy.visit('https://espacepartenaire.int.cfdp.fr/gestion/devis/')
      cy.url().should('eq', 'https://espacepartenaire.int.cfdp.fr/gestion/login')
  
      cy.get('input[name="_username"]').type('abordes3')
      cy.get('input[name="_password"]').type('KG2rJL@#XuBdp:3')
      cy.get('button[name="_submit"]').click()
      cy.wait(4000)
      cy.url().should('eq', 'https://espacepartenaire.int.cfdp.fr/gestion/devis/')
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
  
    it('selection du code ia', () => {
      cy.get('#side-menu').contains('Créer un nouveau devis').click()
      cy.url().should('eq', 'https://espacepartenaire.int.cfdp.fr/gestion/devis/')
  
      cy.get('#page-wrapper')
      getIframeBody().find('input').first().type('37205', {force:true})
      getIframeBody().find('button').contains('Sélectionner').click()
      getIframeBody().find('#app').should('contain.text', 'Quel est votre prospect ?')
    })
  
    it.only('Faire un parcours particulier', () => {
      let numeroDevis = '';
      cy.get('#side-menu').contains('Créer un nouveau devis').click()
      cy.url().should('eq', 'https://espacepartenaire.int.cfdp.fr/gestion/devis/')
  
      cy.get('#page-wrapper')
      getIframeBody().find('input').first().type('37205', {force:true})
      getIframeBody().find('button').contains('Sélectionner').click()
      getIframeBody().find('#app').should('contain.text', 'Quel est votre prospect ?')
  
      getIframeBody().find('#app').should('contain', 'Particulier')
      getIframeBody().contains('Particulier').click()
      getIframeBody().contains('Alsina Particulier').click()
      getIframeBody().find('#input-118').click().type('2023-05-21')
      getIframeBody().contains('Valider').click()
      getIframeBody().find('#input-173').click()
      getIframeBody().wait(500)
      getIframeBody().find('#list-item-185-1').click()
      getIframeBody().contains('Calculer').click()
  
      getIframeBody().wait(1000)
      getIframeBody().find('.tableau').contains('Sélectionner').click()
      getIframeBody().wait(500)
      getIframeBody().find('#civilite').click()
      getIframeBody().contains('Madame, Monsieur').click()
      getIframeBody().find('#nom').click().type('Test Nom')
      getIframeBody().find('#prenom').click().type('Test Prenom')
      getIframeBody().find('[type=date]').click().type('1999-09-21')
      getIframeBody().find('#lieuNaissance').click().type('Quelque part')
      getIframeBody().find('#adresse1').click().type('4 rue du Lac')
      getIframeBody().wait(1500)
      getIframeBody().find('#adresse1').type(' ')
      getIframeBody().wait(2000)
      getIframeBody().contains('Le Havre').click()
      getIframeBody().wait(2000)
      getIframeBody().find('#app').contains('Numéro de devis').contains('HD').then(text => {
        numeroDevis = text[0].innerText;
        cy.wrap(numeroDevis).as('numeroDevis')
  
      });
      cy.get('#side-menu').contains('Liste des devis').click()
      cy.wait(3000)
      getIframeBody().get('@numeroDevis').then(numeroDevis => {
        getIframeBody().find('#input-64').click().type(numeroDevis)
      });
      getIframeBody().find('button').contains('Rechercher').click()
      cy.wait(2000)
      getIframeBody().find('[class="devis-list__container"]').should('contain.text', numeroDevis)
    })
  })
  