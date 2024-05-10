import express from 'express';
import * as devicesController from '../controllers/devices.js';
import * as devicesValidator from '../validators/devices.js';

export const devicesRouter = express.Router();

devicesRouter.post('/',
  devicesValidator.validateName,
  devicesValidator.validateType,
  devicesController.create
);
