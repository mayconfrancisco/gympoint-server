<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Backend Gympoint
</h3>


<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/mayconfrancisco/gympoint-server?color=%2304D361">

  <a href="https://mayconfrancisco.com.br">
    <img alt="Made by Maycon Francisco" src="https://img.shields.io/badge/made%20by-Maycon%20Francisco-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/mayconfrancisco/gympoint-server/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/mayconfrancisco/gympoint-server?style=social">
  </a>
</p>

<p align="center">
  <a href="#sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rodar-o-projeto">Rodar o projeto</a>
  <a href="#licença">Licença</a>
</p>

## Sobre o projeto

Backend da aplicação **Gympoint** em NodeJS. O Gympoint é um app gerenciador de academia - Projeto desenvolvido como Desafio no Bootcamp da Rocketseat

### Rodar o projeto:

Sete todas as configurações da aplicação em um arquivo ``.env`` - há um ``.env.example`` para servir de base

OPCIONAL: Para criar uma instância do **postgres** com o docker em sua máquina

``docker run --name database-pg -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres``

OPCIONAL: Para criar uma instância do **mongo** com o docker em sua máquina

``docker run --name database-mongo -p 27017:27017 -d -t mongo``

OPCIONAL: Para criar uma instância do **redis** com o docker em sua máquina

``docker run --name redis -p 6379:6379 -d -t redis:alpine``


Para baixar as dependências

``yarn``

Para iniciar a aplicação

``yarn dev``


### Ferramentas

- [Express](https://expressjs.com/)
- [ExpressAsyncErrors](https://www.npmjs.com/package/express-async-errors)
- [BruteForce](https://www.npmjs.com/package/express-brute)
- [Sequelize](https://sequelize.org)
- [Cors](https://www.npmjs.com/package/cors)
- [Helmet](https://helmetjs.github.io)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs)
- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Yup](https://www.npmjs.com/package/yup)
- [Nodemailer](https://nodemailer.com/about/)
- [Handlebars](https://www.npmjs.com/package/express-handlebars)
- [BeeQueue](https://github.com/bee-queue/bee-queue)

- [Sucrase](https://github.com/alangpierce/sucrase)
- [Nodemon](https://nodemon.io)
- [Youch](https://www.npmjs.com/package/youch)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [EditorConfig](https://editorconfig.org)


## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ♥ em Blumenau
