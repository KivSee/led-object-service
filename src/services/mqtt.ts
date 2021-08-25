import mqtt from 'mqtt';
import {BROKER_URL} from '../config';
import pino from 'pino';

const logger = pino({name: 'mqtt service'});

const client = mqtt.connect(BROKER_URL);
client.on('connect', () => {
  logger.info('connected to mqtt server', {BROKER_URL});
});
client.on('error', err => {
  logger.error('error on mqtt broker connection', {err});
});

const mqttTopic = (thingName: string): string => `obj/${thingName}/guid`;

export const sendToMqtt = async (
  thingName: string,
  payload: string | Buffer
) => {
  client.publish(mqttTopic(thingName), payload, {
    qos: 1,
  });
};

export const isConnected = () => client.connected;
