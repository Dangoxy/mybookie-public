import React from 'react'
import Navbar from '../components/Navbar'
import NotificationSnackbar from '../components/NotificationSnackbar'
import {getUserById} from "../firebase"
import "./HomePage.css"

export default function HomePage() {

    const currentKey = localStorage.getItem("key")
    const [userData, setUserData] = React.useState({})

    console.log(userData[0])
    console.log(currentKey)

    async function idkidk(){
      return await getUserById(currentKey)
    }


    React.useEffect(()=>{
      console.log("useEffect ran")
      idkidk().then((res)=>{return setUserData(res)})
    },[currentKey])

    const [visibilityForSnackbar, setVisibilityForSnackbar] = React.useState(false)
    const [messageForSnackbar, setMessageForSnackbar] = React.useState("")
    const [correctForSnackbar, setCorrectForSnackbar] = React.useState(false)

  return (
    <div className='homepage--maincontainer'>

        <Navbar auth={true} data={userData[0]}/>
        <NotificationSnackbar visibility = {visibilityForSnackbar} message = {messageForSnackbar} />

        <div className='homepage--submaincontainer'>

          <div className='homepage--contentcontainer'>

            
            
            
            {!userData[0] ?
            <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>

              <h1 style={{display:"flex", justifyContent:"center", alignItems:"center",gap:"16px"}}>Welcome to My Bookie
              <img src='logo8.png' style={{width:"64px"}}></img>
              </h1>

              <h3>Your most reliable bookmarks web app.</h3>
              <p>
                <a href='/#/signup'>Join</a> now and 
                start adding bookmarks to your account by adding links
                manually or by uploading your favorite browser's bookmarks list!
                Make sure you check the <a href='/#/howto'>how-to</a> page.
              </p>
            </div>
            :
            <div style={{display:"flex",flexDirection:"column",gap:"20px",position:"relative"}}>
              <h1>Welcome back, {userData[0].username}! </h1>
              <p>
                Start adding bookmarks to your account by adding links
                manually or by uploading your favorite browser's bookmarks list!
                Make sure you check the <a href='/#/howto'>how-to</a> page.
              </p>
              
            </div>
            }
            
          
          </div>

        </div>

    </div>
  )
}
