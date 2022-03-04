import { ThingSegments } from '../proto/segments';
import { createStorageBackend } from '../services/storage';
import hash from 'object-hash';
import pino from 'pino';
import { sendToMqtt } from '../services/mqtt';
import { Thing } from '../types';

const storage = createStorageBackend();
const logger = pino({ name: 'led object handler' });

export const updateThingConfig = async (
  thingName: string,
  thingConfig: Thing
) => {
  const guid = parseInt(hash.sha1(thingConfig).substring(0, 8), 16);
  thingConfig.guid = guid;
  logger.info('creating or updating led object', { guid, thingName });
  await storage.upsert(thingName, thingConfig);
  sendToMqtt(thingName, JSON.stringify({ guid }));
};

export const getThingConfig = async (
  thingName: string
): Promise<Thing> => {
  return await storage.read(thingName);
};

export const getThingNames = async (): Promise<string[]> => {
  return await storage.getAllThingNames();
}