import React from "react"
import {useNavigate} from "react-router-dom"

import ProtectedAccountPage from "./ProtectedAccountPage.jsx";


export const ProtectedAccountRoute = () => {
    const navigate = useNavigate();
    const isAuthenticated  = localStorage.getItem("key") === null;
    console.log(localStorage.getItem("key") + " KEY")
    console.log(localStorage.getItem("key") === null)
    console.log(!isAuthenticated)

    if (isAuthenticated) {
      console.log(isAuthenticated + " bruh")
      React.useEffect(()=>{
        navigate("/login")
      },[])
    }
    return (
      <div><ProtectedAccountPage /></div>
    );
  };