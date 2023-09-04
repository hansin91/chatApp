import Message from '../models/Message'

export const getMessages = async (roomId: string) => {
  const messages = await Message.find({ roomId }).exec()
  return messages
}

export const saveMessage = async (message: string, userId: string, roomId: string) => {
  const newMessage = await Message.create({ roomId, senderId: userId, content: message })
  return newMessage
}


