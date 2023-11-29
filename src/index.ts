import express, { Router } from "express";
import HTTP from "http";
import { Server as SocketServer } from "socket.io";
// .env variables //
import dotenv from "dotenv";
dotenv.config();
import { combineRoutes } from "./routes/combineRoutes.js";
// Express App and Router //
const app = express();
const router = Router();
// SocketIO setup //
const server = HTTP.createServer(app);
const socketIOInstance = new SocketServer(server, { cors: { origin: "http://localhost:3000"} });

socketIOInstance.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket);
})
//
// set up routes //

router.get("/s", (req, res) => {
  return res.status(200).json("ok")
});
app.use(combineRoutes(router));

const PORT: number = Number(process.env.PORT) || 8000;

server.listen(PORT, () => {

  console.log("Listening on port: " + process.env.PORT);
});