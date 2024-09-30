// backend/config/database.js
import { dbFile } from './index';

export const development = {
  storage: dbFile,
  dialect: "sqlite",
  seederStorage: "sequelize",
  logQueryParameters: true,
  typeValidation: true
};
export const production = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  seederStorage: 'sequelize',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    schema: process.env.SCHEMA
  }
};

