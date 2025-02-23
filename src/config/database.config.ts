/* eslint-disable prettier/prettier */
// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';


// POSTGRES CONFIG
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST || 'postgres',
//   port: +process.env.DB_PORT || 5432,
//   username: process.env.DB_USERNAME || 'postgres',
//   password: process.env.DB_PASSWORD || 'postgres',
//   database: process.env.DB_NAME || 'postgres',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: true,
// };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type:'sqlite',
  database: 'groupgo_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true
}