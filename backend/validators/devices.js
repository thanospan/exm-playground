export const validateName = (req, res, next) => {
  const { name } = req.body;
  let response;

  if (!name) {
    response = {
      status: 400,
      message: `Missing required body parameter 'name'`
    };
    console.log(response);
    res.status(response.status).json(response);
    return;
  }

  next();
};

export const validateType = (req, res, next) => {
  const { type } = req.body;
  let response;

  if (!type) {
    response = {
      status: 400,
      message: `Missing required body parameter 'type'`
    };
    console.log(response);
    res.status(response.status).json(response);
    return;
  }

  next();
};
