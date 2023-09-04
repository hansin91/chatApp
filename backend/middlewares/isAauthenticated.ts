import {Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import Room from '../models/Room'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const url = req.url
  if (url == '/rooms/join') {
    next()
  } else {
    const cookie = req.headers.cookie
    if (cookie) {
      const [,token] = cookie.split('=')
      const secretKey = process.env.SECRET_KEY as string
      try {
        const data = jwt.verify(token, secretKey) as any
        const { id, roomId } = data
        const user = await User.findById(id)
        if (!user) {
          next({status: 401,
            name: 'UNAUTHORIZED',
            message: 'Forbidden request'})
          } else {
            (req as any)['user_room'] = JSON.stringify({id, roomId})
            next()
          }
      } catch (error) {
        next({status: 500, error})
      }
    } else {
      next({status: 401,
        name: 'UNAUTHORIZED',
        message: 'Forbidden request'})
      }
    }
  }

