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
import { socket } from "./services/socket.service";

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

socket(server);

process.on("SIGINT", () => {
  server.close(() => {
    console.log("\nServer Closed.");
    process.exit(0);
  });
});
