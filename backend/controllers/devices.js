export const create = async (req, res, next) => {
  try {
    const {
      THINGSBOARD_API_HOST,
      JWT,
      WEATHER_STATION_DEV_KEY,
      WEATHER_STATION_DEV_SECRET
    } = process.env;

    const provisionEndpoint = THINGSBOARD_API_HOST + '/api/v1/provision';

    const platformReqHeaders = {
      'X-Authorization': `${JWT}`,
      'Content-Type': 'application/json'
    };

    const platformReqBody = {
      deviceName: req.body.name,
      provisionDeviceKey: `${WEATHER_STATION_DEV_KEY}`,
      provisionDeviceSecret: `${WEATHER_STATION_DEV_SECRET}`
    };
    
    const platformResponse = await fetch(provisionEndpoint, {
      method: 'POST',
      headers: platformReqHeaders,
      body: JSON.stringify(platformReqBody)
    });

    const platformResponseData = await platformResponse.json();

    console.log(platformResponseData);
    res.status(platformResponse.status).json(platformResponseData);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
