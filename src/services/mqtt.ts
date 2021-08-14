import mqtt from 'mqtt';
import { BROKER_URL } from '../config';

const client = mqtt.connect(BROKER_URL);
client.on('connect', () => {
});

const mqttTopic = (thingName: string): string => `obj/${thingName}/guid`;

export const sendToMqtt = async (thingName: string, payload: string | Buffer) => {
    client.publish(mqttTopic(thingName), payload, {
        qos: 1,
        retain: true,
    });
}

export const isConnected = () => client.connected;
