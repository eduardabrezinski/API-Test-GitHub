describe('Login', () => {
    const token = Cypress.env('acesstoken') // Obtém o token de acesso do GitHub das variáveis de ambiente
  
    it('Login com os dados do usuário', () => {
      // Solicita os detalhes do usuário autenticado usando o token
      cy.request({
        method: 'GET',
        url: '/user', // Endpoint para obter os detalhes do usuário autenticado no GitHub
        headers: {
          Authorization: `Bearer ${token}`, // Autentica a solicitação com o token
          'User-Agent': 'Cypress Test',
          Accept: 'application/vnd.github.v3+json' // Define o formato da resposta da API
        }
      }).then((response) => {
        expect(response.status).to.eq(200) // Verifica se a solicitação foi bem-sucedida
        
        cy.log(response.body) // Registra os detalhes do usuário no log do Cypress
      })
    })
  })
  