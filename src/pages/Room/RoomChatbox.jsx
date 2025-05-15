import React, { use, useEffect } from 'react'
import './RoomChatbox.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'


const RoomChatbox = ({subroomname}) => {
    const {chatroomname} = useParams();
    const location = useLocation();
    const subroom = location.state?.room;
    const navigate = useNavigate();
    const [chattile, setchatTitle] = React.useState("");

   
  

    let roomnamedynamic = subroomname || chatroomname;

    

    useEffect(() => { 
       
        const chattitle = roomnamedynamic.split('-').join(' ');
        setchatTitle(chattitle);

    },[location.pathname,roomnamedynamic,subroomname,chatroomname]);    
 
  return (
    <aside id='roomchat-chating-box-subchat'>
        <nav className='roomchat-chating-box-header' > 
            <h3> # {chattile} 🩷</h3>
           </nav>

        <div className="roomchat-c-b-l">
    
        </div>
        <div className="roomchat-c-b-input">

        </div>
    </aside>
  )
}

export default RoomChatbox
