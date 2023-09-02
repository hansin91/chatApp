import bcrypt from 'bcrypt'

const saltRound = process.env.SALT ? +process.env.SALT : 10
const users = [] as Array<any>

export const hash = (password: string) => {
  const SALT = bcrypt.genSaltSync(saltRound)
  const hashed = bcrypt.hashSync(password, SALT)
  return hashed
}

export const addUser = ({ id, name, room }: any) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
}

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

export const getUser = (id: string) => users.find((user) => user.id === id);

export const getUsersInRoom = (room: string) => users.filter((user) => user.room === room);