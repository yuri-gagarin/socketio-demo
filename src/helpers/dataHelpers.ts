import type { RoomData } from "../types/socketTypes.js";

export const checkNewRoom = ({ roomId, activeRooms }: { roomId: string; activeRooms: RoomData[] }): boolean => {
  for (let i = 0; i < activeRooms.length; i++) {
    if (activeRooms[i].roomId === roomId) {
      return false;
    }
  }
  return true;
}