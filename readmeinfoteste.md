yarn global add @rocketseat/omni //instala cli da rocket para gerar os projetos mobile, web e server no template

omni init modulo11 --only=server //comando para cli da rocket criar o projeto modulo11 apenas gerando o server

yarn add -D jest //lib - praticamente um framework - de testes <br/>
yarn jest --init <br />
sera gerado o jest.config.js, faremos as seguintes alterações <br />
bail: 1 // 1 - para no primeiro error; 0 executa todos os testes e mostra os erros no final <br />
collectCoverage: true, //para coletar dados da cobertura dos testes  <br />
collectCoverageFrom: ['src/app/**/*.js'], //arquivos cobertos pelos testes - todas as pastas e arquivos .js de src/app/ <br />
coverageDirectory: '__tests__/coverage', //gerar o coverage dentro da pasta __tests__ <br/>
coverageReporters: ['text', 'lcov'], //explicar  <br />
testMatch: ['**/__tests__/**/*.test.js'], //para definir em que pasta procurar os testes - todos nossos testes ficarao na pasta \__tests__  <br />

yarn add -D @sucrase/jest-plugin //para poder utilizar import/export tb no jest <br />
Adicionar o transform do jest no jest.config.js: <br/>
"transform": {
  ".(js|jsx|ts|tsx)": "@sucrase/jest-plugin"
},

add um ignore no nodemon.json para ignorar a pasta \__tests__ e nao ficar reiniciando o servidor sempre que alterarmos um teste <br/>
"ignore": [
  "__tests__"
]

yarn add -D @types/jest //add types/typescript para termos o intellisense do JS nos arquivos de testes

Adicionar ao .eslintrc.js o jest:true dentro do env //para o vscode reconhecer o describe, it, expect...


yarn add -D sqlite3 <br/>
Utilizamos o banco de dados sqlite para rodar os testes - para não apontar para a base de dados de desenv e poder rodar os testes desacopladamente.<br/>
Criar um arquivo .env.test e adicionamos o dialect=sqlite<br/>
Criar o arquivo src/bootstrap.js com as config do import dos .env conforme ambiente (teste/dev/prod) para o Jest ter acesso ao .env<br/>
Ajustar o arquivo src/app.js para importar o ./bootstrap ao inves do import 'doenv/config';<br/>
Ajustar o o arquivo /config/database.js para importar o ./bootstrap e add dialect e setar o endereco do storage do sqlite e os logs <br/>

No package.json:
  "pretest": "NODE_ENV=test sequelize db:migrate", //Para rodar as migrate sempre antes do teste <br/>
  "test": "NODE_ENV=test jest" //No windows "set NODE_ENV=test jest" - para setar o NODE_ENV como TEST e executar os testes<br/>
  "posttest": "NODE_ENV=test sequelize db:migrate:undo:all" //Para apagar todas as migrate depois do testes <br/>

yarn add supertest -D //lib que da um suporte melhor a requisicoes http para os testes de integracao - fake http, consome rotas sem rodar um node

yarn add factory-girl faker -D //para gerar dados para nossos testes - procure por FakerNode para encontrar a doc para mais itens. Eh interessante criar um factory para cada model da aplicacao

Criar a pasta __tests__ na raiz do projeto <br/>
Criar o /__tests__/util/truncate
Criar o /__tests__/factories.js
Criar seu primeiro teste /__tests__/integration/user.test.js
