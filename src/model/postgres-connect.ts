import { Pool, PoolConfig } from 'pg';

export const connect = (dbinfo: PoolConfig) => {
  return new Pool(dbinfo);
};

export const pool = connect(JSON.parse(process.env.POSTGRES!));
