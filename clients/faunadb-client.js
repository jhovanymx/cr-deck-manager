import { Client } from "fauna"

export default new Client({
  secret: process.env.FAUNADB_SECRET
})