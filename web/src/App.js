import Home from "./components/home"
import About from "./components/about";
import Gallery from "./components/gallery";
import Login from "./components/login";
import Signup from "./components/signup";
import NavBar from "./components/navbar";
import Profile from "./components/profile";

import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useEffect, useContext } from "react"
import { GlobalContext } from './context/Context';
import axios from "axios"




function App() {

  let { state, dispatch } = useContext(GlobalContext);


  useEffect(() => {

    // const getProfile = ()=>{
    let baseUrl = "http://localhost:5001";

    axios.get(`${baseUrl}/profile`,
      {
        withCredentials: true
      })

      .then(function (response) {

        if (response.status === 200) {
          console.log("response: ", response.data);

          dispatch({ type: "USER_LOGIN", payload: response.data });
        } else {
          dispatch({
            type: "USER_LOGOUT"
          })
        };

      })

      .catch(function (error) {
        console.log("Error in api call: ", error);
        dispatch({
          type: "USER_LOGOUT"
        })
      });
    // }
  }, [])


  return (
    <Router>

      <NavBar />

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>

        {(state.isLogin === true) ?
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
          :
          null
        }

        {(state.isLogin === false) ?
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
          :
          null
        }
        {(state.isLogin === null) ?
          <>loading...</>
          :
          null
        }







      </Routes>

    </Router>
  );
}

export default App;