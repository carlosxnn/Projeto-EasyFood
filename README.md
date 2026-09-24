# 🍽️ EasyFood

O EasyFood é um protótipo de sistema de delivery, desenvolvido como projeto acadêmico para a disciplina de Engenharia de Software do curso de Engenharia da Computação. O objetivo principal foi aplicar conceitos de desenvolvimento backend, arquitetura de software e boas práticas na construção de uma API RESTful robusta e funcional.

## 📋 Sobre o Projeto

O projeto simula o núcleo de um serviço de delivery, onde é possível gerenciar restaurantes e usuários. A aplicação foi estruturada para ser escalável e manutenível, utilizando uma arquitetura em camadas que separa claramente as responsabilidades, desde a requisição HTTP até a persistência dos dados.

## 🚀 Funcionalidades Implementadas

O sistema atualmente suporta as seguintes funcionalidades:

- **Gestão de Usuários e Autenticação:**
  - Cadastro (registro) de novos usuários no sistema.
  - Autenticação de usuários via login, gerando um token de acesso.
  - Utilização de JSON Web Tokens (JWT) para controle de sessão e autorização.
- **Gestão de Restaurantes:**
  - Listagem dos restaurantes cadastrados.
- **Infraestrutura e Persistência:**
  - Persistência de dados utilizando o ORM Prisma.
  - Banco de dados configurado para PostgreSQL.
  - Frontend simples (HTML, CSS, JS) integrado para consumir a API e exibir os restaurantes.

## 🏗️ Arquitetura

O projeto adota uma arquitetura em camadas, garantindo o desacoplamento e a organização do código-fonte. O fluxo de uma requisição segue o seguinte padrão:

```
Frontend (Cliente)
       ↓
Express (Servidor Web e Roteamento)
       ↓
Routes (Definição dos Endpoints da API)
       ↓
Controllers (Orquestração da Requisição)
       ↓
Services (Lógica de Negócio)
       ↓
Prisma (ORM - Camada de Acesso a Dados)
       ↓
PostgreSQL (Banco de Dados)
```

- **Controllers:** Responsáveis por receber as requisições HTTP, validar os dados de entrada e orquestrar o fluxo, delegando a lógica de negócio para os serviços.
- **Services:** Contêm a lógica de negócio da aplicação. São responsáveis por executar as regras e operações necessárias para atender a uma solicitação.
- **Prisma (ORM):** Abstrai o acesso ao banco de dados, permitindo que a aplicação interaja com o PostgreSQL de forma segura e tipada, sem a necessidade de escrever SQL manualmente.

## 📁 Estrutura do Projeto

A estrutura de diretórios foi organizada para refletir a arquitetura em camadas e facilitar a manutenção.

```text
/
├── prisma/
│   ├── dev.db
│   ├── migrations/
│   └── schema.prisma
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── src/
│   ├── app.js
│   ├── database/
│   │   └── prisma.js
│   └── routes/
│       ├── auth.js
│       └── restaurants.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```