# ADR-002 - Persistência com PostgreSQL

## Status

Aceita

## Data

30/08/2026

## Responsável

Equipe EasyFood

## Contexto

A primeira versão da EasyFood armazenava os restaurantes em um array em memória.

Essa abordagem era simples e adequada para a fase inicial de prototipação, porém os dados eram perdidos sempre que o servidor Node.js era reiniciado.

Com a evolução da aplicação, surgiu a necessidade de manter os restaurantes armazenados entre reinicializações da aplicação.

## Alternativas consideradas

1. Array em memória
2. PostgreSQL
3. MongoDB
4. SQLite
5. Firebase
6. Arquivo JSON

## Decisão

Adotar o PostgreSQL como mecanismo de persistência dos restaurantes da EasyFood.

O acesso aos dados será realizado por meio do Prisma, que ficará entre a API e o banco de dados.

## Justificativa

O PostgreSQL permite manter os dados dos restaurantes de forma persistente, evitando que eles sejam perdidos quando o servidor for reiniciado.

A solução também permite evoluir a aplicação futuramente para consultas mais complexas e relacionamentos entre diferentes entidades.

O Prisma facilita a comunicação entre a aplicação e o banco de dados e ajuda a organizar o acesso aos dados.

## Consequências

### Positivas

- Os dados permanecem armazenados após reinicializações.
- A aplicação passa a utilizar um banco de dados real.
- Permite consultas mais complexas.
- Facilita uma futura expansão do sistema.
- Permite trabalhar com relacionamentos entre entidades.
- A aplicação deixa de depender de dados armazenados apenas na memória.

### Negativas / Trade-offs

- A arquitetura ficou mais complexa.
- É necessário configurar e manter o PostgreSQL.
- A aplicação passa a depender da disponibilidade do banco de dados.
- Existe uma configuração adicional para conexão entre a aplicação e o banco.
- O desenvolvimento exige conhecimento de banco de dados e persistência.

## Critérios de revisão

Esta decisão deverá ser reavaliada quando:

1. O volume de dados crescer significativamente.
2. Surgir necessidade de utilizar outro mecanismo de armazenamento.
3. A aplicação precisar de requisitos diferentes de persistência.
4. Surgirem novas entidades e relacionamentos que exijam mudanças na estrutura do banco.
5. Houver necessidade de alterar a arquitetura de persistência da aplicação.

