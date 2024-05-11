import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const { BACKEND_HOST, BACKEND_PORT } = process.env;

const createDevice = async () => {
  try {
    const uri = `http://${BACKEND_HOST}:${BACKEND_PORT}/devices`;

    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      name: "Weather Station 1",
      type: "Weather Station"
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

const uploadTelemetry = async (entityId) => {
  try {
    const uri = `http://${BACKEND_HOST}:${BACKEND_PORT}/devices/${entityId}/timeseries`;

    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "ts": 1648919852000,
      "values": {
        "temperature": 18.29999924,
        "humidity": 52,
        "pressure": 1008.74939,
        "wind_speed": 0.128800005,
        "wind_gust": 0.50999999,
        "wind_direction": 80
      }
    };
    
    const response = await fetch(uri, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const createDeviceResponse = await createDevice();
console.log(createDeviceResponse);

const uploadTelemetryResponse = await uploadTelemetry(createDeviceResponse.response.id.id);
console.log(uploadTelemetryResponse);
