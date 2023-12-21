import express, { Router } from "express";
import HTTP from "http";
import { Server as SocketServer } from "socket.io";
// .env variables //
import dotenv from "dotenv";
dotenv.config();
import { combineRoutes } from "./routes/combineRoutes.js";
import type { ClientToServerEvents, ServerToClientEvents, RoomData } from "./types/socketTypes.js";
import { checkNewRoom, updateRoomData } from "./helpers/dataHelpers.js";
// Express App and Router //
const app = express();
const router = Router();
// SocketIO setup //
const server = HTTP.createServer(app);
const socketIOInstance = new SocketServer<ClientToServerEvents, ServerToClientEvents>(server, { cors: { origin: "http://localhost:3000"} });

let connectedSockets: string[] = [];
let numOfConnections: number = 0;

let activeRooms: RoomData[] = []; //  what potential problems are there with this approach ? 

socketIOInstance.on("connection",(socket) => {
  const { id: userSocketId } = socket;
  connectedSockets.push(userSocketId);
  numOfConnections += 1;
  socketIOInstance.emit(
    "newUserConnected", 
    { 
      message: "A new user connected", 
      userSocketId, 
      connectedSockets, 
      numOfConnections 
    }
  );
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

  // room functionality //
  socket.on("sendJoinRoom", async (data) => {
    const { clientSocketId, roomId } = data;
    socket.join(roomId);
    if (socketIOInstance.sockets.adapter.rooms.get(roomId)) {
      if (checkNewRoom({ roomId, activeRooms })) {
        let newRoomData: RoomData = {
          roomId, 
          startedBy: clientSocketId, 
          connectedSockets: [ clientSocketId ], 
          numOfUsers: 0, 
          messages: [],
          private: false
        }
        activeRooms.push(newRoomData);
      } else {
        activeRooms = activeRooms.map((roomData) => {
          if (roomData.roomId === roomId) {
            return {
              ...roomData,
              connectedSockets: [ ...roomData.connectedSockets, clientSocketId ],
              numOfUsers: roomData.numOfUsers + 1,
            }
          } else {
            return roomData;
          }
        });
      }
      const roomSize = socketIOInstance.sockets.adapter.rooms.get(roomId)?.size || 0;
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

  socket.on("disconnecting", () => {
    socket.rooms.forEach((roomId) => {
      updateRoomData({ roomId, activeRooms, socketId: socket.id });
    });
  })
  socket.on("disconnect", (data) => {
    console.log("Socket disconnection");
    console.log(data);
    const { id: userSocketId } = socket;
    connectedSockets = connectedSockets.filter((id) => id !== userSocketId);
    numOfConnections -= 1;
    socketIOInstance.emit(
      "userDisconnected", 
      { 
        message: "User disconnected", 
        userSocketId,
        connectedSockets,
        numOfConnections 
      }
    );
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