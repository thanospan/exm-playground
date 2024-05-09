import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: './config/.env' });
const app = express();

const setup = () => {
  app.get('/', (req, res) => {
    res.send('Backend');
  });
};

const start = () => {
  const { BACKEND_PORT } = process.env;

  app.listen(BACKEND_PORT, () => {
    console.log(`Backend listening on port ${BACKEND_PORT}`);
  });
};

setup();
start();