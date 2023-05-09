describe('connexion au FO', () => {
    beforeEach(() => {
        cy.visit('https://espacepartenaire.re7.cfdp.fr/souscription')
        cy.url().should('include', 'hubdigital-idp-re7.cfdp.fr/login')
      })

      it('connexion au FO avec les bons logins', () => {
        cy.get('input[id="username"]').type('test.confie@yopmail.com')
        cy.get('input[id="password"]').type('Cfdp2023')
        cy.get('button[id="signin"]').click()
        cy.wait(4000)
        cy.url().should('eq', 'https://espacepartenaire.re7.cfdp.fr/souscription')
      })

      it('connexion au FO avec les mauvais logins', () => {
        cy.get('input[id="username"]').type('test')
        cy.get('input[id="password"]').type('test')
        cy.get('button[id="signin"]').click()
        cy.get('#mes-infos').should('contain.text', 'utilisateur ou mot de passe incorrect')
      })
})