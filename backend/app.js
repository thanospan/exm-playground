import dotenv from 'dotenv';
import express from 'express';
import { devicesRouter } from './routes/devices.js';

dotenv.config({ path: './config/.env' });
const app = express();

app.use(express.json());

app.use('/devices', devicesRouter);

const { BACKEND_PORT } = process.env;

app.listen(BACKEND_PORT, () => {
  console.log(`Backend listening on port ${BACKEND_PORT}`);
});
