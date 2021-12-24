import './instrument';
import express from 'express';

import './services/mqtt';
import { SERVER_PORT } from './config';
import { ledObjectRouter } from './routes';
import pino from 'pino';
import httpLogger from 'pino-http';

const logger = pino();

const app = express();
app.use(httpLogger());
app.use(express.json());
app.use('/led-object', ledObjectRouter);
app.use('/health-check', (_req, res) => {
  res.sendStatus(200);
});

app.listen(SERVER_PORT, () =>
  logger.info(`server started on port ${SERVER_PORT}`)
);

if (process.env.NODE_ENV?.includes('dev')) {
  try {
    const displayRoutes = require('express-routemap'); // eslint-disable-line node/no-unpublished-require
    displayRoutes(app);
  } catch (err) {
    logger.err('failed to print express route map', err);
  }
}
