import { ObjectId } from "mongodb";

export enum MessageType {
  Default,
  Seen
}

export default class Message {
  constructor(
    public members: ObjectId[],
    public sender: ObjectId,
    public type: MessageType,
    public content: string,

    public _id?: ObjectId,
  ) {}
}
