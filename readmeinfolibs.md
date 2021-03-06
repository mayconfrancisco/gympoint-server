## INFO LIBS
**Costumo descrever as libs e _"hacks"_ do projeto para posterior consulta**

yarn init -y

yarn add sucrase nodemon -D
//Sucrase eh para permitir usar o Import/Export no node
yarn sucrase-node src/server.js //para rodar - o node ainda nao reconhece os import/export
criar o arquivo nodemon.json com o execmap para definir o sucrase-node na execucao dos JS ao invés de usar o node
criar o "scripts / dev" no package.json normalmente - ao executar o dev nodemon chamará o sucrase-node

yarn add eslint -D
yarn eslint --init
remover o package-lock.json e executar yarn - eslint intala usando o npm e nos estamos usando o yarn
configurar as rules no arquivo .eslintrc.js

yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
configurar o .eslintrc.js (extends, plugins e rules)
criar o arquivo .prettierrc com as configuracoes que conflitam com o airbnb

add editorConfig

yarn eslint --fix src --ext .js //fara a correcao de todos os arquivo .js da pasta src

yarn add dotenv //adicionar a carga das variaveis ambiente <br/>
//criar os arquivos .env e .env.example <br/>
// git init / criar o gitigone add o .env

yarn add express

yarn add cors

yarn add helmet

criar os arquivso src/app, routes, server --testar se funcionando

yarn add express-async-error //lib para conseguir capturar os erros dentro dos async/await - Com a lib os erros conseguem ser propagados para um middleware nosso

yarn add youch //formatar as exceptions capturados no exception handler para json - erros mais inteligiveis

yarn add @sentry/node //add SENTRY para monitorar o projeto quando for para outros ambientes http://sentry.io <br/>
//da para integrar o SENTRY ao Slack, Github... definir os tickets para pessoas da equipe

#### TDD
Leia o arquivo [readmeinfolibs.md](readmeinfolibs.md)

yarn add sequelize
yarn add sequelize-cli -D
criar o arquivo .sequelizerc
yarn add pg pg-hstore //conforme doc do sequelize para o postgres precisamos instalar essas 2 dependencias
criar e configurar o databaseconfig (src/config/database.js)

// o banco existe na base? - deve ser criado antes de executar as migration
yarn sequelize migration:create --name=create-users //cria uma migration usando o sequelize-cli
yarn sequelize db:migrate //roda todas as migracoes
yarn sequelize db:migrate:undo //desfaz a ultima migration
yarn sequelize db:migrate:undo:all //desfaz todas as migrations
yarn sequelize seed:generate --name admin-user
yarn sequelize db:seed:all
//Crio o model manualmente no formato de classe - raramente utilizo o mode:generate
yarn sequelize model:generate --name User --attributes id:integer name:string email:string password:virtual password_hash:string

Criar o /src/database/index com as configuracoes de conexao e mapeamento dos models da base de dados relacional e/ou Nao relacional (Mongo e PG)
Importar esse arquivo de configuracao de base no /src/app -- import './database';

yarn add bcryptjs

yarn add jsonwebtoken

yarn add yup //validators - validar entrada de dados na api - usavamos o JOI com o express-validation

yarn add express-brute express-brute-redis

yarn add date-fns@next //lib para lidar com datas - @next para pegar a ultima versao - !!2.0-alpha!!

yarn add nodemailer //lib para envio de emails

yarn add express-handlebars nodemailer-express-handlebars //Handlebars TemplateEngine - envio de email HTML

yarn add bee-queue //para lidar com filas - alternativa mais performatica ao KUE, mas que nao possui priorizacao de jobs e outras funcionalidades



### TODOs
TDD
YUP para validação das rotas - Exception handlers para capturar e tratar as exceptions
BruteForce na Session - RateLimit nas demais rotas quando fizer sentido - AuthMidleware para injetar os dados do JWT
Services - Para a logica nao ficar toda no Controller
Cache da app com o ioredis - apenas nas rotas que fazem sentido

Se mandar um student que nao existe no Enrollment da problema - testar com captura de exception? No checkin tb da problema, claro. No StudentHelpOrder Tb
add exceptions - controllers, validations, services + criar um padrao de mensagens de erro
    Considerar o bruteforce, ratelimit, yup, e nossas exceptions de negocio
add Sentry
### TODOs




yarn add multer //para lidar com upload de arquivo - multipart/form-data

yarn add mongoose //ODM para mongodb

yarn add ioredis //client redis que ja possui integracao com promise (async/await) <br/>
// Fazer CACHE apenas de querys um pouco mais pesadas e que não tenham tanto sensibilidade temporal



##### Seguranca
yarn add express-brute express-brute-redis <br/>
// Evita ataques por bruteforce - brute vai analisar a quantidade de reqs em uma rota e vai bloquear por um periodo o acesso para aquele client/IP <br/>
// Salvamos os clients/IPs no redis, eh possivel utilizar outro store, mas redis eh mto performatico <br/>
// Possui diversas configs - da um CMD + Click na classe Brute e da um olhada nos Options ou consulte a documentacao

yarn add helmet <br/>
// para configurar - add nos middlewares no express no arquivo /src/app.js <br/>
// o Helment adiciona varios cabecablos de seguranca para CrosScript, nao permite add sua app como iframe entre outros <br/>
// De uma olhada na documentacao ou da um CMD + Click no helmet() para verificar as options

yarn add express-rate-limit rate-limit-redis redis <br/>
// o Redis instalamos pq o rate-limit nao tem dependencia direta, entao temos que realizar a conexao de forma manual, diferente das outras libs que ja utilizamos no projeto com o redis - é possível utilizar outro store, mas redis eh mto performatico <br/>
//Lib para limitar o acesso as rotas - dispensavel caso tenha uma API Gateway <br/>
// Configurei tudo la no /src/app.js <br/>
// Sao adicionados headers na requisicao informando qual o limite, quantas reqs restantes ainda existem e qual o timestamp reset para voltar a fazer requisicoes - procure por headers que iniciem com X-RateLimit

Não esqueca de configurar o CORS

Cogite utilizar os Alertas do GITHUB sobre as suas dependencias

Cogite utilizar o servico Greenkeeper para atualizar automaticamente as depencias - Tem a possibilidade de rodar os testes (CI) antes de atualizar

