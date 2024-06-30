import faker from 'faker'

describe('Consultar todos os repositórios no GitHub via API', () => {
    const token = Cypress.env('acesstoken') // Obtém o token de acesso do GitHub das variáveis de ambiente
    let createdRepos = []; // Array para armazenar detalhes dos repositórios criados

    beforeEach(() => {
        // Cria um novo repositório antes de cada teste
        const repos = {
            name: `repos-${faker.datatype.uuid()}`, // Nome único gerado para o repositório
            description: faker.random.words(5), // Descrição gerada aleatoriamente
            private: false // Define o repositório como público
        }
        cy.request({
            method: 'POST',
            url: '/user/repos', // Endpoint para criar repositórios no GitHub
            headers: {
                Authorization: `Bearer ${token}`, // Autenticação com o token de acesso
                'User-Agent': 'Cypress Test',
                'Content-Type': 'application/json'
            },
            body: repos // Dados do repositório a ser criado
        }).then((response) => {
            expect(response.status).to.eq(201) // Verifica se a criação foi bem-sucedida
            cy.log(`Repositório criado com sucesso: ${response.body.full_name}`)
            createdRepos.push(response.body) // Armazena os detalhes do repositório criado
        })
    })

    it('Consultar todos os repositórios criados', () => {
        // Consulta todos os repositórios do usuário
        cy.request({
            method: 'GET',
            url: '/user/repos', // Endpoint para obter todos os repositórios do usuário
            headers: {
                Authorization: `Bearer ${token}`, // Autenticação com o token de acesso
                'User-Agent': 'Cypress Test'
            }
        }).then((reposResponse) => {
            expect(reposResponse.status).to.eq(200) // Verifica se a consulta foi bem-sucedida
            cy.log(`Total de repositórios encontrados: ${reposResponse.body.length}`)

            // Exibe os detalhes de cada repositório encontrado
            reposResponse.body.forEach((repo) => {
                cy.log(`Detalhes do Repositório ${repo.full_name}:`)
                cy.log(`Descrição: ${repo.description}`)
                cy.log(`Repositório Privado: ${repo.private}`)
            })
        })
    })

    afterEach(() => {
        // Exclui os repositórios criados após cada teste
        createdRepos.forEach((repo) => {
            cy.request({
                method: 'DELETE',
                url: `/repos/${repo.owner.login}/${repo.name}`, // Endpoint para excluir o repositório
                headers: {
                    Authorization: `Bearer ${token}`, // Autenticação com o token de acesso
                    'User-Agent': 'Cypress Test'
                }
            }).then((deleteResponse) => {
                expect(deleteResponse.status).to.eq(204) // Verifica se a exclusão foi bem-sucedida
                cy.log(`Repositório excluído com sucesso: ${repo.full_name}`)
            })
        })
    })
})
