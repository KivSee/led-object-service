import express from 'express';
import { updateSegmentsMap, getSegmentsMap } from '../handler';
import { SegmentsMapConfig } from '../proto/segments';

export const ledObjectRouter = express.Router();

ledObjectRouter.put('/:thingName', async (req, res) => {
    const segmentsMap = req.body as SegmentsMapConfig;
    const thingName = req.params.thingName;
    updateSegmentsMap(thingName, segmentsMap);
    res.sendStatus(200);
});

ledObjectRouter.get('/:thingName', async (req, res) => {
    const thingName = req.params.thingName;
    const acceptContentType = req.headers.accept;

    const segmentsMap = await getSegmentsMap(thingName);
    res.setHeader('etag', segmentsMap.guid.toString());

    if(acceptContentType === 'application/x-protobuf') {
        const bytes = SegmentsMapConfig.encode(segmentsMap).finish();
        res.setHeader('content-type', 'application/x-protobuf');
        res.send(bytes);
    } else if(!acceptContentType || acceptContentType === 'application/json'  || acceptContentType === '*/*') {
        res.json(segmentsMap);
    } else {
        res.status(415).send(`unsupported type '${acceptContentType}'`);
    }
});
