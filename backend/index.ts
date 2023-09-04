import app from './app'
import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import { addUser, getUsersInRoom, getUser, removeUser } from './helper'
import { saveMessage } from './services/messageService'

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
})

const leaveRoom = (socket: Socket) => {
  const user = removeUser(socket.id);
  if(user) {
    const sentMessage = {user: 'Admin', senderId: 'admin', content: `${user.name} has left.` }
    io.to(user.room).emit('message', sentMessage);
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
  }
}

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

  socket.on("disconnect", (reason: any) => {
    console.log((typeof reason) === 'string' ? reason : JSON.stringify(reason))
  });

  socket.on('reconnect', () => {
    console.log('Reconnected to server');
  });

  socket.on('join', async ({ name, room }: any, callback: any) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user?.room);

    socket.emit('message', { user: 'Admin', senderId: 'admin', content: `${user?.name}, welcome to room ${user?.room}.`});
    socket.broadcast.to(user?.room).emit('message', { user: 'Admin', senderId: 'admin', content: `${user?.name} has joined!` });

    io.to(user?.room).emit('roomData', { room: user?.room, users: getUsersInRoom(user?.room) });

    callback();
  });

  socket.on('sendMessage', async (data: any, callback: any) => {
    const { user, message, room } = data
    io.to(room.name).emit('message', { user: user.username, senderId: user.id, content: message });
    await saveMessage(message, user.id, room._id)
    callback();
  });
  
  socket.on('leaveRoom', async (data: any, callback: any) => {
    leaveRoom(socket)
  })

  socket.on('disconnect', () => {
    leaveRoom(socket)
  })
});