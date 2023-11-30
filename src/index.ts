import express, { Router } from "express";
import HTTP from "http";
import { Server as SocketServer } from "socket.io";
// .env variables //
import dotenv from "dotenv";
dotenv.config();
import { combineRoutes } from "./routes/combineRoutes.js";
import type { ClientToServerEvents, ServerToClientEvents } from "./types/socketTypes.js";
// Express App and Router //
const app = express();
const router = Router();
// SocketIO setup //
const server = HTTP.createServer(app);
const socketIOInstance = new SocketServer<ClientToServerEvents, ServerToClientEvents, any>(server, { cors: { origin: "http://localhost:3000"} });

const socketIDs: string[] = [];

enum SocketListeners {
  NewMessage = "NEW_MESSAGE",
  MessageReceived = "MESSAGE_RECEIVED"
}
enum SocketEmitters {
  NewUserConnected = "NEW_USER_CONNECTED",
  SendMsgToClient = "SEND_MSG_TO_CLIENT",
  ConfirmReceivedMsg = "CONFIRM_RECEIVED_MSG"
}


socketIOInstance.on("connection", (socket) => {
  socketIDs.push(socket.id);
  socketIOInstance.emit(
    "newUserConnected", 
    { 
      userSocketId: socket.id,
      message: "A new user connected", 
      connectedSockets: socketIDs,
      numOfConnections: socketIDs.length,
    });
  //
});

socketIOInstance.on("", (data: NewMessageData) => {
  socketIOInstance.to(data.receiverSocketId).emit(SocketEmitters.SendMsgToClient, data);
});
socketIOInstance.on(SocketListeners.NewMessage, (data: MsgReceivedData) => {
  socketIOInstance.to(data.sentFromSocketId).emit(SocketEmitters.ConfirmReceivedMsg, data);
});
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