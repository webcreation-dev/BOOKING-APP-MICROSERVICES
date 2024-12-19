import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATASOURCE_URL,
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}', // Entités du microservice auth
  ],
  migrations: [
    __dirname + '/../../../../libs/common/src/migrations/*{.ts,.js}',
  ],
  cli: {
    migrationsDir: 'src/migrations',
  },
});

export default dataSource;
