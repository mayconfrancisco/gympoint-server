import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/ping', (req, resp) => {
  return resp.send('OK');
});

export default routes;
