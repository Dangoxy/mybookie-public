import React from 'react'
import "./LinkItem.css"



import {getUserById} from "../firebase.jsx"

export default function LinkItem(props) {
    

    const copyContent = async () => {
        try {
          await navigator.clipboard.writeText(props.url);
          console.log('Content copied to clipboard');
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }

    const [submitted, setSubmitted] = React.useState(false);
    const delSubmit = submitted ?
      <img className="loadingButton" src='LoadingIcon5.png' style={{width:"24px"}}></img> 
    : <span className="material-symbols-outlined">delete</span>
    
    async function removeLinkItem(){
        setSubmitted(true)
        await props.removeFunction(props.url)
    
    }

   

  return (
    <div className='linkitem--maincontainer'>
        
        
        <a 
        className='linkitem--data'
        target='_blank'
        href={props.url}>
            <img src={"https://s2.googleusercontent.com/s2/favicons?sz=32&domain_url="+ props.url} ></img>
            <h3>{props.name}</h3>
        </a>
        

        <div className='linkitem--buttons'>
            
            <a>
                <span className="material-symbols-outlined"
                onClick={()=>{
                    copyContent();
                    props.snackbar("Link copied to clipboard.", true)
                }}>
                    content_copy
                </span>
            </a>

            {/* <a>
                <span className="material-symbols-outlined">
                    edit
                </span>
            </a> */}

            <a onClick={()=>{
                    removeLinkItem()
                    
                    }}>
                {delSubmit}
            </a>
        </div>
        
        
    </div>
  )
}
