import { ErrorException } from 'src/error_handler/error-exception';
import { Driver } from '../interface/IDriver';
import { pool } from '../postgres-connect';

export const driversDB: any = {};

// get drivers
driversDB.getDrivers = async () => {
  try {
    const { rows } = await pool.query(`
    SELECT * 
    FROM drivers
    `);

    return rows;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};

// create one driver
driversDB.createOne = async (driver: Driver) => {
  try {
    const { rows } = await pool.query(`
    INSERT INTO drivers
    VALUES ('${driver.name}', '${driver.cluster}')
    `);

    return rows;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};

// update a driver
driversDB.updateOne = async (driver: any) => {
  try {
    const { rows } = await pool.query(`
      UPDATE drivers
      SET 
        name = '${driver.newName}',
        cluster = '${driver.cluster}'
      WHERE name = '${driver.name}'
      `);
    return rows;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};

//delete a driver
driversDB.deleteOne = async (driverName: string) => {
  try {
    const { rows } = await pool.query(`
        DELETE FROM drivers 
        WHERE name = '${driverName}'
        `);
    return rows;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};
