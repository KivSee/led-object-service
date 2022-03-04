import { Thing } from '../../types';

export interface Storage {
  upsert: (name: string, segmentsMap: Thing) => Promise<void>;
  read: (thingName: string) => Promise<Thing>;
  getAllThingNames: () => Promise<string[]>;
}
