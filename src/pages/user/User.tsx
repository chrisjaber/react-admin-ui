import Single from "../../components/single/Single"
import "./user.scss"
import { singleUser } from "../../data"
const User = () => {

  //Fetch data and send to single component
  return (
    <div className="user">
      <Single {...singleUser} />
    </div>
  )
}

export default User