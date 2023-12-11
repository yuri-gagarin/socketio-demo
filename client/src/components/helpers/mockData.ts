import { v1 }from "uuid";
import { faker } from "@faker-js/faker";
// types //
import type { MsgData } from "../../types/messageType";

export const genMockUsers = (numToGenerate: number): string[] => {
  const users: string[] = [];
  for (let i = 0; i < numToGenerate; i++) {
    users.push(v1());
  }
  return users;
}

export const getMockMessages = (numToGenerate: number): MsgData[] => {
  const messages: MsgData[] = [];
  for (let i = 0; i < numToGenerate; i++) {
    messages.push({ 
      id: v1(), 
      content: faker.lorem.words(Math.ceil(Math.random() * 10)),
      senderSocketId: v1(),
      receiverSocketId: v1()
    });
  }
  return messages;
}

export const setColor = (colorIndex: number, colorArr?: string[]): string => {
  if (colorArr) {
    // to do later //
    return "green";
  }
  const colors = ["mistyrose", "red", "lawngreen", "darkorchid", "yellow", "blueviolet", "yellowgreen", "red", "darkviolet", "hotpink"];
  if (colors[colorIndex]) {
    return colors[colorIndex];
  }
  const idxString = colorIndex.toString();
  const last = idxString.length - 1;
  return colors[parseInt(idxString[last])];
}