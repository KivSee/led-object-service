import { ThingSegments } from '../../proto/segments';

export interface Storage {
  upsert: (name: string, segmentsMap: ThingSegments) => Promise<void>;
  read: (thingName: string) => Promise<ThingSegments>;
  getAllThingNames: () => Promise<string[]>;
}
