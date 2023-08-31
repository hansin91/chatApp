import app from './app'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import User from './models/User'
import Message from './models/Message'

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

const io = new Server(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.use(async (socket: any, next) => {
  try {
    const cookie = socket.request.headers.cookie
    if (cookie) {
      const [,token] = cookie.split('=')
      const secretKey = process.env.SECRET_KEY as string
      const data = jwt.verify(token, secretKey) as any
      socket.userId = data.id
    }
    next();
  } catch (err) {}
});

io.on("connection", (socket: any) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }: any) => {
    socket.join(chatroomId);
    console.log(`${socket.userId} joined chatroom: " + ${chatroomId}`);
  });

  socket.on("leaveRoom", ({ chatroomId }: any) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }: any) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        roomId: chatroomId,
        senderId: socket.userId,
        content: message
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user?.username,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});