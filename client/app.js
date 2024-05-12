import dotenv from 'dotenv';
import fs from 'fs';
import { parse } from 'csv-parse';
import { getRandomInt } from './utils/random.js';

dotenv.config({ path: './config/.env' });

const { BACKEND_HOST, BACKEND_PORT } = process.env;

const createDevice = async () => {
  try {
    const uri = `http://${BACKEND_HOST}:${BACKEND_PORT}/devices`;

    const headers = {
      'Content-Type': 'application/json'
    };

    const randomInt = getRandomInt(1, 1000);

    const body = {
      name: `Weather Station ${randomInt}`,
      type: 'Weather Station'
    };
    
    const response = await fetch(uri, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        status: 200,
        message: "Device created successfully",
        response: responseData
      }
    } else {
      return responseData;
    }
  } catch (error) {
    console.error(error);
  }
};

const waitMillis = async (millis) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return;
};

const sendMeasurements = async (entityId, measurements) => {
  const uri = `http://${BACKEND_HOST}:${BACKEND_PORT}/devices/${entityId}/timeseries`;
  const response = await fetch(uri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(measurements)
  });
  const responseData = await response.json();
  console.log(responseData);
};

const processFile = async (filepath, entityId) => {
  const records = [];

  const parser = fs
    .createReadStream(filepath)
    .pipe(parse({
      delimiter: ",",
      columns: true,
      skip_empty_lines: true
    }));
  
  for await (const record of parser) {
    const measurement = {
      ts: parseInt(record['timestamp']),
      values: record
    };
    delete measurement.values['timestamp'];
    records.push(measurement);

    // 3600000 milliseconds in 1 hour
    // 16000 milliseconds interval
    // 225 records in 1 hour
    if (records.length === 225) {
      await waitMillis(1000);
      await sendMeasurements(entityId, records);
      records.length = 0;
    }
  }
  return records;
};

(async () => {
  try {
    const createDeviceResponse = await createDevice();
    console.log(createDeviceResponse);
  
    await processFile('./data.csv', createDeviceResponse.response.id.id);
  } catch (error) {
    console.error(error);
  }
})();
