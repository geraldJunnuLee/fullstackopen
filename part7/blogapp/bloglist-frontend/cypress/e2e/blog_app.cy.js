describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })
  it('loginform is shown', () => {
    cy.get('#login-form')
    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('blogs')
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainenVäärä')
      cy.get('#login-button').click()

      cy.get('#error-message')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', () => {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('blogs')
      cy.get('#show-blog-form-button').click()
      cy.get('#blog-form-title-input').type('From Cypress testing')
      cy.get('#blog-form-author-input').type('Matti Luukkainen')
      cy.get('#blog-form-url-input').type('http://url/url.joo')

      cy.get('#create-new-blog-button').click()

      cy.contains('a new blog From Cypress testing by Matti Luukkainen added')
      cy.get('.blog').then((blogs) => {
        expect(blogs[0]).to.contain.text(
          'From Cypress testing Matti Luukkainen',
        )
      })
    })

    it('A blog can be liked', function () {
      cy.contains('blogs')
      cy.createBlog({
        title: 'hello world',
        author: 'Scooby doo',
        url: 'http://test.url/jep',
        likes: 0,
      })
      cy.get('.show-blog-details-button').click()
      cy.get('.blog-like-button').click()
      cy.contains('likes 1')
    })

    it('blog creator can delete the blog', function () {
      cy.contains('blogs')
      cy.createBlog({
        title: 'hello world',
        author: 'Scooby doo',
        url: 'http://test.url/jep',
      })
      cy.get('.show-blog-details-button').click()
      cy.get('.delete-blog-button').click()
      cy.get('.blog').should('not.exist')
    })

    it('other user cant see delete button', function () {
      const otherUser = {
        name: 'Peppa Pig',
        username: 'peppapig',
        password: 'eisalattu',
      }
      cy.request('POST', 'http://localhost:3001/api/users/', otherUser)

      cy.contains('blogs')
      cy.createBlog({
        title: 'hello world',
        author: 'Scooby doo',
        url: 'http://test.url/jep',
      })
      cy.get('#logout-button').click()
      cy.login({ username: 'peppapig', password: 'eisalattu' })
      cy.get('.show-blog-details-button').click()
      cy.get('.delete-blog-button').should('not.exist')
    })

    it('check blogs order based on likes', function () {
      cy.contains('blogs')
      cy.createBlog({
        title: 'hello world',
        author: 'Scooby doo',
        url: 'http://test.url/jep',
        likes: 5,
      })
      cy.createBlog({
        title: 'foo bar',
        author: 'batman',
        url: 'http://test.batman/jep',
        likes: 3,
      })
      cy.get('.blog').eq(0).should('contain', 'hello world')
      cy.get('.blog').eq(1).should('contain', 'foo bar')

      cy.get('.show-blog-details-button').eq(1).click()
      cy.get('.blog-like-button').click()
      cy.contains('likes 4')
      cy.get('.blog-like-button').click()
      cy.contains('likes 5')
      cy.get('.blog-like-button').click()
      cy.contains('likes 6')
      cy.get('.blog').eq(0).should('contain', 'foo bar')
      cy.get('.blog').eq(1).should('contain', 'hello world')
    })
  })
})
