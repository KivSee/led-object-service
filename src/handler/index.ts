import { SegmentsMapConfig } from "../proto/segments";
import { createStorageBackaend } from "../services/storage";
import { sendToMqtt } from '../services/mqtt';

const storage = createStorageBackaend();

export const updateSegmentsMap = async (thingName: string, segmentsMap: SegmentsMapConfig) => {
    await storage.upsert(thingName, segmentsMap);
    // sendToMqtt(thingName, segmentsMap.guid);
}

export const getSegmentsMap = async (thingName: string): Promise<SegmentsMapConfig> => {
    return await storage.read(thingName);
}
