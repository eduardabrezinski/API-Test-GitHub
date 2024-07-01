Claro! Abaixo está um exemplo de `README.md` para o projeto de teste de API no GitHub, incluindo os passos necessários para execução dos testes Cypress para a API do GitHub:

---

# Testes Cypress para GitHub API

Este projeto contém testes automatizados utilizando Cypress para interagir com a API do GitHub.

## Testes Disponíveis

### 1. Criar um Novo Repositório via API

- **Objetivo:** Criar um novo repositório no GitHub utilizando a API.
- **Descrição:** Este teste cria um repositório com nome e descrição aleatórios e verifica se foi criado com sucesso.

### 2. Consultar Todos os Repositórios no GitHub via API

- **Objetivo:** Consultar todos os repositórios de um usuário no GitHub utilizando a API.
- **Descrição:** Este teste verifica se é possível obter todos os repositórios criados por um usuário e exibe detalhes como nome e visibilidade.

### 3. Excluir Todos os Repositórios no GitHub via API

- **Objetivo:** Excluir todos os repositórios criados por um usuário no GitHub utilizando a API.
- **Descrição:** Este teste cria, consulta e exclui todos os repositórios criados durante o teste anterior, registrando o resultado da exclusão para cada repositório.

### 4. Consultar Todas as Issues em um Repositório no GitHub via API

- **Objetivo:** Consultar todas as issues de um repositório específico no GitHub utilizando a API.
- **Descrição:** Este teste cria um repositório, adiciona uma issue e verifica se é possível consultar todas as issues criadas no repositório, exibindo detalhes como título e corpo.

### 5. Criar uma Issue em um Repositório no GitHub

- **Objetivo:** Criar uma nova issue em um repositório no GitHub utilizando a API.
- **Descrição:** Este teste cria um repositório e uma issue com título e corpo aleatórios, verificando se a issue foi criada com sucesso e exibindo seus detalhes.

### 6. Login no GitHub

- **Objetivo:** Realizar login no GitHub utilizando credenciais de usuário.
- **Descrição:** Este teste automatiza o preenchimento de campos de login e senha na página de login do GitHub, permitindo o acesso à conta do usuário.

---

## Execução dos Testes

### Pré-requisitos

Antes de executar os testes, certifique-se de ter o seguinte instalado:

- Node.js (v12 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Instalação

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/eduardabrezinski/api-test-github.git
   cd test
   ```

2. **Instalar as dependências:**

   ```bash
   npm install
   ```

### Executar os Testes

Para executar os testes Cypress, utilize o seguinte comando:

```bash
npx cypress run
```

Este comando irá executar todos os testes automaticamente e exibir os resultados no terminal.
