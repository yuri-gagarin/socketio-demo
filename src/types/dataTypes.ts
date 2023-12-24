// SocketIO Connection //
export type Connectiondata = {
  message: string;
  userSocketId: string;
  connectedSockets: string[];
  numOfConnections: number;
}
// Incoming - Outcoming Message //
export type MessageData = {
  messageid: string;
  receiverSocketId: string;
  senderSocketId: string;
  messageData: string;
}
// Client Receied Message //
export type MsgReceivedData = {
  receivedBySocketId: string;
  sentFromSocketId: string;
}
// Client Read Message //
export type ReadReceiptData = {
  readBySocketId: string;
  sendToSocketId: string;
  messageId: string;
}
export type JoinRoomData = {
  clientSocketId: string;
  roomId: string;
}

// ROOMS //
// general room data for storage //
export type GeneralRoomData = {
  startedBy: string;
  roomId: string;
  private: boolean;
  numOfUsers: number;
}
// detailed room data for query //
export type DetailedRoomData = {
  roomId: string;
  startedBy: string;
  connectedSocketIds: string[];
  numOfUsers: number;
  messages: MessageData[];
  private: boolean;
  errors?: string[] | null;
  respnseMsg?: string;
}
// room query from a client //
export type RoomQueryData = {
  clientSocketId: string;
  includeConnections: boolean;
  includeMessages: boolean;
  visibility: ("private" | "public" | "all");
}
// room query response to client //
export type RoomQueryResponse = {
  message: string;
  visibility: ("private" | "public" | "all");
  rooms: DetailedRoomData[];
  errors: string[] | null;
}

// MESSAGE STORAGE //
// data for saved messages //
export type MsgStorageData = {
  roomId: string;
  roomName: string;
  messages: MessageData[];
}