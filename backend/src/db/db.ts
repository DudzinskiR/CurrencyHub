import knex, { Knex } from 'knex';
import knexfile from './knexfile';

let db: Knex<any, unknown[]> | null = null;

if(process.env.NODE_ENV === 'test'){
  db = knex(knexfile.test);
} else {
  db = knex(knexfile.development);
}

export default db!;