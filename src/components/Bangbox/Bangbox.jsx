import React, { useEffect, useState } from 'react'
import './Bangbox.css'
import Avatar from '@mui/material/Avatar';
import { deepOrange, green ,blue} from '@mui/material/colors';
import { ChatBubbleOutline } from '@mui/icons-material';

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
    
    {clickstate ? (<a href='/' className='bangbox' style={{fontSize : size ? size : "1.8rem" }}>
    <span>
      <ChatBubbleOutline style={{fontSize : size ? size : 32, color  : '#1976d2'}}/>
    </span>
      <span>
      
        Bindhash
        
        </span>
    </a>) : ( <h1 className='bangbox' style={{fontSize : size ? size : "1.8rem"}}>
       <span>
      <ChatBubbleOutline style={{fontSize : size ? size : 32, color  : '#1976d2'}}/>
    </span>
      <span>
     
      Bindhash</span>
    </h1>)}
    
   
    </>
  )
}

export default Bangbox
