import { Request, Response } from 'express'
import { findOneUser } from '../services/userService'
import { findOneRoom } from '../services/roomService';

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const { username, name } = req.body
    const token = await findOneUser(username);
    const room = await findOneRoom(name)
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
    })
    res.status(200).json({ token, room }) 
  } catch (error) {
    res.status(500).json({ message: 'Invalid request', error})
  }
}