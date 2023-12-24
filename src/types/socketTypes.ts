import type { 
  Connectiondata, JoinRoomData, MessageData, MsgReceivedData, 
  ReadReceiptData, DetailedRoomData, RoomQueryData, RoomQueryResponse 
} from "./dataTypes.js";

export interface ServerToClientEvents {
  connectionSuccess: (data: any) => void;
  newUserConnected: (data : Connectiondata) => void;
  userDisconnected: (data: Connectiondata) => void;
  receiveNewMessage: (data: MessageData) => void;
  confirmReceivedMsg: (data: MsgReceivedData) => void;
  receiveReadReceipt: (data: ReadReceiptData) => void;
  roomJoinSuccess: (data: DetailedRoomData) => void;
  roomJoinFailure: (data: DetailedRoomData) => void;
  receiveRoomQuery: (data: RoomQueryResponse) => void;
}

export interface ClientToServerEvents {
  sendNewNessage: (data: MessageData) => void;
  sendMsgReceived: (data: MsgReceivedData) => void;
  sendReadReceipt: (data: ReadReceiptData) => void;
  sendJoinRoom: (data: JoinRoomData) => Promise<void>;
  sendQueryRooms: (data: RoomQueryData) => void;
}

