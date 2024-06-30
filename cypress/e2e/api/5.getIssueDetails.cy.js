import { faker } from '@faker-js/faker'

describe('Consultar todas as issues em um Repositório no GitHub via API', () => {
    const token = Cypress.env('acesstoken') // Obtém o token de acesso do GitHub das variáveis de ambiente
    let createdRepo // Variável para armazenar o repositório criado

    beforeEach(() => {
        // Antes de cada teste, criar um novo repositório
        const reposDetail = {
            name: `repos-${faker.datatype.uuid()}`, // Nome único gerado para o repositório
            description: faker.random.words(5), // Descrição gerada aleatoriamente
            private: false // Define o repositório como público
        }

        cy.request({
            method: 'POST',
            url: '/user/repos', // Endpoint para criar um novo repositório
            headers: {
                Authorization: `Bearer ${token}`, // Autenticação com o token de acesso
                'User-Agent': 'Cypress Test',
                'Content-Type': 'application/json'
            },
            body: reposDetail
        }).then((response) => {
            expect(response.status).to.eq(201) // Verifica se a criação do repositório foi bem-sucedida
            cy.log(`Repositório criado com sucesso: ${response.body.full_name}`)
            createdRepo = response.body // Armazena os detalhes do repositório criado

            // Criar uma nova issue no repositório criado
            const issueDetails = {
                title: `Issue - ${faker.hacker.phrase()}`, // Título gerado aleatoriamente para a issue
                body: faker.hacker.phrase() // Corpo gerado aleatoriamente para a issue
            }

            cy.request({
                method: 'POST',
                url: `/repos/${createdRepo.owner.login}/${createdRepo.name}/issues`, // Endpoint para criar uma nova issue
                headers: {
                    Authorization: `Bearer ${token}`, // Autenticação com o token de acesso
                    'User-Agent': 'Cypress Test',
                    'Content-Type': 'application/json'
                },
                body: issueDetails
            }).then((issueResponse) => {
                expect(issueResponse.status).to.eq(201) // Verifica se a criação da issue foi bem-sucedida
                cy.log(`Issue criada com sucesso: ${issueResponse.body.title}`)
            })
        })
    })

    it('Consultar todas as issues criadas no Repositório', () => {
        // Consultar todas as issues do repositório criado
        cy.request({
            method: 'GET',
            url: `/repos/${createdRepo.owner.login}/${createdRepo.name}/issues`, // Endpoint para obter todas as issues do repositório
            headers: {
                Authorization: `Bearer ${token}`, // Autenticação com o token de acesso
                'User-Agent': 'Cypress Test'
            }
        }).then((issuesResponse) => {
            expect(issuesResponse.status).to.eq(200) // Verifica se a consulta das issues foi bem-sucedida
            cy.log(`Total de issues encontradas: ${issuesResponse.body.length}`)

            // Logar detalhes de cada issue
            issuesResponse.body.forEach((issue) => {
                cy.log(`Detalhes da Issue ${issue.number}:`)
                cy.log(`Título: ${issue.title}`)
                cy.log(`Corpo: ${issue.body}`)
            })
        })
    })

    afterEach(() => {
        // Excluir o repositório criado para limpar os dados de teste
        cy.request({
            method: 'DELETE',
            url: `/repos/${createdRepo.owner.login}/${createdRepo.name}`, // Endpoint para excluir o repositório
            headers: {
                Authorization: `Bearer ${token}`, // Autenticação com o token de acesso
                'User-Agent': 'Cypress Test'
            }
        }).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(204) // Verifica se a exclusão do repositório foi bem-sucedida
            cy.log(`Repositório excluído com sucesso: ${createdRepo.full_name}`)
        })
    })
})
