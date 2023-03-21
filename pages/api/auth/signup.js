import mongoDb from 'database/mongo-db';
import User from 'model/schema';
import { hash } from 'bcryptjs'

export default async function handler(req, res) {
  mongoDb().catch(() => res.json({error: "Connection error"}))

  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({error: "No form data"})
    }
    
    const { email, password } = req.body;
    const isExisting = await User.findOne({email})
    if (isExisting) {
      return res.status(422).json({message: "User Already Exists"})
    }

    const newUser = new User({email, password: await hash(password, 12)})
    try {
      const data = await newUser.save()
      res.status(201).json({status: true, user: data})
    } catch (error) {
      res.status(404).json({error})
    }
  } else {
    res.status(500).json({message: "Only POST Accepted"})
  }
}