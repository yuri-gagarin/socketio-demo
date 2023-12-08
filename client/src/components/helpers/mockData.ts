import { v1 }from "uuid";

export const genMockUsers = (numToGenerate: number): string[] => {
  const users: string[] = [];
  for (let i = 0; i < numToGenerate; i++) {
    users.push(v1());
  }
  return users;
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