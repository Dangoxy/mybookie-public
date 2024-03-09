import React, { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import NotificationSnackbar from '../components/NotificationSnackbar.jsx'
import {v4 as uuidv4} from "uuid";

import {getProfiles, getUserData, editUserPassword,getUserById,editUserResetLink} from "../firebase.jsx"

import {Link, useNavigate,useParams} from "react-router-dom"

import emailjs  from 'emailjs-com';


export default function ForgotPasswordPage() {
    
    let [userData,setUserData] = React.useState({})


    /* React.useEffect(()=>{
    idkidk().then((res)=>{return setUserData(res)})
    },[]) */


    /* console.log(userData[0]);

    console.log(websiteURL1)
    

    console.log(keyByParam) */

    
    const navigate = useNavigate()

    React.useEffect(()=>{
        if(localStorage.getItem("key") !== null){
            navigate("/bookmarks")
        }
    },[])
    

    

    const [formDataEmail,setFormDataEmail] = React.useState("")


    const [submitted, setSubmitted] = React.useState(false);
    
    const idk = submitted ? <img className="loadingButton" src='LoadingIcon5.png' style={{width:"36px"}}></img> : "Submit"




    

    const [errorMsgForEmail, setErrorMsgForEmail] = React.useState("")

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

       

        <form className='form--maincontainer'>

                <h1 style={{width:"100%",textAlign:"center"}}>Forgot password</h1>


                <div className='label--input--container'>
                    <label>Email {formDataEmail.length < 1 && <span style={{color:"red"}}>*</span>}</label>
                    <input 
                    placeholder='JohnDoe@email.com'
                    value={formDataEmail} 
                    disabled={submitted}
                    onChange={(e)=>{
                        setFormDataEmail(e.target.value)
                      }} 
                    ></input>

                    
                </div>

               


                


                <button className={submitted ? 'form--button2' : "form--button"}
                style={{height:"40px",borderRadius:"80px"}}
                type='submit'
                disabled={submitted}
                 onClick={(e)=>{
                    e.preventDefault()
                    setSubmitted(true)
                    
                    

                        
                        
                    if(formDataEmail.length === 0){
                        snackBarPopup("Please fill the email field.")
                        setSubmitted(false)
                    } else if(!formDataEmail.includes("@") || formDataEmail.length <  9){
                        snackBarPopup("Please enter a correct email format.")
                        setSubmitted(false)
                    } else {
                        getUserData(formDataEmail).then((res)=>{
                            console.log(res)
                            if(res !== null){
                                
                                let websiteURL1 = window.location.origin
                                let idForLink = uuidv4() + uuidv4()

                                emailjs.send(
                                    '********',
                                    '********',
                                    {username:res.username,link:websiteURL1 + "/#/resetpassword/" + idForLink,email:formDataEmail},
                                    '********'
                                    )
                                .then((result) => {
                                editUserResetLink(formDataEmail,idForLink)
                                
                                console.log(result.text);
                                snackBarPopup("Password reset link has been sent.", true,true)
                                setSubmitted(false)
                                setFormDataEmail("")
                                setTimeout(() => {
                                    navigate("/")    
                                }, 3000);
                                
                                

                                }); 

                            } else{
                                snackBarPopup("Email doesn't exist.")
                                setSubmitted(false)
                            }
                            
                        });
                        

                        
                    }
                    

                 }}>
                  {idk}
                 </button>

                


        </form>


    </div>
  )
}
