type NewConnectiondata = {
  message: string,
  userSocketId: string,
  connectedSockets: string[],
  numOfConnections: number,
}
type NewMessageData = {
  receiverSocketId: string,
  senderSocketId: string,
  messageData: string
}
type MsgReceivedData = {
  receivedBySocketId: string,
  sentFromSocketId: string,
}
type ReadReceiptData = {

}


export interface ServerToClientEvents {
  noArg: () => void;
  newUserConnected: (data : NewConnectiondata) => void;
  sendMsgToClient: (data: NewMessageData) => void;
  confirmReceivedMsg: (data: MsgReceivedData) => void;
  sendReadReceipt: (data: ReadReceiptData) => void;
}
export interface ClientToServerEvents {
  newNessage: (data: NewMessageData) => void;
  messageReceived: (data: MsgReceivedData) => void;
}