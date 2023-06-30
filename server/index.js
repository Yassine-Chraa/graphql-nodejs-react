import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connect } from "./config/DBConnection.js";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/index.js";

connect()

const app = express();
app
  .use(bodyParser.json({ limit: "30mb", extended: true }))
  .use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
  .use(cors())
  .use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
  );

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on ${PORT} in ${process.env.NODE_ENV} mode...`)
);
