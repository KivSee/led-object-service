import {SegmentsMapConfig} from '../proto/segments';
import {createStorageBackend} from '../services/storage';
import hash from 'object-hash';
import pino from 'pino';
import {sendToMqtt} from '../services/mqtt';

const storage = createStorageBackend();
const logger = pino({name: 'led object handler'});

export const updateSegmentsMap = async (
  thingName: string,
  segmentsMap: SegmentsMapConfig
) => {
  const guid = parseInt(hash.sha1(segmentsMap).substr(0, 8), 16);
  segmentsMap.guid = guid;
  logger.info('creating or updating led object', {guid, thingName});
  await storage.upsert(thingName, segmentsMap);
  sendToMqtt(thingName, JSON.stringify({guid}));
};

export const getSegmentsMap = async (
  thingName: string
): Promise<SegmentsMapConfig> => {
  return await storage.read(thingName);
};
