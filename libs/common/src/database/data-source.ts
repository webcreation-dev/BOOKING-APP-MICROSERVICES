import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

// Charger et étendre les variables d'environnement
dotenvExpand.expand(dotenv.config());

// Créer une nouvelle instance de DataSource
const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATASOURCE_URL, // Assurez-vous que la variable d'environnement est bien définie
  entities: ['dist/apps/**/src/users/entities/*.entity{.ts,.js}'],
  migrations: ['dist/libs/common/src/migrations/*{.ts,.js}'],
});

export default dataSource;
