import jwt from 'jsonwebtoken'
import User from '../models/User'
import { hash } from '../helper'

export const findOneUser = async (username: string) => {
  try {
    let user = await User.findOne({ username })
    if (!user) {
      const randomstring = Math.random().toString(36).slice(-12);
      const hashed = hash(user + '' + randomstring)
      user = await User.create({username, password: hashed})
    }
    const secretKey = process.env.SECRET_KEY as string
    const token = jwt.sign({ id: user._id }, secretKey)
    return token 
  } catch (error) {
    console.log(error)
  }
}

