import Message from '../models/Message'

export const getMessages = async (roomId: string) => {
  let messages = []
  try {
    messages = await Message.find({ roomId }).populate('senderId').exec()
    return messages
  } catch (error) {
    console.log(error)
    return [] 
  }
}

export const saveMessage = async (message: string, userId: string, roomId: string) => {
  const newMessage = await Message.create({ roomId, senderId: userId, content: message })
  return newMessage
}


