# Jitterbit Challenge - API de Gerenciamento de Pedidos

API para gerenciamento de pedidos com itens, desenvolvida com Node.js, Express e PostgreSQL.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

### 1. Clone o repositório

```bash
git clone https://github.com/Thalessns/jitterbit-challenge.git
cd jitterbit-challenge
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo:

```bash
cp .env.example .env
```

### 3. Inicie o banco de dados

Utilize o Docker Compose para iniciar o PostgreSQL:

```bash
docker-compose up --build -d
```

Isso irá criar um container PostgreSQL com as seguintes configurações:

- **Host**: localhost
- **Porta**: 5432
- **Usuário**: challenge_user
- **Senha**: challenge_password
- **Banco de dados**: jitterbit_challenge

### 4. Instale as dependências

```bash
npm install
```

### 5. Execute as migrações do banco de dados

```bash
npx prisma migrate dev
```

### 6. Gere o cliente Prisma

```bash
npx prisma generate
```

## ▶️ Executando a Aplicação

### Modo de desenvolvimento

```bash
node src/app.js
```

A API estará disponível em: http://localhost:3000

### Documentação Swagger

A documentação interativa da API está disponível em:

**http://localhost:3000/api-docs**

### Autenticação JWT

A API suporta autenticação JWT externa. Para habilitar:

1. Defina `ENABLE_AUTH=true` no arquivo `.env`
2. A env `JWT_SERVICE_ENDPOINT` já está configurada, você pode encontrar mais informações
sobre o serviço de autenticação aqui, será possível criar seu access_group e sua signature.
- [jwt-auth-service](https://github.com/Thalessns/jwt-auth-service)
3. Inclua os seguintes headers nas requisições:
   - `access_group`: Grupo de acesso do usuário
   - `signature`: Assinatura para autorização
