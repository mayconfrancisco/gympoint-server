import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

import validateSessionStore from './app/validators/SessionStore';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.get('/ping', (req, resp) => {
  return resp.send('OK');
});

export default routes;
