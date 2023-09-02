import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { findOneUser } from '../services/userService'
import { findOneRoom, findRoomById } from '../services/roomService';

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const { username, name } = req.body
    const user = await findOneUser(username);
    const room = await findOneRoom(name)
    const secretKey = process.env.SECRET_KEY as string
    const token = jwt.sign({ id: user?._id, roomId: room?._id }, secretKey) 
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
    })
    res.status(200).json({ token, room }) 
  } catch (error) {
    res.status(500).json({ message: 'Invalid request', error})
  }
}

export const findById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const room = await findRoomById(id)
    res.status(200).json({ room }) 
  } catch (error) {
    res.status(500).json({ message: 'Invalid request', error})
  }
}