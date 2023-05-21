# Labook - BackEnd

![wireframe labook](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

## Introdução

Labook é uma API REST de uma rede social onde é possível fazer requisições de criação, leitura, atualização e exclusão dos usuários e posts seguindo o sistema CRUD com autenticação em jwt token. Também é possível interagir com os posts existentes, havendo a possibilidade de dar like e dislike. Rotas protegidas, seguindo o padrão de Arquitetura em Camadas e Programação Orientada a Objetos (POO). Implementada a um banco de dados SQLite.

## Documentação

- Acesse a documentação da API pelo postman: [Clique aqui!](https://documenter.getpostman.com/view/25826545/2s93eYUBv6)

## Sobre o Projeto

### Instalação

```bash
# Instale todas as dependências
$ npm install

# Execute o projeto
$ npm run dev

# A aplicação será iniciada na porta 3003

# Use algum API Client para realizar as requisições
```

### Tecnologias

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização (JWT)

### Endpoints

- **Users:**
  - Create user
    - Criação de um novo usuário.
  - Get users
    - Retorna todos os usuários cadastrados, apenas ADMINs tem acess a informação.
  - Edit user by id
    - Atualização de uma ou mais informações de um usuário através do seu ID.
  - Delete user by id
    - Exclusão de um usuário cadastrado.
- **Post:**
  - Create post
    - Criação de um novo post.
  - Get posts
    - Retorna todos os posts criados.
  - Edit post by id
    - Atualização do conteúdo de um post através do seu ID.
  - Delete post by id
    - Exclusão de um post criado.
  - Like or Dislike
    - É possível dar like ou dislike nos posts criados.

### Regras de negócio

- O usuário não deve poder se cadastrar com um e-mail duplicado;
- O post sempre deverá ter um usuário;
- Somente ADMINs podem ter acesso a informações de usuários;
- Somente usuários já cadastrados podem visualizar os posts criados;
- O usuário não deve poder dar like/dislike no próprio post;
- Caso usuário dê um like em um post que já tenha dado like, o like é desfeito (deleta o item da tabela);
- Caso usuário dê um dislike em um post que já tenha dado dislike, o dislike é desfeito (deleta o item da tabela);
- Caso usuário dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.
- Caso usuário dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.

## Contato

E-mail: suuzanemoura@gmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/suuzanemoura/)
