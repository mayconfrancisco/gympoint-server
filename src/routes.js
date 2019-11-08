import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import validateSessionStore from './app/validators/SessionStore';
import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/ping', (req, resp) => {
  return resp.json({ status: 'OK' });
});

routes.post('/sessions', validateSessionStore, SessionController.store);

/**
 * AUTH MIDDLEWARE
 */
routes.use(authMiddleware);

routes.post('/students', validateStudentStore, StudentController.store);
routes.put(
  '/students/:studentId',
  validateStudentUpdate,
  StudentController.update,
);

export default routes;
