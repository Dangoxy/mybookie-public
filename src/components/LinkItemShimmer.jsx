import React from 'react'
import "./LinkItemShimmer.css"

export default function LinkItemShimmer(props){

    let tempArray = []

    if (props.counter !== undefined){
        for (let i = 0; i< props.counter; i++){
            tempArray.push(
                <div key={i} className='linkitem--maincontainerShimmer'>

                    <div style={{display:"flex",width:"100%",gap:"10px"}}>
                        <div className='animatingShimmer' style={{width:"24px",height:"24px",borderRadius:"5px"}}></div>
                        <div className='animatingShimmer' style={{width:"100%", height:"24px",borderRadius:"5px"}}></div>
                    </div>
                    

                    <div className='linkitem--buttons'>
                    <div className='animatingShimmer' style={{width:"24px",height:"24px",borderRadius:"5px"}}></div>
                    <div className='animatingShimmer' style={{width:"24px",height:"24px",borderRadius:"5px"}}></div>
                    </div>

                </div>
            )
        }
    } else {
        tempArray.push(
            <div className='linkitem--maincontainerShimmer'>

                <div style={{display:"flex",width:"100%",gap:"10px"}}>
                    <div className='animatingShimmer' style={{width:"24px",height:"24px",borderRadius:"5px"}}></div>
                    <div className='animatingShimmer' style={{width:"100%", height:"24px",borderRadius:"5px"}}></div>
                </div>
                

                <div className='linkitem--buttons'>
                <div className='animatingShimmer' style={{width:"24px",height:"24px",borderRadius:"5px"}}></div>
                <div className='animatingShimmer' style={{width:"24px",height:"24px",borderRadius:"5px"}}></div>
                </div>

            </div>
        )
    }

    console.log(tempArray)
    console.log(props.counter ? props.counter : "")

  return (

    <>
    {tempArray}
    </>
                
  )
}
