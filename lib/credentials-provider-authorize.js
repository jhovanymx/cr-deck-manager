import mongoDb from 'database/mongo-db';
import User from 'model/schema';
import { compare } from 'bcryptjs';

const WRONG_CREDENTIALS = "Password or email are invalid"

export default async function authorize(credentials, req) {
  mongoDb().catch(() => res.json({error: "Connection error"}))

  const { email, password } = credentials

  const user = await User.findOne({email})

  if (!user) {
    throw new Error(WRONG_CREDENTIALS)
  }

  const checkPassword = await compare(password, user.password)
  if (!checkPassword) {
    throw new Error(WRONG_CREDENTIALS)
  }
  return user
}