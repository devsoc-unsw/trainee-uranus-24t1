import { ObjectId } from "mongodb";

export default class Message {
  constructor(
    public members: ObjectId[],
    public sender: ObjectId,
    public content: string,

    public _id?: ObjectId,
  ) {}
}
