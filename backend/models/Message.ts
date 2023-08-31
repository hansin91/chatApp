import mongoose, { Schema } from "mongoose";
import Rooms from './Room'
import User from './User'

const messageSchema = new Schema(
  {
    roomId: {
      type: Schema.ObjectId,
      ref: Rooms
    },
    senderId: {
      type: Schema.ObjectId,
      ref: User
    },
    content: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
)

const Message = mongoose.model("Message", messageSchema)
export default Message