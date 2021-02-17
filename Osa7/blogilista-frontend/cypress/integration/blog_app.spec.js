describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.addUser({ name: 'Jahu Pino', username: 'jahu', password: 'salainen' })
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('Login form is shown', function () {
    cy.get('.loginForm')
      .get('.showInfo')
      .should('be.visible')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('jahu')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Jahu Pino logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('jahu')
      cy.get('#password').type('eisalainen')
      cy.get('#login-button').click()

      cy.get('.err')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'jahu', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('testi blogi')
      cy.get('#author').type('testaaja teppo')
      cy.get('#url').type('www.testaaajansivut.fi')
      cy.contains('create').click()
      cy.contains('testi blogi')
      cy.contains('testaaja teppo')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {

        cy.createBlog({
          title: 'testi blogi',
          author: 'testaaja teppo',
          url: 'www.testaaajansivut.fi',
          likes: 0,
        })
      })

      it('it can be liked', function () {
        cy.get('.blog')
          .contains('show more')
          .click()

        cy.get('.blog')
          .get('.defaultId')
          .get('.showInfo')
          .get('.addLike')
          .click()
          .click()

        cy.get('.blog')
          .get('.defaultId')
          .get('.showInfo')
          .should('contain', '2')
      })

      it('it can removed', function () {
        cy.get('.blog')
          .contains('show more')
          .click()

        cy.get('.blog')
          .get('.defaultId')
          .get('.showInfo')
          .get('.removeBlog')
          .get('.removeButton')
          .click()

        cy.get('html').should('not.contain', 'testi blogi')

      })
      it('it can not removed if not authorized', function () {
        cy.contains('Logout')
          .click()
        cy.addUser({ name: 'toinen Jahu', username: 'toinenjahu', password: 'sana' })
        cy.login({ username: 'toinenjahu', password: 'sana' })
        cy.get('.blog')
          .contains('show more')
          .click()

        cy.get('.blog')
          .get('.defaultId')
          .get('.showInfo')
          .get('.removeBlog')
          .should('not.exist')




      })
      it('multiple blogs are sort by likes', function () {
        cy.createBlog({
          title: 'testi blogi2',
          author: 'testaaja teppo2',
          url: 'www.testaaajansivut2.fi',
          likes: 0,
        })
        cy.createBlog({
          title: 'testi blogi3',
          author: 'testaaja teppo3',
          url: 'www.testaaajansivut3.fi',
          likes: 30,
        })
        cy.createBlog({
          title: 'testi blogi25',
          author: 'testaaja teppo25',
          url: 'www.testaaajansivut25.fi',
          likes: 25,
        })

        cy.get('.blog')
          .get('.defaultId')
          .get('.showInfo')
          .get('.likes')
          .then($likes => {
            console.log('blog length', $likes.length)
            expect($likes.length).to.eq(4)

            for (let i = 1; i < $likes.length; i++) {
              let likes1 =parseInt($likes[i-1].innerText)
              let likes2 =parseInt($likes[i].innerText)
              expect(likes1).to.be.least(likes2)
            }
          })





      })
    })
  })
})