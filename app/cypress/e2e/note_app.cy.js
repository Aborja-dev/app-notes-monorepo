describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.request('GET', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'abraham',
      username: 'arahakna',
      password: 'mipassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
  })
  it('frontpage can be open', () => {
    cy.contains('Notes')
  })
  it('login form can be open', () => {
    cy.contains('Show Login').click()
  })
  it('user can login', () => {
    cy.contains('Show Login').click()
    cy.get('input[name=Username]').type('arahakna')
    cy.get('input[name=Password]').type('mipassword')
    cy.get('#login-form-button').click()
    cy.contains('create note')
  })

  it('login wrong password', () => {
    cy.contains('Show Login').click()
    cy.get('input[name=Username]').type('arahakna')
    cy.get('input[name=Password]').type('mipass')
    cy.get('#login-form-button').click()
    cy.get('.error')
      .should('contain', 'wrong credentials')
      .should('have.css', 'border-style', 'solid')
  })
  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({
        username: 'arahakna',
        password: 'mipassword'
      })
    })
    it('a new note can be created', () => {
      const noteContent = 'note created by cypress'
      cy.contains('create note').click()
      cy.get('input').type(noteContent)
      cy.contains('save').click()
      cy.contains(noteContent)
    })
  })
})
