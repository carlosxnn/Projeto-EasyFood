# EasyFood 🍔

![Static Badge](https://img.shields.io/badge/STATUS-FINALIZADO-green)

Um projeto de sistema de delivery de comida, desenvolvido como parte de um estudo prático de desenvolvimento backend com Node.js. O sistema conta com uma API RESTful para gerenciar restaurantes e autenticação de usuários, e um frontend simples para visualização.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

- **Backend:**
  - [Node.js](https://nodejs.org/en/)
  - [Express.js](https://expressjs.com/pt-br/)
  - [Prisma](https://www.prisma.io/)
  - [JSON Web Tokens (JWT)](https://jwt.io/)
  - [SQLite](https://www.sqlite.org/index.html)

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript

## ✨ Principais Funcionalidades

- **Autenticação de Usuários:**
  - Registro de novos usuários.
  - Login com geração de token JWT.
  - Rota protegida para verificar o usuário logado.
- **Gestão de Restaurantes:**
  - Listagem dos restaurantes cadastrados no banco de dados.

## ⚙️ Como Executar o Projeto

Para executar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/carlosxnn/Projeto-EasyFood.git
   cd Projeto-EasyFood
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados com o Prisma:**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Inicie o servidor:**
   ```bash
   npm start
   ```
   O servidor estará disponível em `http://localhost:3000`.

## Endpoints da API

A API possui as seguintes rotas:

| Método | Rota               | Descrição                               | Autenticação |
|--------|--------------------|-------------------------------------------|--------------|
| `POST` | `/auth/register`   | Registra um novo usuário.                 | Nenhuma      |
| `POST` | `/auth/login`      | Autentica um usuário e retorna um token.  | Nenhuma      |
| `GET`  | `/auth/me`         | Retorna os dados do usuário autenticado.  | Obrigatória  |
| `GET`  | `/restaurants`     | Lista todos os restaurantes.              | Nenhuma      |

---
Desenvolvido por Carlos.