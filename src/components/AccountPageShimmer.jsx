import React from 'react'
import "./AccountPageShimmer.css"

export default function AccountPageShimmer() {
  return (
    <div className='protectedaccountpage--maincontainer'>

        <div className='protectedaccountpage--submaincontainer' style={{maxWidth:"500px"}}>
            
            <div style={{width:"100%"}}></div>


            <div  className='animatingShimmerAccountPage' style={{display:"flex", justifyContent:"space-between",alignItems:"center",gap:"10px",position:"relative",border:"2px solid rgba(225,225,225,0.75)",borderRadius:"24px",padding:"0px 12px"}}>    
                <h2 style={{width:"150px"}}></h2>
                <div style={{width:"2px", height:"36px", backgroundColor:"rgba(225,225,225,0.75)",color:"transparent"}}>.</div>
                <button style={{backgroundColor:"transparent",border:"transparent",width:"24px",height:"24px"}}></button>
            </div>    


            <div  className='animatingShimmerAccountPage' style={{position:"relative", display:"flex",flexDirection:"column",padding:"10px",border:"2px solid rgba(225,225,225,0.75)",borderRadius:"120px"}}>
                <div  style={{width:"128px",height:"128px"}}></div>
                <button className='animatingShimmerAccountPage protectedaccountpage--accountinformationavatar'
                style={{position:"absolute",bottom:"5px",right:"5px",outline:"2px solid rgba(225,225,225,0.75)",borderRadius:"24px",width:"32px",height:"32px",backgroundColor:"rgba(255,255,255,0.75)"}}
                ></button>
            </div>

            
            
            <p className='animatingShimmerAccountPage' style={{color:"rgba(45,45,45)",fontWeight:"600",height:"32px",width:"180px",borderRadius:"8px"}}></p>
        </div>



        <div className='protectedaccountpage--submaincontainer' style={{width:"100%"}}>
            
            

            <h2  className='animatingShimmerAccountPage protectedaccountpage--privacytitle' style={{width:"150px",height:"48px",borderRadius:"8px"}}></h2>

            <div className="protectedaccountpage--privacycontainer">
                
                

            <div className='protectedaccountpage--privacyonesection'>
                <div style={{width:"100%"}}></div>
                    <div style={{display:"flex",justifyContent:"space-between",gap:"10px",width:"100%",alignItems:"center",padding:"0px 10px",boxSizing:"border-box",height:"48px"}}>
                        <h4 className='animatingShimmerAccountPage' style={{height:"48px",borderRadius:"8px",width:"100%",color:"rgba(64,64,64)",fontWeight:"600",fontSize:"1rem",display:"flex",flexDirection:"column",gap:"5px"}}></h4>
                        <h4 className='animatingShimmerAccountPage' style={{fontWeight:"600",padding:"5px 10px",borderRadius:"8px",width:"40px",height:"24px"}}></h4>
                </div>
                    

                        <div style={{width:"100%"}}></div>     
            </div>


            <div className='protectedaccountpage--privacyonesection'>
                <div style={{width:"100%"}}></div>
                    <div style={{display:"flex",justifyContent:"space-between",gap:"10px",width:"100%",alignItems:"center",padding:"0px 10px",boxSizing:"border-box",height:"48px"}}>
                        <h4 className='animatingShimmerAccountPage' style={{height:"48px",borderRadius:"8px",width:"100%",color:"rgba(64,64,64)",fontWeight:"600",fontSize:"1rem",display:"flex",flexDirection:"column",gap:"5px"}}></h4>
                        <h4 className='animatingShimmerAccountPage' style={{fontWeight:"600",padding:"5px 10px",borderRadius:"8px",width:"40px",height:"24px"}}></h4>
                </div>
                    

                        <div style={{width:"100%"}}></div>     
            </div>
            

            <div className='protectedaccountpage--privacyonesection'>
                <div style={{width:"100%"}}></div>
                        <div  style={{display:"flex",justifyContent:"space-between",gap:"10px",width:"100%",alignItems:"center",padding:"0px 10px",boxSizing:"border-box",height:"48px"}}>
                            <h4 className='animatingShimmerAccountPage' style={{height:"48px",borderRadius:"8px",width:"100%",color:"rgba(64,64,64)",fontWeight:"600",fontSize:"1rem",display:"flex",flexDirection:"column",gap:"5px"}}></h4>
                            <h4 className='animatingShimmerAccountPage' style={{fontWeight:"600",padding:"5px 10px",borderRadius:"8px",width:"40px",height:"24px"}}></h4>
                        </div>
                    

                        <div style={{width:"100%"}}></div>     
                </div>
            </div>

            

        </div>
        </div>        
  )
}

