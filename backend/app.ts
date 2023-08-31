import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import roomRoute from './routes/roomRoute'

dotenv.config();

// database
import './db'

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


//Setup Cross Origin
app.use(cors({
  origin: ["http://localhost:2000", "http://localhost:3000"],
  credentials: true
}));
app.use('/rooms', roomRoute)

export default app