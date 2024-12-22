import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_AUTH_VALIDATION_SCHEMA } from './utils/env-auth.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: ENV_AUTH_VALIDATION_SCHEMA,
      isGlobal: true,
    }),
  ],
})
export class EnvAuthModule {}
