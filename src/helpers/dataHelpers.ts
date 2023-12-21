import type { RoomData } from "../types/socketTypes.js";

export const checkNewRoom = (
  { roomId, activeRooms }: { roomId: string; activeRooms: RoomData[]; }
): boolean => {
  for (let i = 0; i < activeRooms.length; i++) {
    if (activeRooms[i].roomId === roomId) {
      return false;
    }
  }
  return true;
}

export const updateRoomData = (
  { roomId, socketId, activeRooms }: { roomId: string; socketId: string; activeRooms: RoomData[]; }
): RoomData[] => {
  return activeRooms.map((roomData) => {
    if (roomData.roomId === roomId) {
      return {
        ...roomData,
        connectedSockets: roomData.connectedSockets.filter((id) => socketId !== id),
        numOfUsers: roomData.numOfUsers - 1
      }
    } else {
      return roomData;
    }
  });
}