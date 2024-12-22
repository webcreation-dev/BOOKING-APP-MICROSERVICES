import * as Joi from 'joi';

export const ENV_AUTH_VALIDATION_SCHEMA = Joi.object({
  JWT_SECRET: Joi.required(),
  JWT_TTL: Joi.required(),
  // OTP_APP_ID: Joi.required(),
  // OTP_AUTH_KEY: Joi.required(),
  // OTP_API_URL: Joi.required(),
});
