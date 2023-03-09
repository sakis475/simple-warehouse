import { pool } from '../src/model/postgres-connect';

import { promises as fs } from 'fs';

export const resetDatabase = async () => {
  const databaseName =
    process.env.NODE_ENV === 'test'
      ? JSON.parse(process.env.TEST_POSTGRES!).database
      : JSON.parse(process.env.POSTGRES!).database;

  console.log('recreating database: ', databaseName);

  const recreate_sql_script = await fs.readFile(
    './scripts/reCreateTables_dbs.sql',
    'utf8'
  );

  try {
    await pool.query(recreate_sql_script);
    console.log('recreated database: ', databaseName);
  } catch (error) {
    throw new Error(
      `'Error in Recreation of database, ${databaseName}', ${error}`
    );
  }
};
