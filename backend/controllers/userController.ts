import { Request, Response } from 'express'
import { findUserById } from '../services/userService'

export const findById = async (req: Request, res: Response) => {
  try {
    const userRoom = JSON.parse((req as any)['user_room'])
    const {id} = userRoom
    const user = await findUserById(id)
    if (user) {
      res.status(200).json({ user: {username: user?.username, id: user?._id} }) 
    } else {
      res.status(400).json({ user: null })
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid request', error})
  }
}