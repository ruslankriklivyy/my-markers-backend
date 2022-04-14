import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './router';
import { errorsMiddleware } from './middleware/errors-middleware';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
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
