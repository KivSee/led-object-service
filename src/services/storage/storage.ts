import { SegmentsMapConfig } from '../../proto/segments';

export interface Storage {
  upsert: (name: string, segmentsMap: SegmentsMapConfig) => Promise<void>;
  read: (thingName: string) => Promise<SegmentsMapConfig>;
  getAllThingNames: () => Promise<string[]>;
}
