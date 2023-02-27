import express from 'express';
import pino from 'pino';
import { updateThingConfig, getThingConfig, getThingNames } from '../handler';
import { ThingSegments } from '../proto/segments';
import { Thing } from '../types';

const logger = pino({ name: 'routes' });

export const thingsRouter = express.Router();

const validateThingNameMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const thingConfig = req.body as Thing;
  const thingName = req.params.thingName;
  const thingNameInBody = thingConfig.thingName;
  if (thingNameInBody && thingNameInBody !== thingName) {
    return res
      .status(400)
      .send(
        `thing name in route "${thingName}" is different from value in body ${thingConfig.thingName}`
      );
  }
  thingConfig.thingName = thingName;
  next();
};

thingsRouter.put(
  '/:thingName',
  validateThingNameMiddleware,
  async (req: express.Request, res: express.Response) => {
    try {
      const thingConfig = req.body as Thing;
      const thingName = req.params.thingName;
      await updateThingConfig(thingName, thingConfig);
      res.sendStatus(200);
    } catch {
      res.sendStatus(500);
    }
  }
);

thingsRouter.get('/:thingName', async (req, res) => {
  const thingName = req.params.thingName;
  const acceptContentType = req.headers.accept;

  try {
    const segmentsMap = await getThingConfig(thingName);
    res.setHeader('etag', segmentsMap.guid.toString());

    if (acceptContentType === 'application/x-protobuf') {
      const bytes = ThingSegments.encode(segmentsMap).finish();
      res.setHeader('content-type', 'application/x-protobuf');
      res.send(bytes);
    } else if (
      !acceptContentType ||
      acceptContentType === 'application/json' ||
      acceptContentType === '*/*'
    ) {
      res.json(segmentsMap);
    } else {
      res.status(415).send(`unsupported type '${acceptContentType}'`);
    }
  } catch (err: any) {
    logger.error(err);
    res.sendStatus(404);
  }
});

thingsRouter.get('', async (req: express.Request, res: express.Response) => {
  try {
    const thingNames = await getThingNames();
    const thingWithConfig = await Promise.all(thingNames.map(async (thingName) => {
      const fullConfig = await getThingConfig(thingName);
      const slimConfig = { ...fullConfig, segments: fullConfig.segments.map(segment => ({ name: segment.name}))};
      return [thingName, slimConfig]
    }));
    res.json(Object.fromEntries(new Map(thingWithConfig as [string, unknown][])));
  } catch (err: any) {
    logger.error(err);
    res.sendStatus(500);
  }

});