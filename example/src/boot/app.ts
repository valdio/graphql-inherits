import express from "express";
import server from "./server";

const app: express.Application = express();

server(app);

export default app;
