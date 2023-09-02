import app from './app'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import { addUser, getUsersInRoom, getUser, removeUser } from './helper'

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

const io = new Server(server, {
  allowEIO3: true,
  cors: {
    origin: ["http://localhost:3000"],
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
  } catch (err) {
    console.log(err)
  }
});

io.on('connection', (socket: any) => {

  socket.on("disconnect", (reason: string) => {
    console.log(reason)
  });

  socket.on('reconnect', () => {
    console.log('Reconnected to server');
  });

  socket.on('join', async ({ name, room }: any, callback: any) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user?.room);

    socket.emit('message', { user: 'admin', text: `${user?.name}, welcome to room ${user?.room}.`});
    socket.broadcast.to(user?.room).emit('message', { user: 'admin', text: `${user?.name} has joined!` });

    io.to(user?.room).emit('roomData', { room: user?.room, users: getUsersInRoom(user?.room) });

    callback();
  });

  socket.on('sendMessage', async (data: any, callback: any) => {
    const { name, message, room } = data
    io.to(room).emit('message', { user: name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});