import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
const router = Router();





// TO-DO: GET search history
router.get('/', async (_req: Request, res: Response) => {
  const cities = await HistoryService.getCities();
  res.json(cities);
});

// * BONUS TO-DO: DELETE city from search history
router.delete('/:id', async (req: Request, res: Response) => {
  await HistoryService.removeCity(req.params.id);
  res.send('City removed');
});

export default router;