import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  email: String,
  password: String
})

const User = models.user || model("user", userSchema)

export default User