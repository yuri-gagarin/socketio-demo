type Connectiondata = {
  message: string;
  userSocketId: string;
  connectedSockets: string[];
  numOfConnections: number;
}
type MessageData = {
  messageid: string;
  receiverSocketId: string;
  senderSocketId: string;
  messageData: string;
}
type MsgReceivedData = {
  receivedBySocketId: string;
  sentFromSocketId: string;
}
type ReadReceiptData = {
  readBySocketId: string;
  sendToSocketId: string;
  messageId: string;
}
type JoinRoomData = {
  clientSocketId: string;
  roomId: string;
}
type RoomJoinData = {
  message: string;
  clientSocketId: string;
  roomId: string;
  roomSize: number;
  errors: string[] | null;
}

export type RoomData = {
  roomId: string;
  startedBy: string;
  connectedSockets: string[];
  numOfUsers: number;
  messages: MessageData[];
  private: boolean;
}


export interface ServerToClientEvents {
  noArg: () => void;
  connectionSuccess: (data: any) => void;
  newUserConnected: (data : Connectiondata) => void;
  userDisconnected: (data: Connectiondata) => void;
  receiveNewMessage: (data: MessageData) => void;
  confirmReceivedMsg: (data: MsgReceivedData) => void;
  receiveReadReceipt: (data: ReadReceiptData) => void;
  roomJoinSuccess: (data: RoomJoinData) => void;
  roomJoinFailure: (data: RoomJoinData) => void;
}

export interface ClientToServerEvents {
  sendNewNessage: (data: MessageData) => void;
  sendMsgReceived: (data: MsgReceivedData) => void;
  sendReadReceipt: (data: ReadReceiptData) => void;
  sendJoinRoom: (data: JoinRoomData) => void;
}

