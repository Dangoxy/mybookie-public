import React from 'react'
import Navbar from '../components/Navbar'
import "./ProtectedAccountPage.css"
import {getUserById,editUserPhoto,editUserUsername,addUserWithData,deleteUser,editUserPassword} from "../firebase"
import AccountPageShimmer from '../components/AccountPageShimmer'
import NotificationSnackbar from '../components/NotificationSnackbar'
import {useNavigate} from "react-router-dom"

export default function ProtectedAccountPage() {

    let avatars = [
        "profilepictures11.png",
        "profilepictures12.png",
        "profilepictures13.png",
        "profilepictures14.png",
        "profilepictures15.png",
        "profilepictures16.png",
        "profilepictures17.png",
        "profilepictures18.png",
        "profilepictures19.png",
        "profilepictures20.png",
        "profilepictures21.png",
        "profilepictures22.png"
    ]

    const navigate = useNavigate()

    const [flagForStylesChangeAvatar,setFlagForStylesChangeAvatar] = React.useState(false)
    const [flagForStylesDisplayName,setFlagForStylesDisplayName] = React.useState(false)
    const [flagForStylesEmail,setFlagForStylesEmail] = React.useState(false)
    const [flagForStylesPassword,setFlagForStylesPassword] = React.useState(false)
    const [flagForStylesAccountDelete,setFlagForStylesAccountDelete] = React.useState(false)

    const [currentSelectedPicture,setCurrentSelectedPicture] = React.useState("profilepicturesdefault.png")

    const [nameChangeIndicator, setNameChangeIndicator] = React.useState(false)

    const [currentNameInput,setCurrentNameInput] = React.useState("")

    const currentKey = localStorage.getItem("key")
    const [userData, setUserData] = React.useState({})

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

    async function idkidk(){
      return await getUserById(currentKey)
    }

    React.useEffect(()=>{
      idkidk().then((res)=>{return setUserData(res)})
    },[])

    React.useEffect(()=>{
        if(userData[0]){
            setCurrentNameInput(userData[0].username)
            setCurrentSelectedPicture(userData[0].profilePicture)
            
        }
    },[userData[0]])


    

    if (userData[0]){
        const created = new Date(userData[0].created).toLocaleDateString("en-GB")
        console.log(created)

        console.log(userData)
    }

    const [submitted, setSubmitted] = React.useState(false);
    const doneSubmit = submitted ? <img className="loadingButton" src='LoadingIcon5.png' style={{width:"24px"}}></img> : "done"
    

    const [submittedEmailChange, setSubmittedEmailChange] = React.useState(false);
    const changeSubmit = submittedEmailChange ? <img className="loadingButton" src='LoadingIcon5.png' style={{width:"24px"}}></img> : "Change"

    const [submittedPasswordChange, setSubmittedPasswordChange] = React.useState(false);
    const changeSubmit2 = submittedPasswordChange ? <img className="loadingButton" src='LoadingIcon5.png' style={{width:"24px"}}></img> : "Change"

    const [submittedAccountDelete, setSubmittedAccountDelete] = React.useState(false);
    const accountDeleteSubmit = submittedAccountDelete ? <img className="loadingButton" src='LoadingIcon5.png' style={{width:"24px"}}></img> : "Confirm deletion"

    const [submittedAvatar, setSubmittedAvatar] = React.useState(false);
    const avatarSubmit = submittedAvatar ? <img className="loadingButton" src='LoadingIcon5.png' style={{width:"24px"}}></img> : "Confirm"
    const avatarSubmit2 = submittedAvatar ? <img className="loadingButton" src='LoadingIcon5.png' style={{width:"24px"}}></img> : <span className="material-symbols-outlined">edit</span>


    const [emailInput, setEmailInput] = React.useState({
        oldEmail: "",
        newEmail: "",
        confirmNewEmail: "",
    })

    const [passwordInput, setPasswordInput] = React.useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    })

    const [accountDeleteInput, setAccountDeleteInput] = React.useState({
        email: "",
        password: "",
        confirm: "",
    })

  return (
    <div>
        <Navbar auth={true} data={userData[0]} fixed={true}/>
        
        
        

        {userData[0] ?

        <div className='protectedaccountpage--maincontainer'>

            <NotificationSnackbar visibility = {visibilityForSnackbar} message = {messageForSnackbar} correct={correctForSnackbar} redirect={redirectForSnackbar}/>

        <div className='protectedaccountpage--submaincontainer' style={{maxWidth:"400px"}}>
            
            {/* <div style={{width:"100%"}}></div> */}

            
            
            

            
            

            
                
            
                {!nameChangeIndicator ? 
            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",gap:"10px",position:"relative",border:"2px solid rgba(225,225,225,0.75)",borderRadius:"24px",padding:"0px 12px",backgroundColor:"rgba(255,255,255,0.15)"}}>    
                <h2 style={{}}>{userData[0] && userData[0].username}</h2>
                <div style={{width:"2px", height:"36px", backgroundColor:"rgba(225,225,225,0.75)",color:"transparent"}}>.</div>
                <button style={{backgroundColor:"transparent",border:"transparent",width:"24px",height:"24px"}}
                onClick={()=>{setNameChangeIndicator(true)}}>
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                </button>
            </div>    
        :
            <form>
            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",gap:"0px",position:"relative",border:"2px solid rgba(225,225,225,0.75)",borderRadius:"24px",padding:"0px 8px",paddingLeft:"0px"}}>
                
                <input 
                disabled={submitted}
                value={currentNameInput}
                onChange={(e)=>{
                    setCurrentNameInput(e.target.value)
                }}
                style={{maxWidth:"200px",fontSize:"1.4rem",width:"100%",borderRadius:"32px",borderTopRightRadius:"0px",borderBottomRightRadius:"0px",border:"0px solid rgba(225,225,225)",height:"36px",backgroundColor:"rgba(255,255,255,0.5)",outline:"none",paddingLeft:"16px",boxSizing:"border-box"}} /* value={userData[0] && userData[0].username} */></input>

                <div style={{width:"2px", height:"36px", backgroundColor:"rgba(225,225,225,0.75)",color:"transparent"}}>.</div>

                <button 
                disabled={submitted}
                type='button'
                style={{backgroundColor:"transparent",border:"transparent",width:"24px",height:"24px",marginLeft:"5px"}}
                onClick={()=>{setNameChangeIndicator(false)}}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>

                <div style={{width:"2px", height:"100%", backgroundColor:"rgba(225,225,225,0.75)",color:"transparent",margin:"0px 5px"}}>.</div>

                <button 
                disabled={submitted}
                type='submit'
                style={{backgroundColor:"transparent",border:"transparent",width:"24px",height:"24px"}}
                onClick={(e)=>{
                    e.preventDefault()
                    setSubmitted(true)
                    if(currentNameInput !== "" && currentNameInput.length <= 20 && currentNameInput !==  userData[0].username){
                        editUserUsername(userData[0].email, currentNameInput).then(()=>{idkidk().then((res)=>{setNameChangeIndicator(false);setSubmitted(false);return setUserData(res)})})
                        
                    } else if(currentNameInput.length >= 21) {
                        snackBarPopup("Name limit is 20 characters.")
                        setSubmitted(false)
                    } else if(currentNameInput ===  userData[0].username){
                        snackBarPopup("Same name.")
                        setSubmitted(false)
                    } else if(currentNameInput.length <= 3){
                        snackBarPopup("name must be more than 3 characters.")
                        setSubmitted(false)
                    }
                }}>
                    <span className="material-symbols-outlined">
                        {doneSubmit}
                    </span>
                </button>

            </div>
            </form>

            
        }
        <div style={{width:"100%"}}></div>
        <div style={{position:"relative", display:"flex",flexDirection:"column",padding:"10px",border:"2px solid rgba(225,225,225,0.75)",borderRadius:"120px",backgroundColor:"rgba(255,255,255,0.15)"}}>
            <img style={{width:"128px"}} src={userData[0] && userData[0].profilePicture}></img>
            <button className='protectedaccountpage--accountinformationavatar'
            style={{position:"absolute",bottom:"5px",right:"5px",outline:"2px solid rgba(225,225,225,0.75)",borderRadius:"24px",width:"32px",height:"32px",backgroundColor:"rgba(255,255,255,0.95)"}}
            disabled={submittedAvatar}
            onClick={()=>{
                setFlagForStylesChangeAvatar(!flagForStylesChangeAvatar);
            }}>
                {avatarSubmit2}
            </button>
            </div>
            
            
                <div className='protectedaccountpage--avatarscontainer' style={!flagForStylesChangeAvatar ? { maxHeight:"0px",padding: "0px 20px"} : {border:" 2px solid rgba(255,255,255,0.25)"}}>
                    <div className='idk--centered'>
                        {avatars.map((one)=>{
                            return(
                            <button style={{backgroundColor:"transparent", borderRadius:"50px",padding:"5px",outline:"none"}}
                            disabled={submittedAvatar}>
                            <img 
                            key={one}
                            src={one} 
                            style={one === currentSelectedPicture? {width:"64px", outline:"2px solid rgba(255,255,255,0.5)",boxSizing:"border-box",borderRadius:"50px"} : {width:"64px",borderRadius:"50px"}}
                            onClick={()=>{
                                setCurrentSelectedPicture(one);
                            }}
                            ></img>
                            </button>
                            )
                        })}
                    </div>

                    <button
                    style={{height:"32px",width:"80px",borderRadius:"100px"}}
                    disabled={submittedAvatar}
                    onClick={()=>{
                        setSubmittedAvatar(true)
                        editUserPhoto(userData[0].email, currentSelectedPicture).then(()=>{idkidk().then((res)=>{setSubmittedAvatar(false);setFlagForStylesChangeAvatar(false);return setUserData(res)})})
                    }}
                    >
                        {avatarSubmit}
                    </button>
                </div>
        
        <p style={{color:"rgba(45,45,45)",fontWeight:"600"}}><span style={{color:"rgba(75,75,75)",fontSize:"1.05rem"}}>Joined </span>{new Date(userData[0].created).toLocaleDateString("en-GB")} </p>

            

        </div>

        <div style={{width:"100%", border:"1px solid rgba(128,128,128,0.25)"}}></div>


        <div className='protectedaccountpage--submaincontainer' style={{width:"100%",border:"none"}}>
            
            

            <h2 className='protectedaccountpage--privacytitle'>Account settings</h2>

            <div className="protectedaccountpage--privacycontainer">
                
                

                <div className='protectedaccountpage--privacyonesection'>
                    <div style={{width:"100%"}}></div>
                        <div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center",padding:"0px 10px",boxSizing:"border-box"}}>
                            <h4 style={{color:"rgba(64,64,64)",fontWeight:"600",fontSize:"1rem",display:"flex",flexDirection:"column",gap:"5px"}}>Email<br></br><span style={{fontWeight:"600",fontSize:"1.2rem",color:"rgba(25,25,25)"}}>{userData[0] && "*".repeat(userData[0].email.substr(0,userData[0].email.indexOf("@")).length) + userData[0].email.substr(userData[0].email.indexOf("@"))}</span></h4>
                            <button style={{fontWeight:"600",padding:"5px 10px",border:"2px solid rgba(255,255,255,0.5)",outline:"none",borderRadius:"8px",backgroundColor:"rgba(255,255,255,0.25)"}}
                            onClick={()=>{setFlagForStylesEmail(!flagForStylesEmail);setFlagForStylesAccountDelete(false);setFlagForStylesPassword(false);}}
                            disabled={submittedEmailChange}
                            >Edit</button>
                        </div>

                    <form style={{width:"100%"}}>
                    <div className='protectedaccountpage--fullViewOfChange'
                    style={!flagForStylesEmail ? {maxHeight:"0px",padding:"0px 10px"} : {} } >
                        
                        <div className='label--input--container2'>
                            <label>Old email</label>
                            <input 
                            disabled={submittedEmailChange}
                            placeholder='Old email'
                            value={emailInput.oldEmail}
                            onChange={(e)=>{
                                setEmailInput((old)=>{return {...old,oldEmail:e.target.value}})
                            }}
                            ></input>
                        </div>

                        <div className='label--input--container2'>
                            <label>New email</label>
                            <input 
                            disabled={submittedEmailChange}
                            placeholder='New email'
                            value={emailInput.newEmail}
                            onChange={(e)=>{
                                setEmailInput((old)=>{return {...old,newEmail:e.target.value}})
                            }}
                            ></input>
                        </div>

                        <div className='label--input--container2'>
                            <label>Confirm new email</label>
                            <input 
                            disabled={submittedEmailChange}
                            placeholder='Confirm new email'
                            value={emailInput.confirmNewEmail}
                            onChange={(e)=>{
                                setEmailInput((old)=>{return {...old,confirmNewEmail:e.target.value}})
                            }}
                            ></input>
                        </div>

                        <button
                        disabled={submittedEmailChange}
                        type='submit'
                        style={{height:"32px"}}
                        onClick={(e)=>{
                            e.preventDefault()
                            setSubmittedEmailChange(true)

                            if(emailInput.oldEmail === userData[0].email &&
                                (emailInput.newEmail.includes("@") && emailInput.newEmail.length > 7) &&
                                emailInput.newEmail === emailInput.confirmNewEmail &&
                                emailInput.newEmail !== emailInput.oldEmail)
                                {
                                    addUserWithData({
                                        email: emailInput.newEmail,
                                        username: userData[0].username,
                                        password: userData[0].password,
                                        itemsList: userData[0].itemsList,
                                        profilePicture: userData[0].profilePicture,
                                        id: userData[0].id,
                                        date: userData[0].created})
                                        .then(()=>{deleteUser(userData[0].email)
                                        .then(()=>{
                                            idkidk()
                                            .then((res)=>{return setUserData(res)})
                                            .then(()=>{
                                                snackBarPopup("Changed successfully",true);
                                                setSubmittedEmailChange(false);
                                                setEmailInput({oldEmail:"",newEmail:"",confirmNewEmail:""});
                                                setFlagForStylesEmail(false);
                                            })
                                        })
                                        })

                                    console.log(emailInput)
                                }

                            else if(emailInput.oldEmail !== userData[0].email) {
                                snackBarPopup("Old Email is incorrect.")
                                setSubmittedEmailChange(false)
                            }
                            else if(!emailInput.newEmail.includes("@") || emailInput.newEmail.length < 8) {
                                snackBarPopup("New email must have a valid format.")
                                setSubmittedEmailChange(false)
                            }
                            else if(emailInput.newEmail !== emailInput.confirmNewEmail) {
                                snackBarPopup("New email and Confirm email don't match.")
                                setSubmittedEmailChange(false)
                            }
                            else if (emailInput.newEmail === emailInput.oldEmail) {
                                snackBarPopup("New email cannot be the same as the old one.")
                                setSubmittedEmailChange(false)
                            }
                            else if (emailInput.newEmail === ""){
                                snackBarPopup("New email field is empty.")
                                setSubmittedEmailChange(false)
                            }

                            
                            
                            
                        }}
                        >{changeSubmit}</button>
                    </div>
                    </form>

                </div>

                <div className='protectedaccountpage--privacyonesection'>
                <div style={{width:"100%"}}></div>
                        <div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center",padding:"0px 10px",boxSizing:"border-box"}}>
                            <h4 style={{color:"rgba(64,64,64)",fontWeight:"600",fontSize:"1rem",display:"flex",flexDirection:"column",gap:"5px"}}>Password<br></br><span style={{fontWeight:"600",fontSize:"1.2rem",color:"rgba(25,25,25)"}}>{userData[0] && "*".repeat( userData[0].password.length) }</span></h4>
                            <button style={{fontWeight:"600",padding:"5px 10px",border:"2px solid rgba(255,255,255,0.5)",outline:"none",borderRadius:"8px",backgroundColor:"rgba(255,255,255,0.25)"}}
                            disabled={submittedPasswordChange}
                            onClick={()=>{setFlagForStylesPassword(!flagForStylesPassword);setFlagForStylesAccountDelete(false);setFlagForStylesEmail(false);}}
                            >Edit</button>
                        </div>
                    <div className='protectedaccountpage--fullViewOfChange'
                    style={!flagForStylesPassword ? {maxHeight:"0px",padding:"0px 10px"} : {}} >

                        <div className='label--input--container2'>
                            <label>Old password</label>
                            <input 
                            disabled={submittedPasswordChange}
                            value={passwordInput.oldPassword} 
                            onChange={(e)=>{
                                setPasswordInput((old)=>{return {...old,oldPassword:e.target.value}})
                            }}
                            placeholder='Old password'
                            ></input>
                        </div>

                        <div className='label--input--container2'>
                            <label>New password</label>
                            <input 
                            disabled={submittedPasswordChange}
                            value={passwordInput.newPassword} 
                            onChange={(e)=>{
                                setPasswordInput((old)=>{return {...old,newPassword:e.target.value}})
                            }}
                            placeholder='New password'
                            ></input>
                        </div>

                        <div className='label--input--container2'>
                            <label>Confirm new password</label>
                            <input 
                            disabled={submittedPasswordChange}
                            value={passwordInput.confirmNewPassword} 
                            onChange={(e)=>{
                                setPasswordInput((old)=>{return {...old,confirmNewPassword:e.target.value}})
                            }}
                            placeholder='Confirm new password'
                            ></input>
                        </div>

                        <button className='protectedaccountpage--buttons'
                        style={{height:"32px"}}
                        onClick={(e)=>{
                            e.preventDefault()
                            setSubmittedPasswordChange(true)

                            if(passwordInput.oldPassword === userData[0].password &&
                                passwordInput.newPassword === passwordInput.confirmNewPassword &&
                                passwordInput.newPassword.length > 7 &&
                                passwordInput.newPassword !== userData[0].password){
                                    editUserPassword(userData[0].email,passwordInput.newPassword)
                                    .then(()=>{
                                        idkidk()
                                        .then((res)=>{return setUserData(res)})
                                        .then(()=>{
                                            snackBarPopup("Password has been changed successfully",true);
                                            setSubmittedPasswordChange(false);
                                            setPasswordInput({oldPassword:"",newPassword:"",confirmNewPassword:""});
                                            setFlagForStylesPassword(false);
                                        })
                                    })
                                    
                            } else if(passwordInput.oldPassword !== userData[0].password){
                                snackBarPopup("Old password is incorrect.")
                                setSubmittedPasswordChange(false);
                            } else if(passwordInput.newPassword !== passwordInput.confirmNewPassword){
                                snackBarPopup("New passwords don't match.")
                                setSubmittedPasswordChange(false);
                            } else if(passwordInput.newPassword.length < 8){
                                snackBarPopup("New password must be atleast 8 characters.")
                                setSubmittedPasswordChange(false);
                            } else if(passwordInput.newPassword === userData[0].password){
                                snackBarPopup("New password can't be the old password.")
                                setSubmittedPasswordChange(false);
                            } else if(passwordInput.newPassword === ""){
                                snackBarPopup("Password field empty.")
                                setSubmittedPasswordChange(false);
                            }

                        }}
                        >{changeSubmit2}</button>
                    </div>
                </div>

                <div className='protectedaccountpage--privacyonesection' style={{backgroundColor:"rgba(200,0,0,0.75)"}}>
                <div style={{width:"100%"}}></div>
                        <div style={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center",padding:"0px 10px",boxSizing:"border-box"}}>
                            <h4 style={{fontWeight:"600",fontSize:"1rem",display:"flex",flexDirection:"column",gap:"5px",color:"rgba(255,255,255)",textShadow:"1px 1px 2px rgba(0,0,0,1)"}}>Delete account</h4>
                            <button style={{fontWeight:"600",padding:"5px 10px",border:"2px solid rgba(255,255,255,0.5)",outline:"none",borderRadius:"8px",backgroundColor:"rgba(255,0,0,0.5)",color:"rgba(255,255,255,0.95)"}}
                            disabled={submittedAccountDelete}
                            onClick={()=>{setFlagForStylesAccountDelete(!flagForStylesAccountDelete);setFlagForStylesPassword(false);setFlagForStylesEmail(false);}}
                            >Delete</button>
                        </div>
                    <form style={{width:"100%"}}>
                    <div className='protectedaccountpage--fullViewOfChange'
                    style={!flagForStylesAccountDelete ? {maxHeight:"0px",padding:"0px 10px"} : {}} >

                        <div className='label--input--container2'>
                            <label>Email</label>
                            <input 
                            disabled={submittedAccountDelete}
                            value={accountDeleteInput.email} 
                            onChange={(e)=>{
                                setAccountDeleteInput((old)=>{return {...old,email:e.target.value}})
                            }}
                            placeholder='Email'
                            ></input>
                        </div>

                        <div className='label--input--container2'>
                            <label>Password</label>
                            <input 
                            disabled={submittedAccountDelete}
                            value={accountDeleteInput.password} 
                            onChange={(e)=>{
                                setAccountDeleteInput((old)=>{return {...old,password:e.target.value}})
                            }}
                            placeholder='Password'
                            ></input>
                        </div>

                        <div className='label--input--container2'>
                            <label>Confirmation</label>
                            <input 
                            disabled={submittedAccountDelete}
                            value={accountDeleteInput.confirm} 
                            onChange={(e)=>{
                                setAccountDeleteInput((old)=>{return {...old,confirm:e.target.value}})
                            }}
                            placeholder='I confirm.'
                            ></input>
                        </div>

                        

                        <button className='protectedaccountpage--buttons'
                        style={{height:"32px"}}
                        type='submit'
                        onClick={(e)=>{
                            e.preventDefault()
                            setSubmittedAccountDelete(true)
                            console.log(accountDeleteInput)

                            if( accountDeleteInput.email === userData[0].email &&
                                accountDeleteInput.password === userData[0].password &&
                                accountDeleteInput.confirm === "I confirm."){
                                deleteUser(userData[0].email)
                                .then(()=>{
                                    localStorage.removeItem("key")
                                    snackBarPopup("Account deleted.", true, true)
                                    setSubmittedAccountDelete(false)

                                    setTimeout(() => {
                                        navigate("/")
                                    }, 2000);
                                    
                                    
                                })

                            } else if(accountDeleteInput.email !== userData[0].email){
                                snackBarPopup("Incorrect email.")
                                setSubmittedAccountDelete(false)
                            } else if(accountDeleteInput.password !== userData[0].password){
                                snackBarPopup("Incorrect password.")
                                setSubmittedAccountDelete(false)
                            } else if(accountDeleteInput.confirm !== "I confirm."){
                                snackBarPopup('Enter "I confirm." in the confirmation field.')
                                setSubmittedAccountDelete(false)
                            }

                            }}
                        >{accountDeleteSubmit}</button>
                    </div>
                    </form>
                </div>
            </div>

        </div>
        </div>        

        :
        
        <AccountPageShimmer/>

        }
    </div>
  )
}
