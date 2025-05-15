import React, { useContext, useEffect, useRef, useState } from 'react'
import './RandomsubroomChat.css';
import { useSocket } from '../../Context/SocketContext';
import { UserAuthCheckContext } from '../../Context/UserAuthCheck';
import { useLocation, useParams } from 'react-router-dom';
import OverlapAvatar from '../../components/Avatar/OverlapAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import axios from 'axios';
import ReportPopup from '../../components/Reports/ReportPopup';
import defaultprofilepic from '../../Photo/defaultprofilepic.png'
import Tooltip from '@mui/material/Tooltip';
import SendIcon from '@mui/icons-material/Send';




const RandomsubroomChat = () => {
  const socket = useSocket()


  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });
  const chatBoxRef = useRef(null);
  const [typingStatus, setTypingStatus] = useState('')
  const typingTimeout = useRef(null);
  const [roomId, setRoomId] = useState(null)
  const [strangerLeft, setStrangerLeft] = useState(false)
  const [strangerJoin, setStrangerjoin] = useState(false)
  const [strangerInfo, setStrangerInfo] = useState(null);
  const [canSendMessage, setCanSendMessage] = useState(true);
  const { usertoken } = useContext(UserAuthCheckContext);
  const location = useLocation();
  const subroomid = location.state?.subroomid || null;
  const [showReports, setShowReport] = useState(false);
  const { slug } = useParams();
  const [reportdId, setRortedId] = useState(null);
  const [autoMatching,SetAutomatching] = useState(false);
  const [newUserFind,setNewUserFind] = useState(false);

  let subRoomIdChat;


  const subroomidSlug = slug.split('-').pop();


  if (!subroomid) {
    subRoomIdChat = subroomidSlug;
  } else {
    subRoomIdChat = subroomid;
  }





  const findNewUser = () => {
    setMessages([]);
    setNewUserFind(true);
    setRoomId(null);
    setStrangerInfo(null);
    setStrangerjoin(false)
    setTimeout(() => {
        socket.emit('random_find_partner', { name: user.name, avatar: user.avatar, text: message, subroomId: subRoomIdChat, userId: usertoken?.user.id })
    }, 5000);
    
  };


  useEffect(() => {
    if (usertoken?.user) {
      setUser({ name: usertoken.user.username, avatar: usertoken.user.profile_pic ? usertoken.user.profile_pic : defaultprofilepic });
    }
  }, [usertoken]);


  useEffect(() => {
    if (autoMatching) {

      findNewUser();
    }
  }, [user]);

  useEffect(() => {
    if (strangerLeft && autoMatching) {
      setTimeout(() => {
        findNewUser();
      }, 2000);
    }
  }, [strangerLeft]);





  useEffect(() => {

    if (!socket) return;


    socket.on('random_partner_found', ({ roomId }) => {
      setNewUserFind(false);
      setStrangerjoin(true)


      setStrangerLeft(false)
      setRoomId(roomId);


    });




    socket.on('random_user_typing-private', (data) => {

      setTypingStatus(data.message);

      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      typingTimeout.current = setTimeout(() => {
        setTypingStatus('');
      }, 2000);
    });

    socket.on('random_stranger_left', () => {
    
      setRoomId(null)
      setStrangerLeft(true);


      setStrangerjoin(false)
      setStrangerInfo(null);
      setMessages([]);


    });

    socket.on('random_stranger_info', (stranger1, stranger2) => {
      const stranger = stranger1.id === usertoken.user.id ? stranger2 : stranger1;
      setStrangerInfo(stranger);
      setRortedId(stranger.id);



    });


    socket.on('random_receive_message-private', (data) => {

      setMessages((prev) => [...prev, data]);
    });







    return () => {
      socket.emit('random_stranger_left');
      socket.off('random_receive_message-private');

      socket.off('random_user_typing-private');
      socket.off('random_partner_found');
      socket.off('random_stranger_left');
      socket.off('random_stranger_info');


    }
  }, [socket]);

  //   useEffect(() => {
  //         const disconectHandle = () => {
  //             if (document.visibilityState === "hidden") {
  //                 socket.emit("random_stranger_left");
  //             }
  //         }
  //         document.addEventListener("visibilitychange", disconectHandle);

  //         return ()=> document.removeEventListener('visibilitychange',disconectHandle);
  //     }, [])


  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);


  const sendMessage = () => {
    if (!canSendMessage) return;

    if (message.trim() !== '') {
      const data = { roomId, name: user.name, avatar: user.avatar, message };
      socket.emit('random_send_message-private', data);
      setMessage('');

      setCanSendMessage(false);
      setTimeout(() => {
        setCanSendMessage(true);
      }, 1000);
    }
  };

  const handlechange = (e) => {

    setMessage(e.target.value)
    socket.emit('random_typing-private', { roomId, name: user.name });
  }





  return (
    <section className='sbr-r-chat'>
      <div className="sbr-r-chat-box scrollbar" ref={chatBoxRef}>
        <AnimatePresence>
          {strangerInfo && strangerJoin && (
            <motion.div
              className="sbr-r-stranger-info"
              initial={{ scale: 1, y: 50, x: 0, opacity: 0 }}
              animate={{ scale: 1, y: 0, x: 0, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >


              <aside style={{ display: 'flex', flexDirection: 'row', gap: '0.3rem' }}>
                <OverlapAvatar
                  username={strangerInfo.name}
                  profile_pic={strangerInfo.avatar}
                  secondusername={usertoken.user.username}
                  secondprofile_pic={usertoken.user.profile_pic}
                  size="40"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="chat-usernames"
                >
                  {strangerInfo.name} <br />  {usertoken.user.username}
                </motion.div>
              </aside>
              <div className="sbr-r-report-box ">

                <Tooltip title="Report">
                  <OutlinedFlagIcon className='btnhover' sx={{ cursor: 'pointer', height: "3rem", width: "3rem" }} onClick={() => setShowReport(true)} />
               
                </Tooltip>
            

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {strangerInfo && roomId ? (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ padding: '0rem 1rem' }}
                transition={{ duration: 0.3 }}
                className={`sbr-r-message ${user.name === msg.name ? 'sbr-r-own-message' : 'sbr-r-unknown-message'}`}
              >
                <div className="sbr-r-message-item-box">
                  <img src={msg.avatar} alt="avatar" className="sbr-r-avatar" />
                  <p className='sbr-r-chat-messages'>
                    {/* <strong>{msg.name}:</strong>  */}
                    {msg.message}
                    <small className='sbr-r-time-data'>{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </small>
                  </p>
                </div>
              </motion.div>
            ))
          ) : ( 
           newUserFind ? (<motion.div
              className="sbr-r-typing-status"
              key="finding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              🔍 Finding a stranger...
            </motion.div>) : (
            !strangerLeft && ( <motion.div 
              className='sbr-r-nutral-chat'
              >
                Let Connect With Similar Mindset.


              </motion.div>)
            )
          )}
        </AnimatePresence>

        {typingStatus && <div className="sbr-r-typing-status">{typingStatus}</div>}
      </div>

      <div className="sbr-r-typing-container ">
        <div className="sbr-r-typing-inside">
        <button className="sbr-r-new-leave active">
          
        {!roomId ? (  
          newUserFind ? (<span> Matching...</span>) : (<span onClick={()=>{
            findNewUser();
          }}>Connect</span>)
        ) : (
          <spane onClick = {()=> 
            
            {
              socket.emit('random_stranger_left');
              setStrangerInfo(null);
              setRoomId(null);
             }
          
          }>Leave</spane>
        )}
           
        </button>
        <textarea
          placeholder="Type your thoughts..."
          value={message}
          onChange={handlechange}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className='scrollbar'
        />

        <button className='sbr-r-button active' disabled={!strangerJoin} onClick={sendMessage}><SendIcon sx={{height : 20 , width : 20}}/></button>
        </div>
      </div>

      <AnimatePresence>
        {!roomId && strangerLeft && (
          <motion.div
            className="sbr-r-stranger-left-popup"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            Stranger has left the chat. Searching for a new match...
          </motion.div>
        )}

        {showReports && (<ReportPopup
          reportedId={reportdId}
          reportingId={usertoken?.user.id}
          onClose={() => {
            setShowReport(false)
          }}
        />)}
      </AnimatePresence>
    </section>
  )
}
export default RandomsubroomChat
