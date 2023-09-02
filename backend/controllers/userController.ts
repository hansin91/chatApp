import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { findUserById } from '../services/userService'

export const findById = async (req: Request, res: Response) => {
  try {
    const cookie = req.headers.cookie
    if (cookie) {
      const [,token] = cookie.split('=')
      const secretKey = process.env.SECRET_KEY as string
      const data = jwt.verify(token, secretKey) as any
      const user = await findUserById(data.id)
      res.status(200).json({ user: user?.username }) 
    } else {
      res.status(400).json({ user: null })
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid request', error})
  }
}