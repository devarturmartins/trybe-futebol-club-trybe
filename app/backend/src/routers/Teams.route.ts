import { Router } from 'express';
import TeamsController from '../controller/Teams.controllers';

const router = Router();

router.get('/', (req, res) => TeamsController.getAll(req, res));
router.get('/:id', (req, res) => TeamsController.getById(req, res));

export default router;
