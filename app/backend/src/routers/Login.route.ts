import { Router } from 'express';
import loginController from '../controller/Login.controllers';

const router = Router();

router.post('/', (req, res) => loginController.login(req, res));

export default router;
