import Room from '../models/Room'

export const findOneRoom = async (name: string) => {
  try {
    let room = await Room.findOne({ name })
    if (!room) {
      room = await Room.create({name})
    }
    return room 
  } catch (error) {
    console.log(error)
  }
}

