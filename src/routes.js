import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';

import validateSessionStore from './app/validators/SessionStore';
import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';
import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';
import validatePlanDelete from './app/validators/PlanDelete';
import validateEnrollmentStore from './app/validators/EnrollmentStore';
import validateEnrollmentUpdate from './app/validators/EnrollmentUpdate';
import validateEnrollmentDelete from './app/validators/EnrollmentDelete';
import validateCheckinStore from './app/validators/CheckinStore';
import validateCheckinIndex from './app/validators/CheckinIndex';
import validateStudentHelpOrderStore from './app/validators/StudentHelpOrderStore';
import validateStudentHelpOrderIndex from './app/validators/StudentHelpOrderIndex';
import validateHelpOrderStore from './app/validators/HelpOrderStore';

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

routes.post(
  '/students/:studentId/checkins',
  validateCheckinStore,
  CheckinController.store,
);

routes.post(
  '/students/:studentId/help-orders',
  validateStudentHelpOrderStore,
  StudentHelpOrderController.store,
);
routes.get(
  '/students/:studentId/help-orders',
  validateStudentHelpOrderIndex,
  StudentHelpOrderController.index,
);

/**
 * AUTH MIDDLEWARE
 */
routes.use(authMiddleware);

routes.post('/students', validateStudentStore, StudentController.store);
routes.get('/students', StudentController.index);
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
routes.put(
  '/enrollments/:enrollmentId',
  validateEnrollmentUpdate,
  EnrollmentController.update,
);
routes.delete(
  '/enrollments/:enrollmentId',
  validateEnrollmentDelete,
  EnrollmentController.delete,
);

routes.get(
  '/students/:studentId/checkins',
  validateCheckinIndex,
  CheckinController.index,
);

routes.get('/help-orders', HelpOrderController.index);
routes.post(
  '/help-orders/:helpOrderId/answer',
  validateHelpOrderStore,
  HelpOrderController.store,
);

export default routes;
