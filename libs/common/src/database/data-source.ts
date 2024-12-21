import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATASOURCE_URL,
  entities: ['dist/apps/**/src/users/entities/*.entity.js'],
  migrations: ['dist/libs/common/src/database/migrations/*.js'],
});

export default dataSource;
