import './instrument';
import express from 'express';
import displayRoutes from 'express-routemap';
import cors from 'cors';

import './services/mqtt';
import { SERVER_PORT } from './config';
import { thingsRouter } from './routes';
import pino from 'pino';
import httpLogger from 'pino-http';

const logger = pino();

const app = express();
app.use(httpLogger());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/thing', thingsRouter);
app.use('/health-check', (_req, res) => {
  res.sendStatus(200);
});

app.listen(SERVER_PORT, () => {
  logger.info(`server started on port ${SERVER_PORT}`);
  displayRoutes(app);
});

if (process.env.NODE_ENV?.includes('dev')) {
  try {
    const displayRoutes = require('express-routemap'); // eslint-disable-line node/no-unpublished-require
    displayRoutes(app);
  } catch (err) {
    logger.err('failed to print express route map', err);
  }
}
