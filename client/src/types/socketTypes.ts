import type { NewConnectionData, MessageData, MsgReceivedData, ReadReceiptData, RoomData } from "./dataTypes";

export interface IClientToServer {
  sendNewNessage: (data: MessageData) => void;
  sendMsgReceived: (data: MsgReceivedData) => void;
  sendReadReceipt: (data: ReadReceiptData) => void;
  sendJoinRoom: (data: RoomData) => void;
  sendLeaveRoom: (data: RoomData) => void;
}
export interface IServerToClient {
  noArg: () => void;
  connectionSuccess: (data: any) => void;
  newUserConnected: (data : NewConnectionData) => void;
  receiveNewMessage: (data: MessageData) => void;
  confirmReceivedMsg: (data: MsgReceivedData) => void;
  receiveReadReceipt: (data: ReadReceiptData) => void;
  roomJoinSuccess: (data: RoomData) => void;
  roomJoinFailure: (data: RoomData) => void;
}