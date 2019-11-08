import { Router } from 'express';

const routes = Router();

routes.get('/', (req, resp) => {
  return resp.send('gello my friusd');
});

export default routes;
