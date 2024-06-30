// cypress/support/commands.js

Cypress.Commands.add('login', (token) => {
    cy.request({
        method: 'GET',
        url: '/user',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: token
    })
})

Cypress.Commands.add('api_createRepos', (token, reposDetail) => {
    return cy.request({
        method: 'POST',
        url: '/user/repos',
        headers: {
            Authorization: `Bearer ${token}`,
            'User-Agent': 'Cypress Test',
            'Content-Type': 'application/json'
        },
        body: reposDetail
    })
})

Cypress.Commands.add('api_createIssue', (token, owner, repos, issueDetails) => {
    return cy.request({
        method: 'POST',
        url: `https://api.github.com/repos/${owner}/${repos}/issues`,
        headers: {
            Authorization: `Bearer ${token}`,
            'User-Agent': 'Cypress Test',
            'Content-Type': 'application/json'
        },
        body: issueDetails
    })
})
