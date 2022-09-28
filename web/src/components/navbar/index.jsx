import { Link } from "react-router-dom";
import "./index.css"
import { GlobalContext } from '../../context/Context';
import { useContext } from "react";
import axios from "axios"


export default function NavBar() {

  let { state, dispatch } = useContext(GlobalContext);

  const logoutHandler = () => {

    let baseUrl = "http://localhost:5001";

    axios.post(`${baseUrl}/logout`, {},
      {
        withCredentials: true
      })

      .then(function (response) {
        console.log("response: ", response.data);

        dispatch({ type: "USER_LOGOUT" });
      })

      .catch(function (error) {
        console.log("Error in api call: ", error);

      });


  };

  return (
    <nav className="nav">
      <div className="userName">{state?.user?.firstName} {state?.user?.lastName} </div>

      {(state.isLogin === true) ?
        <ul>
          <li> <Link to="/">Home</Link>            </li>
          <li> <Link to="/profile">Profile</Link>  </li>
          <li> <Link to="/gallery">Gallery</Link>  </li>
          <li> <Link onClick={logoutHandler} >Logout</Link> </li>
        </ul>
        :
        null
      }

      {(state.isLogin === false) ?
        <ul>
          <li> <Link to="/login">Login</Link>     </li>
          <li> <Link to="/signup">Signup</Link>   </li>
        </ul>
        :
        null
      }
    </nav >
  )
}