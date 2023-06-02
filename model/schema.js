import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  image: String
})

const User = models.user || model("user", userSchema)

export default User