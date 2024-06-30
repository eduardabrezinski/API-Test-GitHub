import faker from 'faker'

describe('Criar uma Issue em um Repositorio no GitHub', () => {
    const token = Cypress.env('acesstoken') // Obtém o token de acesso do GitHub das variáveis de ambiente
    const owner = Cypress.env('username') // Obtém o nome de usuário do GitHub das variáveis de ambiente
    let issueTitle // Variável para armazenar o título da issue criada
    let reposName // Variável para armazenar o nome do repositório criado

    it('Criar um novo Repositório e uma nova Issue', () => {
        // Detalhes do novo repositório a ser criado
        const reposDetail = {
            name: `repos-${faker.datatype.uuid()}`, // Nome único gerado para o repositório
            description: faker.random.words(5), // Descrição gerada aleatoriamente
            private: false // Define o repositório como público
        }

        // Chama a função customizada para criar um repositório
        cy.api_createRepos(token, reposDetail).then((response) => {
            expect(response.status).to.eq(201) // Verifica se a criação do repositório foi bem-sucedida
            cy.log(`Repositório criado com sucesso: ${response.body.full_name}`)

            const repos = reposDetail.name // Armazena o nome do repositório criado
            // Detalhes da nova issue a ser criada
            const issueDetails = {
                title: `Issue - ${faker.hacker.phrase()}`, // Título gerado aleatoriamente para a issue
                body: faker.hacker.phrase() // Corpo gerado aleatoriamente para a issue
            }

            // Chama a função customizada para criar uma issue no repositório
            cy.api_createIssue(token, owner, repos, issueDetails).then((issueResponse) => {
                expect(issueResponse.status).to.eq(201) // Verifica se a criação da issue foi bem-sucedida
                cy.log(`Issue criada com sucesso: ${issueResponse.body.title}`)
                issueTitle = issueResponse.body.title; // Armazena o título da issue criada

                // Consulta os detalhes da issue criada
                cy.request({
                    method: 'GET',
                    url: `/repos/${owner}/${repos}/issues/${issueResponse.body.number}`, // Endpoint para obter detalhes da issue
                    headers: {
                        Authorization: `Bearer ${token}` // Autenticação com o token de acesso
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200) // Verifica se a consulta da issue foi bem-sucedida
                    cy.log(`Detalhes da Issue em ${repos}: ${response.body.title}`)
                    cy.log(`Título da Issue: ${response.body.title}`)
                    cy.log(`Corpo da Issue: ${response.body.body}`)
                })
            })
        })
    })
})
