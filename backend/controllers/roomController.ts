import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { findOneUser, updateUser } from '../services/userService'
import { findOneRoom, findRoomById } from '../services/roomService'
import User from '../models/User'

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const { username, name } = req.body
    const user = await findOneUser(username)
    if (user?.roomId) {
      res.status(401).json({message: 'User has alread joined the room'})
    } else {
      const room = await findOneRoom(name)
      if (user && room) {
        await updateUser(user._id, room._id)
      }
      const secretKey = process.env.SECRET_KEY as string
      const token = jwt.sign({ id: user?._id.toString(), roomId: room?._id.toString() }, secretKey) 
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
      })
      res.status(200).json({ token, room }) 
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error})
  }
}

export const leaveRoom = async (req: Request, res: Response) => {
  try {
    const data = JSON.parse((req as any)['user_room'])
    const {id} = req.body
    if (data.roomId === id) {
        const user = await User.findById(data.id)
        const response = await User.findByIdAndUpdate(data.id, {roomId: null}, { return: 'after'})
        res.clearCookie('token', { httpOnly: true });
        res.status(200).json({message: `${user?.username} exit from room`})
    } else {
      res.status(401).json({message: 'Unathorized'})
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error})
  }
}

export const findById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const {roomId} = JSON.parse((req as any)['user_room'])
    if (roomId === id) {
      const room = await findRoomById(id)
      if (room) res.status(200).json({ room })
      else res.status(401).json({message: 'Unauthorized'})
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error})
  }
}