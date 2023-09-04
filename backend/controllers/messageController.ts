import { Request, Response } from 'express'
import { getMessages } from '../services/messageService'

export const getRoomMessages = async (req: Request, res: Response) => {
  try {
    const userRoom = JSON.parse((req as any)['user_room'])
    const {roomId} = req.params
    if (roomId == userRoom.roomId) {
      const messages = await getMessages(roomId)
      console.log(messages)
      res.status(200).json({messages})
    } else {
      res.status(400).json({message: 'Unauthorized'})
    }
    // const {id} = userRoom
    // const user = await findUserById(id)
    // if (user) {
    //   res.status(200).json({ user: {username: user?.username, id: user?._id} }) 
    // } else {
    //   res.status(400).json({ user: null })
    // }
  } catch (error) {
    res.status(500).json({ message: 'Interna server error', error})
  }
}