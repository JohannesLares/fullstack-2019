describe('Blog app', function () {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: "test",
            username: "testi",
            password: '123456789'
        }
        cy.request('POST', 'http://localhost:3003/api/login/register', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Login to bloglist')
    })

    describe('Login', function() {

        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testi')
            cy.get('#password').type('123456789')
            cy.get("#login-button").click()
            
            cy.contains('test logged in')
        })

        it('fails with wrong creds', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('12345678')
            cy.get("#login-button").click()
            
            cy.contains('Wrong password or username')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({username: 'testi', password: '123456789'})
        })

        it('blog can be created', function() {
            cy.get("#view-new-blog-button").click()

            cy.get('#new-title').type('ens ots')
            cy.get('#new-author').type('ens auth')
            cy.get('#new-url').type('ens urli')

            cy.get('#new-blog-button').click()

            cy.contains('Blog ens ots by ens auth created')
            cy.contains('ens ots ens auth')
        })

        describe('already blog', function() {
            beforeEach(function() {
                cy.blog({title: 'otsikko', author: 'tekijä', url: 'osoite'})
            })

            it('blog can be liked', function() {
                cy.contains('view').click()
                cy.contains('Like').click()
                cy.get('.likes').contains('1')
            })

            it('blog can be removed', function() {
                cy.contains('view').click()
                cy.contains('Remove').click()
                cy.contains('otsikko tekijä').not
            })

            it.only('sorts by likes', function() {
                cy.blog({title: 'toinen', author: 'toistaa', url: 'toiselle'})
                cy.blog({title: 'kolmas', author: 'kolisi', url: 'kolinoille'})
                cy.get('#otsikkotekijä').contains('view').click()
                cy.get('#otsikkotekijä').contains('Like').click()
                cy.wait(2000)
                cy.get('#kolmaskolisi').contains('view').click()
                cy.get('#kolmaskolisi').contains('Like').click()
                cy.wait(2000)
                cy.get('#toinentoistaa').contains('view').click()
                cy.get('#toinentoistaa').contains('Like').click()
                cy.wait(2000)
                cy.get('#kolmaskolisi').contains('Like').click()
                cy.wait(2000)
                cy.get('#otsikkotekijä').contains('Like').click()
                cy.wait(2000)
                cy.get('#kolmaskolisi').contains('Like').click()
                cy.get('.blogs').eq(0).contains('kolmas')
                cy.get('.blogs').eq(-0).contains('toinen')
            })
        })
        
    })
})