import { v4 as uuidv4 } from 'uuid';

export class City {
  id: string = uuidv4();
  name: string = '';
  constructor(init?: Partial<City>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
