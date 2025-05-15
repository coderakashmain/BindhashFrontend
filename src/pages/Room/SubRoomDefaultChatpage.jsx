import React from 'react'
import { useParams } from 'react-router-dom'
import './SubRoomDefaultChatpage';


const SubRoomDefaultChatpage = () => {
    const {category, slug} = useParams();
    const roomname = slug.split("-").slice(0,-1).join(" ").toUpperCase();
    
    
  return (
    <aside id="default-subroompage">
        <h3>{roomname}</h3>
    </aside>
  )
}

export default SubRoomDefaultChatpage
