import express, { Application } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { collections, connectToDatabase, updateStaticData } from "./services/database.service";
import { authenticationRouter } from "./routes/authentication.routes";
import { PORT, SECRET_KEY } from "./env";
import { usersRouter } from "./routes/users.routes";
import { selfRouter } from "./routes/self.routes";
import { errorHandler } from "./middleware/errors.middleware";
import { staticDataRouter } from "./routes/static_data.routes";
import { ObjectId } from "mongodb";
import Message, { MessageType } from "./models/message";
import User from "./models/user";

try {
  await connectToDatabase();
} catch (error) {
  console.error("Database connection failed", error);
  process.exit(1);
}

// await collections.messages?.deleteMany({});

const app: Application = express();
app.use(cors());
const server = app.listen(PORT, async () => {
  console.log(`🗄️ Server Fire on http://localhost:${PORT}`);
});

app.use("/authentication", authenticationRouter);
app.use("/users", usersRouter);
app.use("/self", selfRouter);
app.use("/static-data", staticDataRouter);
app.use(errorHandler);

const io = new SocketIOServer(server, {
  path: "/socket.io",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const sendTo: { [key: string]: (arg0: Message) => void } = {};

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

    sendTo[_id] = (message) => socket.emit("chat message out", message);

    socket.on("chat message in", async (data) => {
      const packet: {
        sender: string;
        receiver: string;
        type: MessageType;
        content: string;
      } = data;

      const message: Message = new Message(
        [new ObjectId(packet.sender), new ObjectId(packet.receiver)],
        new ObjectId(packet.sender),
        packet.type,
        packet.content,
      );
      const result = await collections.messages?.insertOne(message);
      if (!result) {
        console.log("?? Could not send message ??");
        return;
      }
      message._id = result.insertedId;

      sendTo[packet.sender](message);
      if (sendTo[packet.receiver] != undefined) {
        sendTo[packet.receiver](message);
      }
    });
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected");
  });
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("\nServer Closed.");
    process.exit(0);
  });
});
