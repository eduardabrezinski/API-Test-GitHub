import { faker } from '@faker-js/faker'

describe('Criar um novo repositório no GitHub via API', () => {
    const token = Cypress.env('acesstoken') // Obtém o token de acesso do GitHub das variáveis de ambiente

    it('Criar novo repositório', () => {
        const repos = {
            name: `repos-${faker.datatype.uuid()}`, // Gera um nome único para o repositório
            description: faker.random.words(5), // Gera uma descrição aleatória
            private: false // Define o repositório como público
        }

        // Faz uma solicitação para criar um novo repositório
        cy.request({
            method: 'POST',
            url: '/user/repos', // Endpoint para criar repositórios no GitHub
            headers: {
                Authorization: `Bearer ${token}`, // Autentica a solicitação com o token
                'User-Agent': 'Cypress Test',
                'Content-Type': 'application/json'
            },
            body: repos // Envia os detalhes do repositório no corpo da solicitação

        }).then((response) => {
            expect(response.status).to.eq(201) // Verifica se o repositório foi criado com sucesso
            cy.log(`Repositório criado com sucesso: ${response.body.full_name}`)

            // Busca os detalhes do repositório recém-criado
            cy.request({
                method: 'GET',
                url: `/repos/${response.body.owner.login}/${response.body.name}`, // URL do repositório criado
                headers: {
                    Authorization: `Bearer ${token}`,
                    'User-Agent': 'Cypress Test'
                }
            }).then((repoResponse) => {
                expect(repoResponse.status).to.eq(200); // Verifica se a busca foi bem-sucedida
                cy.log(`Detalhes do Repositório ${repoResponse.body.full_name}:`);
                cy.log(`Descrição: ${repoResponse.body.description}`);
                cy.log(`Repositório Privado: ${repoResponse.body.private}`);

                const repoName = repoResponse.body.full_name;
                const repoDescription = repoResponse.body.description;

                cy.log(`Nome do Repositório: ${repoName}`);
                cy.log(`Descrição do Repositório: ${repoDescription}`);
            })
        })
    })
})
