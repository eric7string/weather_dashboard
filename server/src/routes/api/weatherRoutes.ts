import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const router = Router();

// TO-DO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
 if (!req.body.cityName) {
    res.status(400).send('City is required');
    return;
  }
  const weatherArray = await WeatherService.getWeatherForCity(req.body.cityName);
  await HistoryService.addCity(weatherArray[0].city); 
  res.json(weatherArray);
  // TO-DO: GET weather data from city name
  // TO-DO: save city to search history
});


export default router;
