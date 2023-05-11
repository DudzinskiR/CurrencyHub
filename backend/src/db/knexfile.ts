import Knex from 'knex';
import { config } from 'dotenv'
import path from 'path';
config({path: `${__dirname}/../../.env`});

type DbEnvironments = 'development' | 'production' | 'test';

const knexfile: Record<DbEnvironments, any> = {
  test: {
    client: "better-sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds")
    }
  },
  development: {
    client: 'postgresql',
    connection: {
      host:     `${process.env.DEV_DB_HOST}`,
      database: `${process.env.DEV_DB_DATABASE}`,
      user:     `${process.env.DEV_DB_USER}`,
      password: `${process.env.DEV_DB_PASSWORD}`
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host:     `${process.env.DB_HOST}`,
      database: `${process.env.DB_DATABASE}`,
      user:     `${process.env.DB_USER}`,
      password: `${process.env.DB_PASSWORD}`,
      ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}

export default knexfile;