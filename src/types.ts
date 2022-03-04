import { ThingSegments } from "./proto/segments";

export interface Thing extends ThingSegments {
    thingName: string;
}

