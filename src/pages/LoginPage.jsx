import React, { useEffect } from 'react'
import "./SignupPage.css"
import Navbar from '../components/Navbar.jsx'

import {getProfiles, getUserData} from "../firebase.jsx"

import {Link, useNavigate} from "react-router-dom"

import "./LoginPage.css"
import { sum } from 'firebase/firestore/lite'

import NotificationSnackbar from '../components/NotificationSnackbar.jsx'



export default function LoginPage() {

    const navigate = useNavigate()

    React.useEffect(()=>{

      if(localStorage.getItem("key") !== null){
        navigate("/bookmarks")
      }
    },[])

    const [formData,setFormData] = React.useState({

        email:"",
        password:"",

    })

    const [passwordShowType1,setPasswordShowType1] = React.useState(true)


    const [profiles,setProfiles] = React.useState([])
    const [currentSessionKey, setCurrentSessionKey] = React.useState("")

    /* useEffect(()=>{
        getProfiles().then((data)=>{setProfiles(data)})
    },[]) */
    

    

    const [submitted, setSubmitted] = React.useState(false);

    const [errorMsgForEmail, setErrorMsgForEmail] = React.useState("")
    const [errorMsgForPassword, setErrorMsgForPassword] = React.useState("")

    const [submitErrorTriggered, setSubmitErrorTriggered] = React.useState(false)

    const [visibilityForSnackbar, setVisibilityForSnackbar] = React.useState(false)
    const [messageForSnackbar, setMessageForSnackbar] = React.useState("")

    function snackBarPopup(message){
      setMessageForSnackbar(message)
      setVisibilityForSnackbar(true)

      setTimeout(() => {
        setVisibilityForSnackbar(false)
      }, 3000);
    }

    async function handleSubmit(e){
        e.preventDefault()
        console.log(formData)


        if(formData.email.length === 0) {
          snackBarPopup("Please enter an email.")
        } else if (!formData.email.includes("@")){
          snackBarPopup("Please enter a valid email")
        
        } else if(formData.password.length === 0){
          snackBarPopup("Please enter a password")
        }
        
        
        if (!(formData.email.length === 0) && !(formData.password.length === 0) && formData.email.includes("@")){
          setSubmitted(true)
          let tempuser = await getUserData(formData.email);
          
          if (tempuser !== null){
              console.log("Exists")
              

              if((tempuser.email === formData.email) 
              && (tempuser.password === formData.password)){

                  console.log(tempuser)
                  
                  console.log("Account found")
                  setCurrentSessionKey(tempuser.id)
                  localStorage.setItem("key",tempuser.id)
                  navigate("/bookmarks")
                  setSubmitted(false)

              } else{
                console.log("Invalid email or password.")
                setSubmitted(false)


                snackBarPopup("Invalid email or password.")
                
              }
              
          } else{
              console.log("Doesn't exist.")
              setSubmitted(false)


              snackBarPopup("Invalid email or password.")
          }

      }
        
    }

    const idk = submitted ? <img className="loadingButton" src='LoadingIcon5.png' style={{width:"36px"}}></img> : "Login"
    
    React.useEffect(()=>{
      
    },[formData])
    

  return (
    <div className='signuppage--maincontainer'>

        <Navbar auth={false}/>
        <NotificationSnackbar visibility = {visibilityForSnackbar} message = {messageForSnackbar} />

        <form className='form--maincontainer'>

                <h1>Login</h1>
                

                <div className='label--input--container'>
                    <label>E-mail {formData.email.length < 1 && <span style={{color:"red"}}>*</span>}</label>
                    <input 
                    disabled={submitted}
                    placeholder='johndoe@email.com'
                    value={formData.email} 
                    onChange={
                      (e)=>{
                        

                        setFormData((old)=>{ 
                            console.log(formData)
                          return {...old,email:e.target.value}
                        })
                      }} 
                    ></input>
                </div>

                
                
                

                <div className='label--input--container'>
                    <label>Password {formData.password.length < 1 && <span style={{color:"red"}}>*</span>}</label>
                    <input 
                    placeholder='********'
                    value={formData.password} 
                    type={passwordShowType1 ? "password" : "text"}
                    disabled={submitted}
                    onChange={
                      (e)=>{
                        setFormData((old)=>{ 
                            console.log(formData)
                          return {...old,password:e.target.value}
                        })
                      }} 
                    ></input>

                    <button 
                    className='show--password--btn'
                    type='button' 
                    onClick={()=>{setPasswordShowType1(!passwordShowType1)}}
                    >
                        <span 
                        className="material-symbols-outlined">
                            {passwordShowType1 ? "visibility_off" : "visibility"}
                        </span>
                    </button>
                    
                </div>


                


                <button className={submitted ? 'form--button2' : "form--button"}
                type='submit'
                disabled={submitted}
                 onClick={(e)=>{handleSubmit(e)}}
                 >
                  {idk}
                 </button>

                <p>Don't have an account? <Link
                 to={"/signup"}
                 >Sign Up</Link></p>

                <Link
                 to={"/forgotpassword"}
                 >Forgot your password?</Link>


        </form>

    </div>
  )
}

