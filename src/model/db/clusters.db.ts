import { ErrorException } from 'src/error_handler/error-exception';
import { Cluster } from '../interface/ICluster';
import { pool } from '../postgres-connect';

export const clustersDB: any = {};

// get clusters
clustersDB.getClusters = async () => {
  try {
    const { rows } = await pool.query(`
    SELECT * 
    FROM clusters
    `);

    return rows;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};

// create one cluster
clustersDB.createOne = async (cluster: Cluster) => {
  try {
    const { rows } = await pool.query(`
    INSERT INTO clusters
    VALUES ('${cluster.name}', '${cluster.postcode}')
    `);

    return rows;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};

// update a cluster
clustersDB.updateOne = async (cluster: Cluster) => {
  try {
    const { rows } = await pool.query(`
      UPDATE clusters
      SET 
        name = '${cluster.name}',
        postcode = '${cluster.postcode}'
      WHERE name = '${cluster.name}'
      `);
    return rows;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};

// update one row of cluster
clustersDB.updateOne = async (cluster: Cluster) => {
  try {
    const { rows } = await pool.query(`
      UPDATE clusters
      SET 
        name = '${cluster.name}',
        postcode = '${cluster.postcode}'
      WHERE name = '${cluster.name}'
      `);
    return rows;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};

//delete a cluster
clustersDB.deleteOne = async (clusterName: string) => {
  try {
    const { rows } = await pool.query(`
        DELETE FROM clusters 
        WHERE name = '${clusterName}'
        `);
    return rows;
  } catch (error) {
    throw new Error(`'Database Error', ${error}`);
  }
};
