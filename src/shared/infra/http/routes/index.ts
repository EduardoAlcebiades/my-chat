import { Router } from 'express';
import { roomRoutes } from './room.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.redirect('/index.html');
});

routes.use('/room', roomRoutes);

export { routes };
