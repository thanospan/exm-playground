import { generateAccessToken } from '../utils/random.js';

export const create = async (req, res, next) => {
  try {
    const { THINGSBOARD_API_HOST, JWT } = process.env;
    let { accessToken } = req.query;
    if (!accessToken) {
      accessToken = generateAccessToken(20);
    }

    const provisionDeviceUri = THINGSBOARD_API_HOST + `/api/device?accessToken=${accessToken}`;

    const platformReqHeaders = {
      'X-Authorization': `${JWT}`,
      'Content-Type': 'application/json'
    };

    const platformReqBody = {
      name: req.body.name,
      type: req.body.type
    };
    
    const platformResponse = await fetch(provisionDeviceUri, {
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

export const deleteById = async (req, res, next) => {
  try {
    const { THINGSBOARD_API_HOST, JWT } = process.env;
    const { entityId } = req.params;

    const deleteDeviceUri = THINGSBOARD_API_HOST + `/api/device/${entityId}`;

    const platformReqHeaders = {
      'X-Authorization': `${JWT}`,
      'Content-Type': 'application/json'
    };
    
    const platformResponse = await fetch(deleteDeviceUri, {
      method: 'DELETE',
      headers: platformReqHeaders
    });

    if (platformResponse.ok) {
      const response = {
        status: platformResponse.status,
        message: 'Device deleted successfully!'
      };
      console.log(await platformResponse);
      res.status(response.status).json(response);
      return;
    }

    const platformResponseData = await platformResponse.json();

    console.log(platformResponseData);
    res.status(platformResponse.status).json(platformResponseData);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
