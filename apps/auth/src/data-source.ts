import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATASOURCE_URL,
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}', // Entités du microservice auth
    __dirname + '/../../../libs/common/src/**/*.entity{.ts,.js}', // Entités de la librairie commune
  ],
  migrations: [
    __dirname + '/../../../../libs/common/src/migrations/*{.ts,.js}',
  ],
});

export default dataSource;
