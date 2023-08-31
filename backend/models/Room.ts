import mongoose, { Schema } from "mongoose";
import { randomUUID } from 'crypto'

const roomSchema = new mongoose.Schema(
  {
    id: {
      type: Schema.Types.UUID,
      default: () => randomUUID(),
      required: true
    },
    name: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
)

const Room = mongoose.model("Room", roomSchema)
export default Room