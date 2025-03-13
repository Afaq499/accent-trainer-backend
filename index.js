import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import "./config/database.js";
import ApplyMiddlewares from "./middlewares/index.js";
import router from "./routes/index.js";

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: '*' }));

ApplyMiddlewares(app);
app.get("/", (req, res) => {
  res.send("server is runing");
});

app.use("/v1", router);

httpServer.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
