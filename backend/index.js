import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./router/index.js";
import cors from 'cors';
import 'dotenv/config';

const { MONGOURL, PORT } = process.env;

const app = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('public/data/uploads'));

app.use(cookieParser());

app.use('/', router());

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('Api connected to database');

    app.listen(PORT, () => {
      console.log(`Api is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });