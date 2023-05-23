import { Router } from 'express';
import LeaderboardController from '../controller/Leaderboard.controllers';

const router = Router();

router.get('/home', LeaderboardController.home);

export default router;
