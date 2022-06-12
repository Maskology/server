import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors"
import route from "./routes";
import { LoggingBunyan } from "@google-cloud/logging-bunyan";
import bunyan from "bunyan";

try {
  dotenv.config();

  const app: Application = express();
  const port = process.env.PORT;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors())

  app.use("/", route);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
} catch (error) {
  const lb = new LoggingBunyan();
  const logger = bunyan.createLogger({
    name: "maskology",
    streams: [{ stream: process.stdout, level: "info" }, lb.stream("info")],
  });
  logger.error(error);
}
