# Labook - Backend

![wireframe labook](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

## Introdução

**Labook** é uma **API REST** de rede social com **autenticação JWT**. Permite criar, ler, atualizar e excluir usuários e posts (CRUD), além de interagir com posts existentes por meio de curtidas e descurtidas. O projeto segue o padrão de **Arquitetura em Camadas** e **Programação Orientada a Objetos (POO)**, utilizando banco de dados SQLite.

## Documentação

- Acesse a documentação da API no Postman: [Clique aqui](https://documenter.getpostman.com/view/25826545/2s93eYUBv6)

## Sobre o Projeto

### Instalação

```bash
# Clone o repositório e navegue até a pasta

# Instale todas as dependências
$ npm install

 # Inicie o servidor em modo de desenvolvimento
$ npm run dev

# A aplicação será executada na porta 3003.
```
> ⚠️ **Dica:** Use algum API Client (Postman, Insomnia, Thunder Client) para testar as requisições.


### Tecnologias

O projeto foi desenvolvido com as seguintes tecnologias:

- **Node.js**
- **TypeScript**
- **Express**
- **SQLite & SQL**
- **Knex**
- **UUID**
- **Bcrypt (hash de senhas)**
- **JWT (autenticação e autorização)**
- **Programação Orientada a Objetos (POO)**
- **Arquitetura em Camadas**

## Regras do Negócio
- Cadastro bloqueia e-mails duplicados.
- Um post deve estar sempre vinculado a um usuário.
- Somente ADMINs podem acessar informações de todos os usuários.
- Apenas usuários autenticados podem visualizar e interagir com posts.
- Usuários não podem curtir ou descurtir os próprios posts.
- Curtir ou descurtir repetidamente desfaz a ação anterior.
- Like e dislike se sobrepõem conforme a última interação do usuário.

## Destaques do Projeto

- **Arquitetura modular:** Estrutura em camadas, facilitando manutenção e escalabilidade.
- **Validações de regras de negócio:** Prevenção de e-mails duplicados e restrição de ações indevidas.
- **Autenticação e autorização robustas:** Implementadas com JWT.
- **Scripts claros:** Para inicialização e configuração.
- **Documentação detalhada:** API documentada no Postman para testes práticos.
- **Orientação a Objetos:** Código limpo, modularizado e aderente a boas práticas de POO.

## Endpoints

### 🟢 **Users**
- **POST** `/users/signup` → Cria um novo usuário.
- **POST** `/users/login` → Realiza o login de um usuário já cadastrado e retorna token de autenticação.
- **GET** `/users?q=opcional` → Retorna todos os usuários cadastrados (restrito a ADMINs).
- **PUT** `/users/:id` → Atualiza um usuário pelo seu ID (restrito ao próprio usuário ou a ADMINs).
- **DELETE** `/users/:id` → Remove um usuário existente (restrito ao próprio usuário ou a ADMINs).

### 🔵 **Posts**
- **POST** `/posts` → Cria um novo post (restrito a usuários cadastrados e autenticados).
- **GET** `/posts` → Retorna todos os posts criados (restrito a usuários autenticados).
- **PUT** `/posts/:id` → Atualiza um post pelo seu ID (restrito ao autor do post ou a ADMINs).
- **PUT** `/posts/:id/like` → Permite curtir ou descurtir um post pelo seu ID (restrito a usuários autenticados).  
- **DELETE** `/posts/:id` → Exclui um post pelo seu ID (restrito ao autor do post ou a ADMINs).

## Status do Projeto

- ✅ **Concluído**

## <img alt="Coração Roxo" height="15" src="https://github.com/suuzanemoura/suuzanemoura/assets/104701271/ce158244-38f2-4162-b0a4-24b1cfa66ef8"> **Contato**  
[![Email](https://img.shields.io/badge/-Gmail-EBE2F1?style=for-the-badge&logo=gmail&logoColor=460C68)](mailto:suuzanemoura@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-EBE2F1?style=for-the-badge&logo=linkedin&logoColor=460C68)](https://www.linkedin.com/in/suuzanemoura)
[![Behance](https://img.shields.io/badge/-Behance-EBE2F1?style=for-the-badge&logo=behance&logoColor=460C68)](https://www.behance.net/suzanemoura)
