import React, { use, useEffect } from 'react'
import './RoomChatbox.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'


const RoomChatbox = ({ subroomname }) => {
  const { chatroomname, category, slug, } = useParams();
  const location = useLocation();
  const subroom = location.state?.room;
  const navigate = useNavigate();
  const [chattile, setchatTitle] = React.useState("");




  let roomnamedynamic = subroomname || chatroomname;


      const chatroomNamedefuault = category.split('-').slice(0, -1).join(' ');
        const subroomnamedefault = slug.split('-').slice(0, -1).join(' ');


  useEffect(() => {

    const chattitle = roomnamedynamic.split('-').join(' ');
    setchatTitle(chattitle);

  }, [location.pathname, roomnamedynamic, subroomname, chatroomname]);

  return (
    <aside id='roomchat-chating-box-subchat'>
      <Helmet>
        <title>{`${chattile.toUpperCase()} | ${chatroomNamedefuault} – ${subroomnamedefault} | Group Chat – Bindhash`}</title>
        <meta
          name="description"
          // content={`Join the "${chattile}" group in the ${subroomnamedefault} of ${chatroomNamedefuault}. Chat in a ${isPrivate ? 'private' : 'public'} space with others who relate to your journey on Bindhash.`}
          content={`Join the "${chattile.toUpperCase()}" group in the ${subroomnamedefault} of ${chatroomNamedefuault}. Chat in a private  space with others who relate to your journey on Bindhash.`}
        />
      </Helmet>
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
