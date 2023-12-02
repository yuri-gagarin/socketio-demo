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
const socketIOInstance = new SocketServer<ClientToServerEvents, ServerToClientEvents>(server, { cors: { origin: "http://localhost:3000"} });

const socketIDs: string[] = [];

socketIOInstance.on("connection",(socket) => {
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
  socket.on("sendNewNessage", (data) => {
    socketIOInstance.to(data.receiverSocketId).emit("receiveNewMessage", data);
  });
  socket.on("sendMsgReceived", (data) => {
    socketIOInstance.to(data.sentFromSocketId).emit("confirmReceivedMsg", data);
  });
  socket.on("sendReadReceipt", (data) => {
    socket.to(data.sendToSocketId).emit("receiveReadReceipt", data);
  });
  socket.on("sendJoinRoom", async (data) => {
    const { clientSocketId, roomId } = data;
    socket.join(roomId);
    if (socketIOInstance.sockets.adapter.rooms.get(roomId)) {
      const roomSize = socketIOInstance.sockets.adapter.rooms.get(roomId)!.size;
      socketIOInstance.to(clientSocketId).emit(
        "roomJoinSuccess", 
        { 
          message: "Room joined", 
          roomId,
          clientSocketId, 
          roomSize,
          errors: null
        }
      );
    } else {
      const errors = [`Room name ${data.roomId} could not be resolved`, "Room not joined"];
      socketIOInstance.to(data.clientSocketId).emit(
        "roomJoinFailure",
        {
          message: "Room not joined",
          roomId,
          clientSocketId,
          roomSize: 0,
          errors
        }
      );
    }
  });
});

/*
socketIOInstance.on("dd", (data) => {
  socketIOInstance.to(data.receiverSocketId).emit("sendMsgToClient", data);
});
socketIOInstance.on("", (data) => {
  socketIOInstance.to(data.sentFromSocketId).emit("confirmReceivedMsg", data);
});
*/
// set up routes //

app.use(combineRoutes(router));

const PORT: number = Number(process.env.PORT) || 8000;

server.listen(PORT, () => {

  console.log("Listening on port: " + process.env.PORT);
});