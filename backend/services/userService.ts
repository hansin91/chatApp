import User from '../models/User'
import { hash } from '../helper'

export const findOneUser = async (username: string) => {
  try {
    let user = await User.findOne({ username })
    if (!user) {
      const randomstring = Math.random().toString(36).slice(-12);
      const hashed = hash(user + '' + randomstring)
      user = await User.create({username, password: hashed, roomId: null})
    }
    return user
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (id: any, roomId: any) => {
  try {
  const response =  await User.findByIdAndUpdate(id, {roomId}, {return: 'after'})
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const findUserById = async (id: string) => {
  const user = await User.findById(id)
  return user;
}

