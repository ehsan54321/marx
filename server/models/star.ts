import { Schema, model, models } from 'mongoose'

const starSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
  coins: [
    {
      name: String,
      faName: String,
      id: Number,
      poster_path: String,
    },
  ],
})

export default models.Star || model('Star', starSchema)
