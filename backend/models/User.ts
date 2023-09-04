import mongoose, { Schema } from "mongoose"
import Room from './Room'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: Room
    }
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)
export default User