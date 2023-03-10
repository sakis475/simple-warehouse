import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { Request, Response } from 'express';
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

app.use(
  '/',
  express.static(__dirname + '/front_build/skroutz-warehouse-front')
);
//send angular app
app.get(['/', '/home'], (req: Request, res: Response) => {
  res.sendFile('index.html', {
    root: __dirname + '/front_build/skroutz-warehouse-front'
  });
});

app.use('/v1', apiEndpoints);

//express custom error handler
app.use(errorHandler);
