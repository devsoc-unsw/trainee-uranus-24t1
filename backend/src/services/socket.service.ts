import jwt, { JwtPayload } from "jsonwebtoken";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Server as SocketIOServer } from "socket.io";
import Message, { MessageType } from "../models/message";
import { SECRET_KEY } from "../env";
import { collections } from "./database.service";
import { ObjectId } from "mongodb";
import User from "../models/user";

export const socket = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
) => {
  const io = new SocketIOServer(server, {
    path: "/socket.io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  const sendTo = new Map<string, Set<(arg0: Message) => void>>();

  io.on("connection", async (socket) => {
    socket.on("token", async (token) => {
      const decoded = jwt.verify(token, SECRET_KEY);
      const _id: string = (decoded as JwtPayload)._id;
      const user = (await collections.users?.findOne({
        _id: new ObjectId(_id),
      })) as unknown as User;

      if (!user) {
        socket.disconnect();
        return;
      }

      const send = (message: Message) =>
        socket.emit("chat message out", message);
      if (!sendTo.has(_id)) {
        sendTo.set(_id, new Set());
      }
      sendTo.get(_id)?.add(send);

      socket.on("chat message in", async (data) => {
        const packet: {
          sender: string;
          receiver: string;
          type: MessageType;
          content: string;
        } = data;

        const message = new Message(
          [new ObjectId(packet.sender), new ObjectId(packet.receiver)],
          new ObjectId(packet.sender),
          packet.type,
          packet.content,
        );
        const result = await collections.messages?.insertOne(message);
        if (!result) {
          console.log("[?!] Could not send message");
          return;
        }
        message._id = result.insertedId;

        sendTo.get(packet.sender)?.forEach((send) => send(message));
        if (
          sendTo.has(packet.receiver) &&
          (sendTo.get(packet.receiver)?.size ?? 0 > 0)
        ) {
          sendTo.get(packet.receiver)?.forEach((send) => send(message));
        }
      });

      socket.on("disconnect", () => {
        sendTo.delete(_id);
      });
    });
  });
};
