import React from 'react'
import "./NotificationSnackbar.css"

export default function NotificationSnackbar(props) {

    let half1 = ""
    let half2 = ""
    if(props.message){
    console.log(props.message.length)
    let cutmessage = props.message.split(" ")
    console.log(cutmessage)
    let p1 = ""
    let p2 = ""
    for (let i = 0; i < cutmessage.length; i++){
        if(i <= 2){
            p1 += cutmessage[i] + " "
        } else {
            p2 += cutmessage[i] + " "
        }
        
    }
    
    half1 = p1
    half2 = p2
    }

  return (
    <div className='notificationsnackbar--maincontainer' style={props.visibility ? {width:"100%"} : {}}>
        <div id={props.correct ? "green" : ""} className='notificationsnackbar--innercontainer' style={props.visibility ? {minWidth:"200px",maxWidth:"200px",maxHeight:"70px",minHeight:"70px",padding:"10px 20px",borderRadius:"6px"} : {borderRadius:"6px"}}>
            {half1} <br></br> {half2}
            { props.redirect ? <h4>Redirecting..</h4> : ""}
        </div>
    </div>
  )
}
