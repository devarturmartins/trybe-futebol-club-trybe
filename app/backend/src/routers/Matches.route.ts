import { Router } from 'express';
import MatchesController from '../controller/Matches.controllers';
import tokenValidate from '../middlewares/token.middleware';
import matchesMiddleware from '../middlewares/matches.middleware';

const router = Router();
router.get('/', MatchesController.getAll);
router.patch('/:id/finish', tokenValidate.validate, MatchesController.finishMatch);
router.patch('/:id', tokenValidate.validate, MatchesController.attMatch);
router.post('/', tokenValidate.validate, matchesMiddleware.validate, MatchesController.createMatch);

export default router;
