import Room from '../models/Room'

export const findOneRoom = async (name: string) => {
  try {
    let room = await Room.findOne({ name: name.toLowerCase() })
    if (!room) {
      room = await Room.create({name: name.toLowerCase()})
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


