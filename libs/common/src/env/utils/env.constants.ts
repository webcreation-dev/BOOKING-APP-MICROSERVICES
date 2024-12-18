import * as Joi from 'joi';

export const ENV_VALIDATION_SCHEMA = Joi.object({
  MONGODB_URI: Joi.required(),
});
