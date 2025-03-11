import React, { useEffect, useState } from 'react'
import './Bangbox.css'

const Bangbox = ({size,click}) => {
    const [clickstate, setClickstate] = useState(false)
  
    useEffect(()=>{
        if(click === true){
            setClickstate(true)
        }else{
            setClickstate(false)
         }
   
    },[click])
  return (
    <>
    
    {clickstate ? (<a href='/' className='bangbox' style={{fontSize : size ? size : "1.8rem"}}>
      <span>B</span>ingb<span>o</span>x
    </a>) : ( <h1 href='/' className='bangbox' style={{fontSize : size ? size : "1.8rem"}}>
      <span>B</span>ingb<span>o</span>x
    </h1>)}
    
   
    </>
  )
}

export default Bangbox
