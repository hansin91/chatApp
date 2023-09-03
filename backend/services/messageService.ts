import Message from '../models/Message'

export const saveMessage = async (message: string, userId: string, roomId: string) => {
  const newMessage = await Message.create({ roomId, senderId: userId, content: message })
  return newMessage
}


