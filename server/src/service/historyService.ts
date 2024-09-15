
import fs from "fs";
import { City } from "../types/index.js";

// TO-DO: Define a City class with name and id properties

// TO-DO: Complete the HistoryService class
class HistoryService {
  private readonly historyFilePath: string = './db/searchHistory.json';

  // TO-DO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    return JSON.parse(await fs.promises.readFile(this.historyFilePath, 'utf-8'))
  }
// return JSON.parse(await fs.promises.readFile(this.historyFilePath, 'utf-8'))
  // TO-DO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) : Promise<void> {
    await fs.writeFile(this.historyFilePath, JSON.stringify(cities), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
  
  // TO-DO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    const cities = await this.read();
    return cities;
  }
  
  // TO-DO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.read();
    if (cities.find((c) => c.name === city)) {
      return;
    }
    cities.push(new City({name: city}));
    this.write(cities);
  }
  
  // * BONUS TO-DO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.read();
    await this.write(cities.filter((c) => c.id !== id));
  }
}

export default new HistoryService();
