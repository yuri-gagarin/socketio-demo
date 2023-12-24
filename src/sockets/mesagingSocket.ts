import HTTP from "http";
import { Server as SocketServer } from "socket.io";
// helpers //
import { checkNewRoom, updateRoomData } from "../helpers/dataHelpers.js";
// types //
import type { ClientToServerEvents, ServerToClientEvents } from "../types/socketTypes.js";
import type { DetailedRoomData, GeneralRoomData, MsgStorageData } from "../types/dataTypes.js";

// SocketIO setup //

let connectedSockets: string[] = [];
let numOfConnections: number = 0;

let activeRooms: GeneralRoomData[] = [];    //  what potential problems are there with this approach ? //
let activeMessages: MsgStorageData[] = [];  // again what are potential long term problems here ? //

export const initMessagingSocketIO = (server: HTTP.Server): void => {

  const socketIOInstance = new SocketServer<ClientToServerEvents, ServerToClientEvents>(server, { cors: { origin: "http://localhost:3000"} });

  // New connection listener //
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

    // new messge listener //
    socket.on("sendNewNessage", (data) => {
      socketIOInstance.to(data.receiverSocketId).emit("receiveNewMessage", data);
    });
    // received message listener //
    socket.on("sendMsgReceived", (data) => {
      socketIOInstance.to(data.sentFromSocketId).emit("confirmReceivedMsg", data);
    });
    socket.on("sendReadReceipt", (data) => {
      socket.to(data.sendToSocketId).emit("receiveReadReceipt", data);
    });

    // room functionality //
    // if joins a new room it gets created //
    // if an existing room is joined then its updated and populated //
    socket.on("sendJoinRoom", async (data) => {
      const { clientSocketId, roomId } = data;
      try {
        let roomDetails: DetailedRoomData;
        await socket.join(roomId);

        if (checkNewRoom({ roomId, activeRooms })) {
          let newRoomData: GeneralRoomData = {
            roomId, startedBy: clientSocketId, numOfUsers: 1, private: false 
          }
          roomDetails = {
            ...newRoomData,
            respnseMsg: "Room created",
            connectedSocketIds: [ clientSocketId ], 
            messages: [],
          }
          activeRooms.push(newRoomData);
        } else {
          let roomIndex: number = activeRooms.map((data => data.roomId)).indexOf(roomId);
          activeRooms = activeRooms.map((roomData) => {
            return roomData.roomId === roomId ? { ...roomData, numOfUsers: roomData.numOfUsers + 1 } : roomData;
          });
          const connectedSocketIds: string[] = (await socketIOInstance.in(roomId).fetchSockets()).map((data) => data.id);
          roomDetails = {
            ...activeRooms[roomIndex],
            respnseMsg: "Joined Room",
            connectedSocketIds,
            messages: [] // need to update later //
          }
        }
        socketIOInstance.to(clientSocketId).emit("roomJoinSuccess", roomDetails);
      } catch (error) {
        const errors = [`Room name ${data.roomId} could not be resolved`, "Room not joined"];
        socketIOInstance.to(data.clientSocketId).emit(
          "roomJoinFailure",
          {
            respnseMsg: "Room not joined",
            roomId,
            startedBy: "",
            connectedSocketIds: [],
            numOfUsers: 0,
            messages: [],
            private: false,
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
}

