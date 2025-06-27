import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSocket } from '../../Context/SocketContext';
import './RandomChat.css'
import { UserAuthCheckContext } from '../../Context/UserAuthCheck';
import CombineAvatat from '../../components/Avatar/CombineAvatat';
import ReportPopup from '../../components/Reports/ReportPopup';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { IconButton, Tooltip } from '@mui/material';
import StraightRoundedIcon from '@mui/icons-material/StraightRounded';
import RepeatIcon from '@mui/icons-material/Repeat';
import { AnimatePresence, motion } from 'framer-motion'
const RandomChat = () => {
    const { usertoken } = useContext(UserAuthCheckContext);
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
    const [report, setReport] = useState(false);
    const [reportingId, setReportingId] = useState(null);
    const [finding, setFinding] = useState(false);
    const [autoClick, setAutoClick] = useState(false);
    const textareaRef = useRef(null);



    const findNewUser = () => {
        setFinding(true)
        setRoomId(null);
        setStrangerInfo(null);
        setStrangerjoin(false)
        setMessages([]);
        setTimeout(() => {

            socket.emit('global_find_partner', { name: user.name, avatar: user.avatar, visibility: user.visibility, userId: user.userId })
        }, 2000);
    };



    useEffect(() => {


        setUser({ name: usertoken.user.username, userId: usertoken.user.id, avatar: usertoken.user.profile_pic ? usertoken.user.profile_pic : 'null', visibility: usertoken.user.visibility });
    }, [usertoken]);



    useEffect(() => {

        if (!roomId && autoClick) {
            setTimeout(() => {
                findNewUser();
            }, 2000);
        }
    }, [strangerLeft, autoClick]);



    const handleJoinLeave = () => {
        if (roomId) {
            socket.emit('global_stranger_left');
            setRoomId(null)
            setStrangerLeft(true);

            setStrangerjoin(false)
            setStrangerInfo(null);


        } else if (!roomId && !finding) {
            findNewUser();
        }

    };

    useEffect(() => {

        if (!socket) return;


        socket.on('global_partner_found', ({ roomId }) => {
            setStrangerjoin(true)

            setFinding(false)
            setStrangerLeft(false)
            setRoomId(roomId);


        });




        socket.on('global_user_typing-private', (data) => {

            setTypingStatus(data.message);

            if (typingTimeout.current) clearTimeout(typingTimeout.current);

            typingTimeout.current = setTimeout(() => {
                setTypingStatus('');
            }, 2000);
        });

        socket.on('global_stranger_left-user', () => {

            setRoomId(null)
            setStrangerLeft(true);

            setStrangerjoin(false)
            setStrangerInfo(null);
        });

        socket.on('global_stranger_info', (stranger1, stranger2) => {
            const stranger = stranger1.id === socket.id ? stranger2 : stranger1;
            setStrangerInfo(stranger);
        });


        socket.on('global_receive_message-private', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.emit('global_stranger_left');

            setTimeout(() => {
                socket.off('global_receive_message-private');

                socket.off('global_user_typing-private');
                socket.off('global_partner_found');
                socket.off('global_stranger_left-user');
                socket.off('global_stranger_info');
            }, 100);


        }
    }, [socket]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);


    const sendMessage = () => {
        if (!canSendMessage) return;

        if (message.trim() !== '') {
            const data = { roomId, name: user.name, avatar: user.avatar, text: message, userId: user.userId };
            socket.emit('global_send_message-private', data);
            setMessage('');

            setCanSendMessage(false);
            setTimeout(() => {
                setCanSendMessage(true);
            }, 1000);
        }
    };

    const handlechange = (e) => {

        setMessage(e.target.value)
        socket.emit('global_typing-private', {
            roomId,
            name: user.name,
            userId: usertoken.user.id,
        });

        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
        }
    }
    const handleReport = () => {
        setReportingId(strangerInfo.sender_id)
        setReport(true);
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";


        hours = hours % 12 || 12;

        return `${hours}:${minutes} ${ampm}`;
    };


    const handleKeyDown = (e) => {
        if (!canSendMessage) return;
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <section className='global-chat'>
            <div className="global-chat-box" ref={chatBoxRef} >
                {strangerInfo && (
                    <div className="global-stranger-info" >
                        <div className="global-stranger-info-l">
                            <CombineAvatat username={strangerInfo.name} profile_pic={strangerInfo.avatar} visibility={strangerInfo.visibility} />

                            <h2 style={{ fontWeight: '600' }} className="">~ {strangerInfo.name}</h2>
                        </div>
                        <div className="global-stranger-info-r" onClick={handleReport}>
                            <Tooltip title='Report'>

                                <IconButton>
                                    <OutlinedFlagIcon sx={{ color: 'var(--blacktextcolor)' }} />
                                </IconButton>
                            </Tooltip>

                        </div>

                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div key={idx} className={`global-message ${user.userId === msg.userId ? 'global-own-message' : 'global-unknown-message'}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 30, opacity: 0 }}
                            className="global-message-item-box">
                            <aside className='global-message-item-box-avatar'>

                                <CombineAvatat username={msg.name} profile_pic={msg.avatar} visibility={msg.userId === user.userId ? user?.visibility : strangerInfo?.visibility} size='1.7rem' iconsize='1.1rem' />
                            </aside>

                            <div>
                                {msg.message}<small>{formatTime(msg.time)}</small>
                            </div>
                        </motion.div>
                    </div>
                ))}
                  <AnimatePresence>

                    {typingStatus && <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        transition={{ ease: 'easeInOut', duration: 0.3 }}
                        className="global-typing-status"> <div className='typing-dots'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div></motion.div>}
                </AnimatePresence>

              
                {!roomId && (<div style={{width : strangerLeft ? '' : '100%'}} className="golbal-chat-intro-text">
                    
                    


                    <div className="global-text-center">
                        {strangerLeft && roomId && (
                        <div className="global-text-center" style={{  color: "var(  --danger-color)"}}>
                            Disconnected.
                        </div>
                    )}
                        <h2>Talk to Strangers, Freely & Anonymously</h2>
                        <p>Connect with someone new. Share your thoughts. No names, no judgment.</p>

                        <ul className="chat-rules-list">
                            <li>✅ Be respectful — no hate speech or harassment.</li>
                            <li>❌ No spamming, nudity, or offensive content.</li>
                            <li>🔐 Stay anonymous — don’t share personal info.</li>
                            <li>👋 You can leave or skip anytime.</li>
                        </ul>
                    {/* {!strangerJoin && !strangerLeft && (<p>Finding Strangers</p>)} */}
                       {finding ? ( <p>We’re finding someone for you...</p> ) : (<p>We'll be find someone for you !</p>)}
                    </div>
                </div>)}

            </div>

            <div className="global-r-chat-input-box">
                <button style={{ background: 'var(--light-blue-color)', color: 'var(--icon-color)' }} className='global-chat-connect' onClick={handleJoinLeave}>{roomId ? "Leave" : finding ? "Connecting..." : "Connect"}</button>

                <IconButton onClick={() => setAutoClick(!autoClick)}>
                    <RepeatIcon sx={{ color: autoClick ? 'var(--blue-color)' : 'var(--blacktextcolor)' }} />
                </IconButton>

                <textarea
                    placeholder="Type your thoughts..."
                    ref={textareaRef}
                    value={message}
                    onChange={handlechange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />




                <button className='global-chat-s-btn' disabled={!strangerJoin} onClick={sendMessage}><StraightRoundedIcon sx={{ fontSize: '2rem' }} /></button>

            </div>
            {report && (<ReportPopup reportedId={reportingId} reportingId={usertoken.user.id} onClose={() => setReport(false)} />)}
        </section>
    )
}

export default RandomChat
