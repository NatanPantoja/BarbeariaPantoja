# API para Gestão de Barbearia 💈

![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg)
![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellowgreen.svg)

## 📖 Sobre o Projeto

Este projeto é o backend de um sistema de gestão para barbearias, desenvolvido para simplificar e automatizar as operações do dia a dia. A API permite gerenciar clientes, profissionais, serviços e agendamentos de forma segura e eficiente.

---

## ✨ Funcionalidades Principais

- **Autenticação de Usuários:** Sistema completo de cadastro e login com tokens JWT para segurança.
- **Recuperação de Senha:** Fluxo seguro para que usuários possam redefinir suas senhas.
- **Gestão de Perfis:** Distinção de perfis com permissões diferentes (`CLIENTE`, `PROFISSIONAL`, `ADMIN`).
- **Gestão de Serviços:** CRUD completo para os serviços oferecidos pela barbearia, gerenciado pelo admin.
- **Gestão de Profissionais:** O admin pode cadastrar e remover os profissionais da barbearia.
- **Sistema de Agendamento:** Clientes podem agendar, e a equipe pode cancelar e visualizar a agenda por período.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js:** Ambiente de execução do JavaScript no servidor.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Express:** Framework para criação da API e gerenciamento de rotas.
- **Prisma:** ORM para interação com o banco de dados de forma moderna e segura.
- **MySQL:** Banco de dados relacional para armazenamento dos dados.
- **JSON Web Token (JWT):** Para criação de tokens de autenticação.
- **bcryptjs:** Para criptografia de senhas.
- **Multer:** Middleware para upload de imagens (avatar do profissional e banner do serviço).
- **date-fns:** Biblioteca para manipulação de datas e horas.

---

## 📂 Modelagem de Dados

A estrutura do banco de dados foi projetada para ser simples e relacional, conectando usuários, profissionais, serviços e agendamentos.

![Diagrama do Banco de Dados](diagrama-banco.jpeg)

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) (gerenciador de pacotes)
- Um servidor MySQL rodando na sua máquina ou em um container Docker.

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
    cd nome-do-repositorio
    ```

2.  **Instale as dependências:**

    ```bash
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**

    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Copie o conteúdo do arquivo `.env.example` (se não tiver, use o modelo abaixo) para o seu `.env`.

    **.env.example**

    ```env
    # URL de conexão com o seu banco de dados MySQL
    DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"

    # Chave secreta para gerar os tokens JWT (pode ser qualquer string segura)
    JWT_SECRET="sua_chave_secreta_aqui"
    ```

4.  **Execute as migrações do banco de dados:**

    - Este comando irá criar todas as tabelas no seu banco de dados com base no `schema.prisma`.

    ```bash
    yarn prisma migrate dev
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    yarn dev
    ```
    O servidor estará rodando em `http://localhost:3000`.

---

## Endpoints da API

A seguir, a lista de todas as rotas disponíveis na API.

- `🔒 Requer Autenticação`
- `👑 Requer Permissão de Admin`

### Usuário / Autenticação

| Método | Rota               | Descrição                                 | Protegido? | Corpo da Requisição (JSON)        |
| :----- | :----------------- | :---------------------------------------- | :--------- | :-------------------------------- |
| `POST` | `/users`           | Cadastra um novo cliente.                 | Não        | `{ "name", "email", "password" }` |
| `POST` | `/login`           | Autentica um usuário e retorna um token.  | Não        | `{ "email", "password" }`         |
| `POST` | `/forgot_password` | Solicita a redefinição de senha.          | Não        | `{ "email" }`                     |
| `POST` | `/reset_password`  | Efetiva a redefinição com uma nova senha. | Não        | `{ "token", "password" }`         |
| `GET`  | `/users`           | Lista todos os clientes e funcionários.   | 🔒 👑      | N/A                               |

### Equipe (Staff) e Profissionais

| Método   | Rota     | Descrição                                       | Protegido? | Corpo da Requisição (Multipart Form)                 |
| :------- | :------- | :---------------------------------------------- | :--------- | :--------------------------------------------------- |
| `POST`   | `/staff` | Admin cadastra um novo funcionário (com foto).  | 🔒 👑      | `name`, `email`, `password`, `role`, `avatar` (file) |
| `DELETE` | `/staff` | Admin deleta um funcionário (usuário + perfil). | 🔒 👑      | Parâmetro na URL: `?id=id_do_profissional`           |

### Serviços

| Método   | Rota       | Descrição                                  | Protegido? | Corpo da Requisição (Multipart Form)               |
| :------- | :--------- | :----------------------------------------- | :--------- | :------------------------------------------------- |
| `POST`   | `/servico` | Admin cadastra um novo serviço (com foto). | 🔒 👑      | `name`, `price`, `duration`, `description`, `file` |
| `DELETE` | `/servico` | Admin deleta um serviço.                   | 🔒 👑      | Parâmetro na URL: `?id=id_do_servico`              |
| `GET`    | `/servico` | Lista todos os serviços cadastrados.       | 🔒 👑      | N/A                                                |

### Agendamentos

| Método | Rota                   | Descrição                                        | Protegido? | Corpo da Requisição (JSON)                      |
| :----- | :--------------------- | :----------------------------------------------- | :--------- | :---------------------------------------------- |
| `POST` | `/agendamentos`        | Cliente cria um novo agendamento.                | 🔒         | `{ "profissionalId", "servicoId", "date" }`     |
| `POST` | `/agendamentos/cancel` | Cancela um agendamento (cliente ou funcionário). | 🔒         | `{ "agendamento_id" }`                          |
| `GET`  | `/agendamentos`        | Admin lista agendamentos por período.            | 🔒 👑      | Parâmetros na URL: `?startDate=...&endDate=...` |
