import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import path from 'path';

import '../../container';

import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { connect as mongoDBConnect } from '../mongodb/database';
import { container } from 'tsyringe';

mongoDBConnect().then(async () => {
  console.log('Database connected successful');
});

const publicPath = path.resolve(__dirname, '..', '..', '..', '..', 'public');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(publicPath));

app.use(routes);
app.use(errorHandler);

export { app };
