import { Router } from 'express';
import RegisterController from './app/controllers/RegisterController.js';
import LoginController from './app/controllers/LoginController.js';


const routes = new Router();

routes.post('/register', RegisterController.store);
routes.post('/login', LoginController.store);

export default routes;