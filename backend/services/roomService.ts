import Room from '../models/Room'

export const findOneRoom = async (name: string) => {
  name = name.toLowerCase()
  try {
    let room = await Room.findOne({ name })
    if (!room) {
      room = await Room.create({ name })
    }
    return room 
  } catch (error) {
    console.log(error)
  }
}

export const findRoomById = async (id: string) => {
  const room = await Room.findById(id)
  return room
}


