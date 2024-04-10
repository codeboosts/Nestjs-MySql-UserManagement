import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const ormConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'auth',
  entities: ['dist/**/entities/*.entity.js'],
  migrations: [`dist/database/migrations/*.js`],
};
console.log(ormConfig);

const datasource = new DataSource({ ...ormConfig });

export default datasource;
