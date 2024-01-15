import { ConfigModuleOptions } from '@nestjs/config';
import * as joi from 'joi';

export const envOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  isGlobal: true,
  cache: true,
  validationSchema: joi.object({
    DATABASE_URL: joi.string().required(),
    PORT: joi.number().port().required(),
    JWT_SECRET: joi.string().required(),
  }),
};
