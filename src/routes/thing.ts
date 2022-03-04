import express from 'express';
import pino from 'pino';
import { updateThingConfig, getSegmentsMap } from '../handler';
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
  next();
};

thingsRouter.put(
  '/:thingName',
  validateThingNameMiddleware,
  async (req: express.Request, res: express.Response) => {
    try {
      const thingConfig = req.body as Thing;
      const thingName = req.params.thingName;

      // temporary, calculate the relative pos for each pixel
      thingConfig.segments.forEach(segment => {
        const totalPixels = segment.pixels.length;
        if (totalPixels <= 0) {
          return;
        }
        if (totalPixels === 1) {
          // we only have one pixel in the segment. cannot calculate relative pos
          segment.pixels[0].relPos = 0.5;
          return;
        }

        segment.pixels.forEach((pixel, index) => {
          pixel.relPos = index / (totalPixels - 1);
        });
      });

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
    const segmentsMap = await getSegmentsMap(thingName);
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
