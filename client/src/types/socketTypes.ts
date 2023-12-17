export type NewConnectionData = {
  message: string;
  userSocketId: string;
  connectedSockets: string[];
  numOfConnections: number;
}
export type MessageData = {
  messageid: string;
  receiverSocketId: string;
  senderSocketId: string;
  messageData: string;
}
export type MsgReceivedData = {
  receivedBySocketId: string;
  sentFromSocketId: string;
}
export type ReadReceiptData = {
  readBySocketId: string;
  sendToSocketId: string;
  messageId: string;
}
export type JoinRoomData = {
  clientSocketId: string;
  roomId: string;
}
export type RoomJoinData = {
  message: string;
  clientSocketId: string;
  roomId: string;
  roomSize: number;
  errors: string[] | null;
}

export interface IClientToServer {
  sendNewNessage: (data: MessageData) => void;
  sendMsgReceived: (data: MsgReceivedData) => void;
  sendReadReceipt: (data: ReadReceiptData) => void;
  sendJoinRoom: (data: JoinRoomData) => void;
}
export interface IServerToClient {
  noArg: () => void;
  connectionSuccess: (data: any) => void;
  newUserConnected: (data : NewConnectionData) => void;
  receiveNewMessage: (data: MessageData) => void;
  confirmReceivedMsg: (data: MsgReceivedData) => void;
  receiveReadReceipt: (data: ReadReceiptData) => void;
  roomJoinSuccess: (data: RoomJoinData) => void;
  roomJoinFailure: (data: RoomJoinData) => void;
}