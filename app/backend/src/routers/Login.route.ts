import { Router } from 'express';
import loginController from '../controller/Login.controllers';
import loginMiddleware from '../middlewares/login.middleware';
import tokenValidate from '../middlewares/token.middleware';

const router = Router();

router.post('/', loginMiddleware.validate, loginController.login);
router.get('/role', tokenValidate.validate, loginController.role);

export default router;
