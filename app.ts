import express, { Application } from "express";
import dotenv from "dotenv";
import route from "./routes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT;

app.use("/", route);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
