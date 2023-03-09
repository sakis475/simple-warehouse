import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { errorHandler } from './error_handler/error-handler';
import cors from 'cors';
import { apiEndpoints } from './routes/apiEndpoints';

export const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());

// CORS
// app.all('/*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.use('/v1', apiEndpoints);

//express custom error handler
app.use(errorHandler);
