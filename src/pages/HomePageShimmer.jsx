import React from 'react'
import Navbar from '../components/Navbar'
import NotificationSnackbar from '../components/NotificationSnackbar'
import {getUserById} from "../firebase"
import "./HomePage.css"

export default function HomePageShimmer() {

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

        <Navbar auth={false} data={userData[0]}/>
        <NotificationSnackbar visibility = {visibilityForSnackbar} message = {messageForSnackbar} />

        <div className='homepage--submaincontainer' style={{minWidth:"100%",boxSizing:"border-box",padding:"40px"}}>

          <div className='homepage--contentcontainer' style={{minWidth:"100%"}}>

            
            
            
            
            
            <div style={{display:"flex",flexDirection:"column",gap:"20px",position:"relative",width:"100%"}}>
              <h1 className='animatingShimmer' style={{width:"100%", height:"40px",borderRadius:"10px"}}></h1>
              <h2 className='animatingShimmer' style={{width:"100%", height:"30px",borderRadius:"10px"}}></h2>
              <p className='animatingShimmer' style={{width:"100%",height:"120px",borderRadius:"10px"}}>
              </p>
              
            </div>
            
            
          
          </div>

        </div>

    </div>
  )
}
