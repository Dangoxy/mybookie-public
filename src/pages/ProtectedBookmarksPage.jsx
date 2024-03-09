import React, { useEffect } from 'react'

import {useNavigate} from "react-router-dom"
import Navbar from '../components/Navbar.jsx'

import {getUserById,getUserDataLinks,editUserInfo} from "../firebase.jsx"

import "./ProtectedBookmarksPage.css"
import LinkItem from '../components/LinkItem.jsx'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import LinkItemShimmer from '../components/LinkItemShimmer.jsx'
import NotificationSnackbar from '../components/NotificationSnackbar.jsx'


export default function ProtectedBookmarksPage() {

    const navigate = useNavigate()

    const currentKey = localStorage.getItem("key")

    console.log(currentKey)

    const [userData, setUserData] = React.useState({})

    const [submittedAdd, setSubmittedAdd] = React.useState(false);
    const addSubmit = submittedAdd ?
      <img className="loadingButton" src='LoadingIcon5.png' style={{width:"24px"}}></img> 
    : "Add"

    const [submittedRemoveAll, setSubmittedRemoveAll] = React.useState(false);
    const removeAllSubmit = submittedRemoveAll ?
      <img className="loadingButton" src='LoadingIcon5.png' style={{width:"24px"}}></img> 
    : "YES"

    async function idkidk(){
        return await getUserById(currentKey)
    }

    useEffect(()=>{
        idkidk().then((res)=>{return setUserData(res)})
    },[])

    console.log( userData == {} || userData[0] == undefined ?  "" : userData[0].username)

    const [userLinksFromDB,setUserLinksFromDB] = React.useState("")

    useEffect(()=>{
      if (!(userData == {} || userData[0] == undefined)){
      setUserLinksFromDB(userData[0].itemsList)
      }
    },[userData])

    console.log( userData == {} || userData[0] == undefined ?  "" : userData[0].itemsList)

    const [currentInputLink,setCurrentInputLink] = React.useState("")

    console.log(currentInputLink)

    console.log(userLinksFromDB)
    let bruh = userLinksFromDB

    async function addLinkToListDB(link){

      setSubmittedAdd(true)
      

      if(currentInputLink !== ""){

        let newLink = ''
        if (link.includes("https://") || link.includes("http://")){
          newLink = link;
        } 
        else{
          newLink = "http://" + link;
        }
        

        let tempArray = [{name: newLink,link: newLink},...userLinksFromDB]
        let tempNoDuplicates = [...new Set(tempArray)]
        setUserLinksFromDB([...new Set(tempArray)])

        await editUserInfo(userData[0].email,[...tempNoDuplicates])
        .then(idkidk().then((res)=>{
          
          setUserData(res)
          snackBarPopup("Added link to bookmarks.",true)
          setSubmittedAdd(false)
        }))

        

        setCurrentInputLink("")

      }
      else if (currentFileContent !== ""){
        console.log(currentFileContent + "HERE   SASDASD")

        let tempArr = []

        for (let i = 0; i < currentFileContent.split(/\r?\n|\r|\n/g).length; i++){
          let currentLine = currentFileContent.split(/\r?\n|\r|\n/g)[i]
          /* console.log(currentLine) */
          if (currentLine.indexOf("<A HREF=") > -1 && currentLine.indexOf("ADD_DATE") > -1){
          let editedLine = currentLine.substring(currentLine.indexOf("<A HREF=")+9,currentLine.indexOf("ADD_DATE")-2)
          let editedLine2 = currentLine.substring(currentLine.lastIndexOf('">')+2,currentLine.lastIndexOf("</A>"))
          editedLine2 = editedLine2.replace("&#39;","'")
          editedLine2 = editedLine2.replace("&amp;","&")
          /* console.log(editedLine2) */
          tempArr.push({link: editedLine,name: editedLine2})
          }
          
      }


        let tArray = [...userData[0].itemsList,...tempArr.reverse()]
        var uniq = {};
        let tempNoDuplicates = tArray.filter(obj => !uniq[obj.link] && (uniq[obj.link] = true));
        
        

        /* console.log(tArray) */
      
        await editUserInfo(userData[0].email,[...tempNoDuplicates])
        .then(idkidk()
        .then((res)=>{
          
          setUserData(res)
          setUserLinksFromDB(tempNoDuplicates)
          
          snackBarPopup("Added bookmarks by file.", true)
          setSubmittedAdd(false)
        }))

        

        setCurrentFile("")
        setCurrentFileContent("")

        

      }

      else{
        snackBarPopup("No link or file found.", false)
        setSubmittedAdd(false)
      }


    }

    

    async function removeLinkFromListDB(link){
      let arr = bruh;

      // Remove item 'seven' from array
      
      bruh = arr.filter(function(e) {return e.link !== link })
      

      //=> ["three", "eleven"]

      await editUserInfo(userData[0].email,[...bruh])
      .then(idkidk()
      .then((res)=>{
        
      setUserData(res)
      snackBarPopup("Deleted from list.", false)
      }))
      
      

      
    }
    

    const [currentFile, setCurrentFile] = React.useState("")
    const [currentFileContent, setCurrentFileContent] = React.useState("")

    const [content, setContent] = React.useState()

    const [fullList, setFullList] = React.useState([])

    const [visibilityForSnackbar, setVisibilityForSnackbar] = React.useState(false)
    const [messageForSnackbar, setMessageForSnackbar] = React.useState("")
    const [correctForSnackbar, setCorrectForSnackbar] = React.useState(false)
    const [redirectForSnackbar, setRedirectForSnackbar] = React.useState(false)

    const [areYouSureDeletion,setAreYouSureDeletion] = React.useState(false)

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
    <div>
        <Navbar auth={true} data={userData[0]}/>
        
        

        <div className='protectedpage--maincontainer'>
        
          <NotificationSnackbar visibility = {visibilityForSnackbar} message = {messageForSnackbar} correct={correctForSnackbar} redirect={redirectForSnackbar}/>

          <div 
          style={areYouSureDeletion ? {
            position:"fixed",
            width:"100%",
            boxSizing:"border-box",
            bottom:"0px",
            minHeight:"80px",
            backgroundColor:"rgba(255,0,0,0.75)",
            backdropFilter:"blur(4px)",
            padding:"10px",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            flexDirection:"column",
            } : {display:"none"}}>

              <h3 style={{width:"100%",textAlign:"center"}}>Are you sure you want to delete all bookmarks?</h3>
              <div style={{display:"flex",alignContent:"center",justifyContent:"space-around",width:"100%"}}>
                <button style={{
                  padding:"4px 12px",
                  border:"none",
                  outline:"none",
                  borderRadius:"32px",
                  backgroundColor:"rgba(200,200,200,0.5)",
                  color:"white",
                  fontWeight:"500",
                  minHeight:"32px",
                  minWidth:"64px",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center"}}
                  onClick={()=>{
                    setSubmittedRemoveAll(true)
                    editUserInfo(userData[0].email,[])
                    .then(idkidk()
                    .then((res)=>{
                      snackBarPopup("Removed all bookmarks from list.")
                      setSubmittedRemoveAll(false)
                      setAreYouSureDeletion(false)
                      setUserLinksFromDB([])
                      return setUserData(res)
                    }))
                    
                  }}>{removeAllSubmit}</button>

                <button style={{
                  padding:"4px 12px",
                  border:"none",
                  outline:"none",
                  borderRadius:"32px",
                  backgroundColor:"rgba(200,200,200,0.5)",
                  color:"white",
                  fontWeight:"500",
                  minHeight:"32px",
                  minWidth:"64px",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center"}}
                  onClick={()=>{
                    setAreYouSureDeletion(false)
                  }}>NO</button>
              </div>

          </div>
        {/* {(userData == {} || userData[0] === undefined) ?  <h1>loading</h1> : <h1>{userData[0].username}</h1>} */}

        
        <div className='protectedpage--linkitemscontainer'>

            {userLinksFromDB && (userLinksFromDB.length > 0) ? userLinksFromDB.map((item)=>{
                /* console.log(item) */
                
                return(
                <LinkItem key={item.link + item.name} url={item.link} name={item.name} removeFunction={removeLinkFromListDB} snackbar={snackBarPopup}/>
                )

            }) : userLinksFromDB && (userLinksFromDB.length === 0) ?
            <h3 style={{width:"100%",textAlign:"center",fontWeight:"500"}}>Your bookmarks seem to be empty. Try adding some.</h3> :
            <><LinkItemShimmer counter={15}/></>
            }

        </div>
        
        <form className='protectedpage--form'>
            <input placeholder='Link'
            
            onChange={
              (e)=>{
                setCurrentInputLink(()=>{ 
                  return e.target.value
                });}}
            value={currentInputLink}
                ></input>

            <button type='submit'  
            style={{display:"flex",justifyContent:"center",alignItems:"center",minWidth:"50px",maxWidth:"50px"}}
            onClick={(e)=>{
              e.preventDefault()
              addLinkToListDB(currentInputLink);
              
            }}>{addSubmit}</button>

    

            
            <input type='file' name='inputfile' id='inputfile' className='inputfile' accept=".txt"
            value={currentFile}
            onChange={
                (e)=>{
                  setCurrentFileContent(()=>{ 
                    return e.target.value
                  });
                  setCurrentFile(()=>{ 
                    return e.target.value
                  });

                  let fr = new FileReader();

                  fr.readAsText(e.target.files[0]);

                  fr.onload = function(){
                    setCurrentFileContent(fr.result)
                  }


                }} ></input>

            
            

            <button type='button'
            id='resetButton'
            style={{display:"flex",justifyContent:"center",alignItems:"center"}}
            onClick={()=>{
              setAreYouSureDeletion(true)
            }}
            >
              <span className="material-symbols-outlined">playlist_remove</span>
            </button>
        </form>
        
            
        

        
        

        </div>


    </div>
  )
}
