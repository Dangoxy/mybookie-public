import React from 'react'
import Navbar from '../components/Navbar.jsx'
import NotificationSnackbar from '../components/NotificationSnackbar.jsx'

import {getProfiles, getUserData, editUserPasswordByLink,getUserById,getUserByResetLink} from "../firebase.jsx"

import {Link, useNavigate,useParams} from "react-router-dom"

export default function ForgotPasswordReset() {

    const navigate = useNavigate()

    React.useEffect(()=>{
      if(localStorage.getItem("key") !== null){
          navigate("/bookmarks")
      }
    },[])


    let keyByParam = useParams().id

    let websiteURL1 = window.location.href
    
    let [userData,setUserData] = React.useState({})

    let [expDate,setExpDate] = React.useState()
    let [currentDate,SetCurrentDate] = React.useState(new Date(Date.now()).toLocaleDateString("en-GB"))

    

    /* async function getuser(){
        return await getUserById(keyByParam)
    }


    React.useEffect(()=>{
        getuser().then((res)=>{return setUserData(res)})
    },[]) */

    async function idkidk(){
        return await getUserByResetLink(keyByParam)
      }
  
      React.useEffect(()=>{
        idkidk().then((res)=>{

          

          
          return setUserData(res)
        })
      },[])

    console.log(userData[0]);
    console.log(expDate)
    console.log(currentDate)
    console.log(websiteURL1)
    

    console.log(keyByParam)
    

    React.useEffect(()=>{

      if(userData[0]){
        console.log(userData[0].resetLinkDate + 86400000)
        console.log(Date.now())
        console.log(userData[0].reset)
        if(!userData[0].reset){
            
        }
      }
    },[userData[0]])

    const [formData,setFormData] = React.useState({

        newPassword: "",
        confirmNewPassword:"",

    })

    const [passwordShowType1,setPasswordShowType1] = React.useState(true)
    const [passwordShowType2,setPasswordShowType2] = React.useState(true)


    const [profiles,setProfiles] = React.useState([])
    const [currentSessionKey, setCurrentSessionKey] = React.useState("")

    /* useEffect(()=>{
        getProfiles().then((data)=>{setProfiles(data)})
    },[]) */
    const [submitted, setSubmitted] = React.useState(false);
    
    const idk = submitted ? <img className="loadingButton" src='/LoadingIcon5.png' style={{width:"36px"}}></img> : "Submit change"
    
    React.useEffect(()=>{
      
    },[formData])
    

    

    const [errorMsgForEmail, setErrorMsgForEmail] = React.useState("")
    const [errorMsgForPassword, setErrorMsgForPassword] = React.useState("")

    const [submitErrorTriggered, setSubmitErrorTriggered] = React.useState(false)

    const [visibilityForSnackbar, setVisibilityForSnackbar] = React.useState(false)
    const [messageForSnackbar, setMessageForSnackbar] = React.useState("")
    const [correctForSnackbar, setCorrectForSnackbar] = React.useState(false)
    const [redirectForSnackbar, setRedirectForSnackbar] = React.useState(false)

    function snackBarPopup(message,correct,redirect){
      setMessageForSnackbar(message)
      setVisibilityForSnackbar(true)
      if(correct){
          setCorrectForSnackbar(true)
      } else{
          setCorrectForSnackbar(false)
      }
      if(redirect){
          setRedirectForSnackbar(true)
      } else{
          setRedirectForSnackbar(false)
      }

      setTimeout(() => {
        setVisibilityForSnackbar(false)
        
      }, 3000);
  }
    
  return (
    <div className='signuppage--maincontainer'>

        <Navbar auth={false}/>
        <NotificationSnackbar visibility = {visibilityForSnackbar} message = {messageForSnackbar} correct={correctForSnackbar} redirect={redirectForSnackbar}/>

        { userData[0] ?

       (( Date.now() < userData[0].resetLinkDate + 86400000) && !userData[0].resetLinkUsed)?

        <form className='form--maincontainer'>

         

                <h1 style={{width:"100%",textAlign:"center"}}>Reset password</h1>


                <div className='label--input--container'>
                    <label>Password {formData.newPassword.length < 1 && <span style={{color:"red"}}>*</span>}</label>
                    <input 
                    placeholder='********'
                    value={formData.newPassword} 
                    type={passwordShowType1 ? "password" : "text"}
                    disabled={submitted}
                    onChange={(e)=>{
                        setFormData((old)=>{return {...old, newPassword: e.target.value}})
                      }} 
                    ></input>

                    <button 
                    className='show--password--btn'
                    type='button' 
                    onClick={()=>{
                        setPasswordShowType1(!passwordShowType1)
                    }}
                    >
                        <span 
                        className="material-symbols-outlined">
                            {passwordShowType1 ? "visibility_off" : "visibility"}
                        </span>
                    </button>
                    
                </div>

                <div className='label--input--container'>
                    <label>Confirm password {formData.confirmNewPassword.length < 1 && <span style={{color:"red"}}>*</span>}</label>
                    <input 
                    placeholder='********'
                    value={formData.confirmNewPassword} 
                    type={passwordShowType2 ? "password" : "text"}
                    disabled={submitted}
                    onChange={(e)=>{
                        setFormData((old)=>{return {...old, confirmNewPassword: e.target.value}})
                      }} 
                    ></input>

                    <button 
                    className='show--password--btn'
                    type='button' 
                    onClick={()=>{
                        setPasswordShowType2(!passwordShowType2)
                    }}
                    >
                        <span 
                        className="material-symbols-outlined">
                            {passwordShowType2 ? "visibility_off" : "visibility"}
                        </span>
                    </button>
                    
                </div>


                


                <button className={submitted ? 'form--button2' : "form--button"}
                style={{height:"40px",borderRadius:"80px"}}
                type='submit'
                disabled={submitted}
                 onClick={(e)=>{
                  e.preventDefault()
                  setSubmitted(true)

                  if (formData.newPassword.length === 0 || formData.confirmNewPassword.length === 0){
                    snackBarPopup("Fields can't be empty.")
                    setSubmitted(false)
                  }else if (formData.newPassword.length < 8){
                    snackBarPopup("Password must be atleast 8 characters")
                    setSubmitted(false)
                  } else if (formData.newPassword !== formData.confirmNewPassword){
                    snackBarPopup( "Passwords don't match.")
                    setSubmitted(false)
                  } else if (formData.newPassword === userData[0].password){
                    snackBarPopup("Password can't be changed to old password.")
                    setSubmitted(false)
                  } else if (
                    (formData.newPassword.length !== 0 || formData.confirmNewPassword.length !== 0) &&
                    (formData.newPassword.length > 7) &&
                    (formData.newPassword === formData.confirmNewPassword) && 
                    (formData.newPassword !== userData[0].password)
                  ){
                    editUserPasswordByLink(userData[0].email,formData.newPassword)
                    .then(()=>{

                    snackBarPopup("Password has been changed successfully.",true,true)
                    setSubmitted(false)

                    setFormData(
                      {newPassword: "",
                      confirmNewPassword:"",})
                    setTimeout(() => {
                      navigate('/login')  
                    }, 3000);
                    

                    })
                  }

                  }
                  
                }
                 >
                  {idk}
                 </button>


          
          


        </form>

        :
        <form className='form--maincontainer'>
            <h3 style={{textAlign:"justify"}}>Link was used or has already expired, please request reset again.</h3>
            <button className='form--button'
            onClick={()=>{
              navigate('/login')
            }}>Login</button>
        </form>

        :
        
        <div>
            <h2>Loading</h2>
            
        </div>
        }

    </div>
  )
}
