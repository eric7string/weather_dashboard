export class Weather {
  public city: string = '';
  public date: string = '';
  public icon: string = '';
  public iconDescription: string = '';
  public tempF: number = 0;
  public humidity: number = 0;
  public windSpeed: number = 0;

  constructor(init?: Partial<Weather>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}