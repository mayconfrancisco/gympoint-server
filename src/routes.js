import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';

import validateSessionStore from './app/validators/SessionStore';
import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';
import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';
import validatePlanDelete from './app/validators/PlanDelete';
import validateEnrollmentStore from './app/validators/EnrollmentStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const bruteForce = new Brute(bruteStore);

routes.get('/ping', (req, resp) => {
  return resp.json({ status: 'OK' });
});

routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store,
);

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

routes.post('/plans', validatePlanStore, PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:planId', validatePlanUpdate, PlanController.update);
routes.delete('/plans/:planId', validatePlanDelete, PlanController.delete);

routes.post(
  '/enrollments',
  validateEnrollmentStore,
  EnrollmentController.store,
);
routes.get('/enrollments', EnrollmentController.index);

export default routes;
