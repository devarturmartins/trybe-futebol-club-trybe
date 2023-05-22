import { Router } from 'express';
import MatchesController from '../controller/Matches.controllers';

const router = Router();
router.get('/', MatchesController.getAll);

export default router;
