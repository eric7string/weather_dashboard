import dotenv from 'dotenv';
import { Weather, Coordinates, OpenWeatherResponse, OpenWeatherResponseListItem } from '../types/index.js';
dotenv.config();

// TO-DO: Define an interface for the Coordinates object


// TO-DO: Define a class for the Weather object


// TO-DO: Complete the WeatherService class
class WeatherService {
  // TO-DO: Define the baseURL, API key, and city name properties
  private readonly baseURL: string = 'https://api.openweathermap.org';// /data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
  private readonly API_KEY = process.env.API_KEY;
  // private cityName: string = '';
  // private forecast: Weather[] = [];

  private async fetchLocationData(query: string): Promise<Coordinates>{
    const apiRoute = 'geo/1.0/direct?';
    const url = `${this.baseURL}/${apiRoute}${query}`;
    const response = await fetch(url);
    // TODO: Pick city from array?
    return (await response.json())[0]; 
  }
  
  // TO-DO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates | any): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    }
  }
  
  // TO-DO: Create buildGeocodeQuery method
  private buildGeocodeQuery(cityName: string): string {
   return `q=${cityName}&limit=5&appid=${this.API_KEY}&units=imperial`;
  }
  
  // TO-DO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.API_KEY}&units=imperial`
  }
  
  // TO-DO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(cityName: string) {
    const query = this.buildGeocodeQuery(cityName);
    const locationData = await this.fetchLocationData(query);
    //console.log(locationData)
    return this.destructureLocationData(locationData);
  }
  
  // TO-DO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<Weather[]> {
    const apiRoute = 'data/2.5/forecast?';
    const query = this.buildWeatherQuery(coordinates);
    const url = `${this.baseURL}/${apiRoute}${query}`;
    const response = await fetch(url);
    const result = await response.json()as OpenWeatherResponse;
    return this.parseCurrentWeather(result);
  }
  
  // TO-DO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather[] {
    const cityName = response.city.name;

    const weatherByDate: Array<{day: number, weatherItems: Array<OpenWeatherResponseListItem>}> = [];
    response.list.forEach((weatherItem: OpenWeatherResponseListItem) => {
      const date = new Date(weatherItem.dt_txt).getDate();
     // console.log(date);
      const existingItem = weatherByDate.find(x => x.day === date);
      if (existingItem) {
        existingItem.weatherItems.push(weatherItem);
      } else {
        weatherByDate.push({day: date, weatherItems: [ weatherItem ]});
      }
    })

    //console.log(weatherByDate);

    return weatherByDate.map((dailyWeather: any) => {
      let summaryWeather = dailyWeather.weatherItems.find((x: OpenWeatherResponseListItem) => new Date(x.dt_txt).getHours() === 12)
       ?? dailyWeather.weatherItems[0];
     
      return new Weather({
        city: cityName,
        date: new Date(summaryWeather.dt_txt).toLocaleDateString(),
        icon: summaryWeather.weather[0].icon,
        iconDescription: summaryWeather.weather[0].description,
        tempF: summaryWeather.main.temp,
        humidity: summaryWeather.main.humidity,
        windSpeed: summaryWeather.wind.speed,
      });
    });
  }
  
  // TO-DO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  
  // TO-DO: Complete getWeatherForCity method
  public async getWeatherForCity(cityName: string): Promise<Weather[]> {
    const coordinates = await this.fetchAndDestructureLocationData(cityName);
    return await this.fetchWeatherData(coordinates);
  }
}

export default new WeatherService();
