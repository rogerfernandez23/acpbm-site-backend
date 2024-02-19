import { Router } from 'express';
import RegisterController from './app/controllers/RegisterController.js';
import LoginController from './app/controllers/LoginController.js';
import ClubsController from './app/controllers/ClubsController.js';
import multerconfig from './config/multer.js';
import multer from 'multer';

import authMiddlewares from './app/middlewares/auth.js';

const upload = multer(multerconfig);
const routes = new Router();

// ROUTES FREE
routes.post('/register', RegisterController.store);
routes.post('/login', LoginController.store);

routes.use(authMiddlewares);

// USER ROUTES
routes.get('/users', RegisterController.index);
routes.put('/club/:id', RegisterController.update);

// CLUBS ROUTES
routes.post('/clubs', upload.single('file'), ClubsController.store);
routes.get('/clubs', upload.single('file'), ClubsController.index);
routes.put('/clubs/:id', upload.single('file'), ClubsController.update);
routes.delete('/clubs/:id', upload.single('file'), ClubsController.delete);

export default routes;