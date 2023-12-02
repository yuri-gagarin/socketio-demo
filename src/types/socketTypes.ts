type NewConnectiondata = {
  message: string;
  userSocketId: string;
  connectedSockets: string[];
  numOfConnections: number;
}
type NewMessageData = {
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


export interface ServerToClientEvents {
  noArg: () => void;
  newUserConnected: (data : NewConnectiondata) => void;
  receiveNewMessage: (data: NewMessageData) => void;
  confirmReceivedMsg: (data: MsgReceivedData) => void;
  receiveReadReceipt: (data: ReadReceiptData) => void;
  roomJoinSuccess: (data: RoomJoinData) => void;
  roomJoinFailure: (data: RoomJoinData) => void;
}

export interface ClientToServerEvents {
  sendNewNessage: (data: NewMessageData) => void;
  sendMsgReceived: (data: MsgReceivedData) => void;
  sendReadReceipt: (data: ReadReceiptData) => void;
  sendJoinRoom: (data: JoinRoomData) => void;
}

