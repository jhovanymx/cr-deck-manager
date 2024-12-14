import { fql } from "fauna"

export default GET_USER_BY_USERNAME = fql`
  User.all().where(.username == "jhovanymx@io.com") {
    id
  }
`