import { User } from '../interface/IUser';
import { pool } from '../postgres-connect';

export const usersDB: any = {};

// get a user
usersDB.getUser = async (user: string) => {
  try {
    const { rows } = await pool.query(`
    SELECT * 
    FROM users 
    WHERE name = '${user}'
    `);

    return rows;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};

// create one user
usersDB.createOne = async (user: User) => {
  try {
    const { rows } = await pool.query(`
    INSERT INTO users
    VALUES ('${user._id}', '${user.name}', '${user.password}')
    `);

    return user;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};
