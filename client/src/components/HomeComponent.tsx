import React from "react";
import { Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
// 
import { io, Socket } from "socket.io-client";
//
import { ConnectionNav } from "./navs/ConnectionNav";
import { ConnectedRooms } from "./rooms/ConnectedRooms";
import { MessengerComponent } from "./messages/MessengerComponent";
import { RoomSelector } from "./rooms/RoomSelector";
import { UserBar } from "./UserBar";
// ts types and constants //
import type { IServerToClient, IClientToServer, NewConnectionData, MessageData } from "../types/socketTypes";
// helpers, mock data //
import { genMockUsers, getMockMessages } from "./helpers/mockData";

 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  //width: "100%",
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const clientConnected = (state: HomeComponentState): boolean => {
  return (state.mySocketId && state.socket && state.status === "connected") ? true : false;
}

interface IHomeComponentProps {
  // nothing yet //
}
type MessageState = {
  roomId: string;
  messages: MessageData[];
}
type HomeComponentState = {
  status: "connected" | "disconnected";
  mySocketId: string;
  socket: Socket<IServerToClient, IClientToServer> | null;
}
type UserConnState = {
  message: string;
  connectedUsers: string[];
  numOfConnections: number;
}

export const HomeComponent: React.FC<IHomeComponentProps> = (): JSX.Element => {
  // local state //
  const [ socketState, setSocketState ] = React.useState<HomeComponentState>({
    status: "disconnected",
    mySocketId: "",
    socket: null
  });
  const [ connectedUsers, setConnectedUsers ] = React.useState<UserConnState>({
    message: "", connectedUsers: [], numOfConnections: 0
  });

  // event handlers //
  // SocketIO connect and disconnect //
  const handleIOconnect = (): void => {
    const socket: Socket<IClientToServer, IServerToClient> = io("http://localhost:8000");
    if (socket.connected) {
      setSocketState({ status: "connected", mySocketId: socket.id, socket, });
    } else {
      console.log("not connected")
    }
  }
  const handleIODisconnect = (): void => {
    if (clientConnected(socketState)) {
      socketState.socket!.disconnect();
      setSocketState({
        status: "disconnected", mySocketId: "", socket: null
      });
    }
  }
  const handleJoinRoom = (roomId: string): void => {
    if (clientConnected(socketState)) {
      const clientSocketId = socketState.socket!.id;
      socketState.socket!.emit("sendJoinRoom", { roomId, clientSocketId });
    } else {
      // show connection error //
      console.log("not connected");
    }
  }
  const handleLeaveRoom = (roomId: string): void => {
    if (clientConnected(socketState)) {
      const { id: clientSocketId } = socketState.socket!;
      socketState.socket!.emit("sendLeaveRoom", { roomId, clientSocketId });
    } else {
      // show connection error //
      console.log("not connected");
    }
  }

  const handleReceiveNewMessage = (data: MessageData) => {
    
  }
  const handleNewUser = (data: NewConnectionData): void => {
    setConnectedUsers((prevState) => ({  
      message: data.message, connectedUsers: [ ...prevState.connectedUsers, data.userSocketId], numOfConnections: data.numOfConnections
    }));
  }
  

  // lifecycle methods //
  React.useEffect(() => {
    if (socketState.status === "connected" && socketState.socket) {
      socketState.socket.on("newUserConnected", handleNewUser);
    }

    return () => {
      cleanupSocketListeners(socketState);
    }
  }, [ socketState ]);

 
  return (
    <Grid container spacing={2}>
      <Grid item lg={12} sx={{ width: "100%"}}>
        <Item sx={{ border: "3px solid red" }}>
          <UserBar loggedInUsers={genMockUsers(25)} /> 
        </Item>
        <Item sx={{ border: "3px solid red", alignContent: "flex-start" }}>
          <ConnectionNav
            handleIOConnect={handleIOconnect}
            handleIODisconnect={handleIODisconnect}
          />
        </Item>
        <Item>
          <RoomSelector handleJoinRoom={handleJoinRoom} />
        </Item>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Item style={{ height: "400px" }}>
          <MessengerComponent 
            messages={getMockMessages(10)} 
          />
        </Item>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Item style={{ minHeight: "400px" }}>
          <ConnectedRooms 
            myRooms={[]} 
            handleLeaveRoom={handleLeaveRoom}
          />
        </Item>
       
      </Grid>
      <Grid item lg={12}>
        <Item>8</Item>
      </Grid>
    </Grid>
  )
}

function cleanupSocketListeners(socketState: HomeComponentState) {
  if (socketState.socket) {
    socketState.socket.off("connectionSuccess");
    socketState.socket.off("connect_error");
    socketState.socket.off("newUserConnected");
  }
}