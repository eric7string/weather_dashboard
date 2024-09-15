import { Router } from 'express';
const router = Router();

import historyRoutes from './historyRoutes.js';
import weatherRoutes from './weatherRoutes.js';

router.use('/weather', weatherRoutes);
router.use('/weather/history', historyRoutes);

export default router;
