import mongoDb from 'database/mongo-db'
import User from 'model/schema'
import { compare } from 'bcryptjs'
import { WRONG_CREDENTIALS } from 'constants/app-constants'

export async function authorizeCredentials(credentials, req) {
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