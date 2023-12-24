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
export type RoomListData = {
  roomId: string;
  connectedSockets: string[];
  numOfUsers: string[];
  private: boolean;
}
export type RoomData = {
  message?: string;
  roomId: string;
  startedBy: string;
  connectedSockets: string[];
  numOfUsers: number;
  messages: MessageData[];
  private: boolean;
  errors: string[] | null;
}
