import express from 'express';

import { SERVER_PORT } from './config';
import { ledObjectRouter } from './routes';
const app = express();
app.use(express.json());
app.use('/led-object', ledObjectRouter);
app.use('/health-check', (_req, res) => {
    res.sendStatus(200);
});

app.listen(SERVER_PORT, () => console.log(`server started on port ${SERVER_PORT}`))

if(process.env.NODE_ENV?.includes('dev')) {
    try {
        const displayRoutes = require('express-routemap');
        displayRoutes(app);    
    } catch {}
}