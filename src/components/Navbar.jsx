import React from 'react'
import './Navbar.css'
import { Link,useNavigate } from 'react-router-dom'
import {getUserById} from "../firebase"

export default function Navbar(props) {
    const isAuthenticated  = localStorage.getItem("key") === null;
    const currentKey = localStorage.getItem("key")

    const navigate = useNavigate();

    


    /* if(props.changer !== undefined && props.changer){

      
        idkidk().then((res)=>{return setUserData(res)})
        props.changerFunction()
      
      
    } */
    console.log(props.data)
    console.log(props.auth)
    console.log(currentKey)


  return (
    <div className='navbar--maincontainer' style={props.fixed? {position: "fixed"} : {position:"absolute"}}>

       <Link className='navbar--logohover' style={{padding:"0px", display:"flex"}} to={"/"}>
        <img style={{width:"70px"}} src='logo8.png'></img>
       </Link>

       <div style={{display:"flex", justifyContent:"center", alignItems: "center", gap:"20px"}} >

       <div className='navbar--tagscontainer'>
        {
        !currentKey? 

        <>
            <Link className='atagstyle' to={"/login"}>Login</Link>
            <Link className='atagstyle' to={"/signup"}>Sign up</Link>
        </>
        :
        <div style={{display:"flex", justifyContent:"center", alignItems: "center", gap:"20px"}} >
        <div>
        <Link className='atagstyle' style={{display:"flex",borderRadius:"50px"}} to={"/bookmarks"}>
          My bookmarks
          {/* <span class="material-symbols-outlined">
            favorite
          </span> */}
        </Link>
        </div>

        <div>

          <img className='navbar--profile--icon' src={props.data ? props.data.profilePicture : "profilepicturesdefault.png"}></img>

          <div className='navbar--invisible--bar'>

            <h3 className='navbar--usernamestyling'>Hey, {props.data && props.data.username}!</h3>

            

            <Link className='atagstyle2' to={"/account"}>Profile</Link>

            <Link className='atagstyle2' to={"/howto"}>How-to</Link>

            <a className='atagstyle2' onClick={()=>{
              
              localStorage.clear();
              navigate("/shimmy")
              setTimeout(() => {
                navigate("/")
              }, 1);
            
            
            }}>Sign out</a>

            
          </div>

       </div>
        </div>
        }

        
       </div>

        

       </div>
    </div>
  )
}
