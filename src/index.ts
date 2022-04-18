import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './router/user-router';
import markerRouter from './router/marker-router';
import layerRouter from './router/layer-router';
import { errorsMiddleware } from './middleware/errors-middleware';
import fileRouter from './router/file-router';

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api', userRouter, markerRouter, layerRouter, fileRouter);
app.use(errorsMiddleware);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || '');
    app.listen(PORT, () => console.log(`Server started on PORT - ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
