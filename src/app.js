import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import Youch from 'youch';

// express-async-error para propagar erros dentro do async/await
// deve ser importando antes das rotas
import 'express-async-error';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, resp, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return resp.status(500).json(errors);
      }

      return resp.status(500).json({ error: 'Internal Server Error' });
    });
  }
}

export default new App().server;
