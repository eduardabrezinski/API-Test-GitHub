import faker from 'faker'

describe('Excluir todos os repositórios no GitHub via API', () => {
  const token = Cypress.env('acesstoken') // Token de autenticação do GitHub
  const username = Cypress.env('username') // Nome de usuário do GitHub
  let createdRepos = [] // Array para armazenar detalhes dos repositórios criados

  beforeEach(() => {
    // Criar um novo repositório antes de cada teste
    const repos = {
      name: `repos-${faker.datatype.uuid()}`, // Nome único gerado para o repositório
      description: faker.random.words(5), // Descrição gerada aleatoriamente
      private: false // Define o repositório como público
    }

    cy.request({
      method: 'POST',
      url: 'https://api.github.com/user/repos', // Endpoint para criar um novo repositório
      headers: {
        Authorization: `Bearer ${token}`, // Autenticação com o token de acesso
        'User-Agent': 'Cypress Test',
        'Content-Type': 'application/json'
      },
      body: repos
    }).then((response) => {
      expect(response.status).to.eq(201) // Verifica se a criação do repositório foi bem-sucedida
      cy.log(`Repositório criado com sucesso: ${response.body.full_name}`)
      createdRepos.push(response.body) // Armazena detalhes do repositório criado
    })
  })

  it('Excluir todos os repositórios criados', () => {
    // Consultar todos os repositórios do usuário para excluir todos
    cy.request({
      method: 'GET',
      url: `https://api.github.com/users/${username}/repos`, // Endpoint para obter todos os repositórios do usuário
      headers: {
        Authorization: `Bearer ${token}`, // Autenticação com o token de acesso
        'User-Agent': 'Cypress Test'
      }
    }).then((reposResponse) => {
      expect(reposResponse.status).to.eq(200) // Verifica se a consulta dos repositórios foi bem-sucedida

      // Adicionar todos os repositórios ao array createdRepos
      reposResponse.body.forEach((repo) => {
        createdRepos.push(repo)
      })

      // Tentar excluir cada repositório no array createdRepos
      createdRepos.forEach((repo) => {
        cy.request({
          method: 'DELETE',
          url: `https://api.github.com/repos/${repo.owner.login}/${repo.name}`, // Endpoint para excluir o repositório
          headers: {
            Authorization: `Bearer ${token}`, // Autenticação com o token de acesso
            'User-Agent': 'Cypress Test'
          },
          failOnStatusCode: false // Continua mesmo que o status não seja 2xx
        }).then((deleteResponse) => {
          if (deleteResponse.status === 204) {
            cy.log(`Repositório excluído com sucesso: ${repo.full_name}`) // Excluído com sucesso
          } else if (deleteResponse.status === 403) {
            cy.log(`Permissão negada para excluir o repositório ${repo.full_name}.`) // Falta de permissão
          } else if (deleteResponse.status === 404) {
            cy.log(`Repositório ${repo.full_name} não encontrado.`) // Não encontrado
          } else {
            cy.log(`Erro ao excluir repositório ${repo.full_name}. Status: ${deleteResponse.status}`)
          }
        })
      })
    })
  })
})
