import { Router } from 'express';
import LeaderboardController from '../controller/Leaderboard.controllers';

const router = Router();

router.get('/', LeaderboardController.get);
router.get('/home', LeaderboardController.filter);
router.get('/away', LeaderboardController.away);

export default router;
