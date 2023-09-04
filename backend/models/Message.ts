import mongoose, { Schema } from "mongoose";
import Room from './Room'
import User from './User'

const messageSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: Room
    },
    senderId: {
      type: Schema.Types.ObjectId,
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