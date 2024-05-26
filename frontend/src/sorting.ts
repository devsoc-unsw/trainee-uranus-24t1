import { Message } from "./backendCommunication";

const getMongodbTimestamp = (id: string) => {
  const epochSecondsHex = id.substring(0, 8);
  return parseInt(epochSecondsHex, 16);
}

export const messagesByMongodbTimestamp = (a: Message, b: Message) => 
  getMongodbTimestamp(a._id) - getMongodbTimestamp(b._id);
