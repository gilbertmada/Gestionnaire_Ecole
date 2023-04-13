import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import config from 'config';
import { User } from "./entity/User";
import cors from "cors";
import routes from "./routes";
import { createConnection } from 'typeorm';
import * as bodyParser from "body-parser";
// import helmet from 'helmet';
require('dotenv').config();

const app = express()


const mongoURI: string = process.env.MONGO_URI || config.get("mongoDBURI");
// const mongoURI: string = "mongodb://localhost:27017/admin"
const port = process.env.PORT;
// const port = 4000;
console.log("MongoURI....", mongoURI);
console.log("Port....", port);


app.use(
  cors(
    {
      allowedHeaders: "*",
      exposedHeaders: "*",
      origin: "*",
      // origin: "http://localhost:3000/",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
    }
  )
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

mongoose.
  connect(mongoURI,
   /* {
      bufferCommands: false,
      autoCreate: true
    } */
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

const server = app.listen(port || 3009, () => {
  console.log(`Server started on port ${port || 3009}!`);
});

export default server;

