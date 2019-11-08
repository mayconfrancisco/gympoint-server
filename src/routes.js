import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import validateSessionStore from './app/validators/SessionStore';
import validateStudentStore from './app/validators/StudentStore';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.post('/students', validateStudentStore, StudentController.store);

routes.get('/ping', (req, resp) => {
  return resp.send('OK');
});

export default routes;
