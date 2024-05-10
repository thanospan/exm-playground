export const create = async (req, res, next) => {
  try {
    const { THINGSBOARD_API_HOST, JWT, ACCESS_TOKEN } = process.env;

    const provisionDeviceUri = THINGSBOARD_API_HOST + `/api/device?accessToken=${ACCESS_TOKEN}`;

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
