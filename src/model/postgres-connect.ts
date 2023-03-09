import { Pool, PoolConfig } from 'pg';

export const connect = () => {
  const poolConfig =
    process.env.NODE_ENV === 'test'
      ? JSON.parse(process.env.TEST_POSTGRES!)
      : JSON.parse(process.env.POSTGRES!);

  return new Pool(poolConfig);
};

export const pool = connect();
