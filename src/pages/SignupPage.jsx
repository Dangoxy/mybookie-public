import React from 'react'
import "./SignupPage.css"
import Navbar from '../components/Navbar.jsx'

import {addUser,getUserData} from "../firebase.jsx"

import {Link, useNavigate} from "react-router-dom"
import NotificationSnackbar from '../components/NotificationSnackbar.jsx'

import emailjs  from 'emailjs-com';

export default function SignupPage() {

    const navigate = useNavigate()

    React.useEffect(()=>{

      if(localStorage.getItem("key") !== null){
        navigate("/bookmarks")
      }
    },[])
    

    const [formData,setFormData] = React.useState({
        name:"",
        email:"",
        password:"",
        passwordConfirm:"",
    })

    const [passwordShowType1,setPasswordShowType1] = React.useState(true)
    const [passwordShowType2,setPasswordShowType2] = React.useState(true)

    const [currentEmailTemp, setCurrentEmailTemp] = React.useState("")

    const [visibilityForSnackbar, setVisibilityForSnackbar] = React.useState(false)
    const [messageForSnackbar, setMessageForSnackbar] = React.useState("")

    const [submitted, setSubmitted] = React.useState(false);

    const idk = submitted ? <img className="loadingButton" src='LoadingIcon5.png' style={{width:"36px"}}></img> : "Sign up"

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
        setSubmitted(true)

        if ( formData.name.length >= 3 &&
            formData.name.length <= 16 &&
            (formData.email.includes("@") && formData.email.length > 7) &&
            (formData.password === formData.passwordConfirm) &&
            formData.password.length > 7 ){
            
            setCurrentEmailTemp(formData.email)
            console.log("Valid data.")
            
              
                  let tempuser = await getUserData(formData.email)
                  if (tempuser === null){
                  addUser({
                    username: formData.name,
                    email: formData.email ,
                    password : formData.password,
                    itemsList: []})
                    .then(()=>{
                      getUserData(formData.email).then((res)=>{
                        console.log(res)
                        localStorage.setItem("key",res.id)
                        navigate("/bookmarks")
                        setSubmitted(false)

                        emailjs.send(
                          '********',
                          '********',
                          {username: formData.name,email: formData.email},
                          "'********',"
                        )
                      })
                      
  
                    

                      
                      
                    
                    

                  });
                }else{
                  snackBarPopup("Account already exists.")
                  setSubmitted(false)
                }

            /* setFormData({
                name:"",
                email:"",
                password:"",
                passwordConfirm:"",
            }) */
        } 

        else {
            console.log("Invalid data.")
            setSubmitted(false)
            console.log(formData.name.length > 3)
            console.log((formData.email.includes("@") && formData.email.length > 7))
            console.log((formData.password === formData.passwordConfirm))
            console.log(formData.password.length > 7)
            console.log(formData.password.length)
            if((formData.name.length < 4)){
              snackBarPopup("Name must be atleast 3 characters.")
            } else if (formData.name.length >= 16){
              snackBarPopup("Name must be less than 16 characters.")
            } else if(!((formData.email.includes("@") && formData.email.length > 7))){
              snackBarPopup("Please enter a valid email adress.")
            }else if (!(formData.password.length > 7)){
              snackBarPopup("Password must atleast be 8 characters.")
            }else if(!((formData.password === formData.passwordConfirm))){
              snackBarPopup("Passwords do not match.")
            }
        }
    }

  return (
    <div className='signuppage--maincontainer'>

        <Navbar auth={false}/>
        <NotificationSnackbar visibility = {visibilityForSnackbar} message = {messageForSnackbar} />

        <form className='form--maincontainer'>

        <h1>Sign up</h1>
        

                <div className='label--input--container'>
                    <label>Name {formData.name.length < 1 && <span style={{color:"red"}}>*</span>}</label>
                    <input 
                    disabled={submitted}
                    placeholder='John Doe'
                    value={formData.name} 
                    onChange={
                      (e)=>{
                        setFormData((old)=>{ 
                            console.log(formData)
                          return {...old,name:e.target.value}
                        })
                      }} 
                    ></input>
                </div>

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
                    disabled={submitted}
                    placeholder='********'
                    value={formData.password} 
                    type={passwordShowType1 ? "password" : "text"}
                    onChange={
                      (e)=>{
                        setFormData((old)=>{ 
                            console.log(formData)
                          return {...old,password:e.target.value}
                        })
                      }} 
                    ></input>

                    <button 
                    disabled={submitted}
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

                <div className='label--input--container'>
                    <label>Confirm password {formData.passwordConfirm.length < 1 && <span style={{color:"red"}}>*</span>}</label>
                    <input 
                    disabled={submitted}
                    placeholder='********'
                    value={formData.passwordConfirm} 
                    type={passwordShowType2 ? "password" : "text"}
                    onChange={
                      (e)=>{
                        setFormData((old)=>{ 
                            console.log(formData)
                          return {...old,passwordConfirm:e.target.value}
                        })
                      }} 
                    ></input>

                    <button 
                    disabled={submitted}
                    className='show--password--btn'
                    type='button'
                    onClick={()=>{setPasswordShowType2(!passwordShowType2)}}>
                        <span className="material-symbols-outlined">
                            {passwordShowType2 ? "visibility_off" : "visibility"}
                        </span>
                    </button>
                </div>

                
                <button className={submitted ? 'form--button2' : "form--button"}
                disabled={submitted}
                type='submit'
                 onClick={(e)=>{handleSubmit(e)}}
                 >{idk}</button>

                 <Link
                 to={"/login"}
                 > Already have an account?</Link>


        </form>

    </div>
  )
}

