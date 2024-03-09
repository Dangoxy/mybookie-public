import React from 'react'
import "./Howto.css"
import {getUserById} from "../firebase"
import Navbar from '../components/Navbar'
import NotificationSnackbar from '../components/NotificationSnackbar'

export default function Howto() {

    const currentKey = localStorage.getItem("key")
    const [userData, setUserData] = React.useState({})

    async function idkidk(){
      return await getUserById(currentKey)
    }

    React.useEffect(()=>{
      idkidk().then((res)=>{return setUserData(res)})
    },[])

    const [visibilityForSnackbar, setVisibilityForSnackbar] = React.useState(false)
    const [messageForSnackbar, setMessageForSnackbar] = React.useState("")
    const [correctForSnackbar, setCorrectForSnackbar] = React.useState(false)

  return (
    <div className='howto--maincontainer'>
        <Navbar auth={true} data={userData[0]} fixed ={true}/>
        <NotificationSnackbar visibility = {visibilityForSnackbar} message = {messageForSnackbar} />

        <div className='howto--submaincontainer'>


            


            <div className='howto--submaincontainersection'>

                <h2 style={{width:"100%",textAlign:"center"}}>Bookmarks page</h2>

                <img src='Howto111.png' ></img>
                <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"10px"}}>
                    <p><span style={{fontWeight:"800"}}>1)</span> Link input field.</p>
                    <p><span style={{fontWeight:"800"}}>2)</span> Add button (used for both the link input field and the upload file button).</p>
                    <p><span style={{fontWeight:"800"}}>3)</span> Upload .txt file button.</p>
                    <p><span style={{fontWeight:"800"}}>4)</span> Clear button (clears all items in your bookmarks list).</p>
                </div>
            

            
                <img src='Howto2.png' ></img>
                <ol style={{width:"100%",display:"flex",flexDirection:"column",gap:"10px"}}>
                    <p><span style={{fontWeight:"800"}}>5)</span> Logo of the website.</p>
                    <p><span style={{fontWeight:"800"}}>6)</span> Link of the website.</p>
                    <p><span style={{fontWeight:"800"}}>7)</span> Copy button (copies the url of the website).</p>
                    <p><span style={{fontWeight:"800"}}>8)</span> Delete button (deletes the link item from your bookmarks list).</p>
                </ol>
            </div>

            <div className='howto--submaincontainersection'>

                <h2 style={{width:"100%",textAlign:"center"}}>Importing bookmarks to My Bookie</h2>

                
                <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"10px"}}>
                    <p><span style={{fontWeight:"800"}}>1)</span> You will need to export your bookmarks from your browser first.</p>
                    <p><span style={{fontWeight:"800"}}>1.1)</span> Here are some sources to do so from your browser:</p>
                    <p><span style={{fontWeight:"800"}}>1.1.1)</span>  <a href="https://www.process.st/how-to/export-microsoft-edge-bookmarks/" target="_blank">Microsoft Edge</a> </p>
                    <p><span style={{fontWeight:"800"}}>1.1.2)</span>  <a href="https://support.google.com/chrome/answer/96816?hl=en" target="_blank">Google Chrome</a> </p>
                    <p><span style={{fontWeight:"800"}}>1.1.3)</span>  <a href="https://support.mozilla.org/en-US/kb/export-firefox-bookmarks-to-backup-or-transfer" target="_blank">Mozilla Firefox</a> </p>
                    <p><span style={{fontWeight:"800"}}>1.1.4)</span>  <a href="https://forums.opera.com/topic/40531/exporting-bookmarks-and-settings-from-opera-to-other-browsers" target="_blank">Opera / OperaGX</a> </p>
                    <p><span style={{fontWeight:"800"}}>2)</span> After exporting you will have a "bookmarks.html" file, rename the file's extention from ".html" to ".txt". Heres a step by step on how to <a href='https://www.lifewire.com/change-file-extension-windows-11-7734887#:~:text=Now%20that%20Windows%2011%20displays,Enter%2C%20and%20then%20select%20Save.'>convert the file type</a>.</p>
                    <p><span style={{fontWeight:"800"}}>3)</span> Now all you have to do is just click on the upload button in the "My bookmarks" page and select the newly named .txt file and click the add button.</p>
                </div>
                
            </div>

            <div className='howto--submaincontainersection'>
                <h2 style={{width:"100%",textAlign:"center"}}>Profile page</h2>

                <img src='Howto3.png' ></img>
                <ol style={{width:"100%",display:"flex",flexDirection:"column",gap:"10px"}}>
                    <p><span style={{fontWeight:"800"}}>1)</span> Username.</p>
                    <p><span style={{fontWeight:"800"}}>2)</span> Currently selected avatar.</p>
                    <p><span style={{fontWeight:"800"}}>3)</span> The date the user joined.</p>
                    <p><span style={{fontWeight:"800"}}>4)</span> Edit buttons.</p>
                    <p><span style={{fontWeight:"800"}}>5)</span> The list of avatars.</p>
                    <p><span style={{fontWeight:"800"}}>6)</span> Confirm button for avatars.</p>
                </ol>

                <img src='Howto44.png' ></img>
                <ol style={{width:"100%",display:"flex",flexDirection:"column",gap:"10px"}}>
                    <p><span style={{fontWeight:"800"}}>1)</span> Email tab.</p>
                    <p><span style={{fontWeight:"800"}}>2)</span> Password tab.</p>
                    <p><span style={{fontWeight:"800"}}>3)</span> Account deletion tab.</p>
                    <p><span style={{fontWeight:"800"}}>4)</span> Buttons that extend the seleted tab to open a form.</p>
                </ol>
            </div>

            


        </div>

    </div>
  )
}
