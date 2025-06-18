import React, { useEffect, useState, useContext, useRef } from "react";
import { Helmet } from "react-helmet";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import axios from "axios";
import { SendHorizontal, SmilePlus, UserRound } from 'lucide-react';

import { useSocket } from "../../Context/SocketContext";

import { Avatar, Tooltip } from "@mui/material";
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import ReportPopup from "../../components/Reports/ReportPopup";
import StraightRoundedIcon from '@mui/icons-material/StraightRounded';
import { motion } from "framer-motion";
import ChatSkeleton from "../../components/Fallback/ChatSkeleton";
import AnonymousAavatar from "../../components/Avatar/AnonymousAavatar";



const Chat = () => {
  const socket = useSocket();
  const { usertoken } = useContext(UserAuthCheckContext);
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const prevReceiverId = useRef(null);
  const chatContainerRef = useRef(null);
  const [showReports, setShowReport] = useState(false);
  const textareaRef = useRef(null);
  const [chatloading, setChatLoading] = useState(true);
  const { receiverId } = useParams();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const parsedReceiverId = parseInt(receiverId);






  useEffect(() => {
    if (!usertoken || parsedReceiverId === prevReceiverId.current) return;




    const fetchReceiver = async () => {

      try {
        const response = await axios.get(`/api/messages/chat/data?userId=${parsedReceiverId}`);
        setReceiver(response.data[0])

      } catch (err) {
        console.error(err)
      }

    }
    fetchReceiver();

    const messagefetch = async () => {

      try {
        const response = await axios.get(`/api/messages/${parsedReceiverId}?userId=${usertoken.user.id}`);
        setMessages(response.data);

      } catch (err) {
        console.error(err)
      }
      finally {
        setChatLoading(false);
      }
    }

    messagefetch();


  }, [usertoken, parsedReceiverId]);


  useEffect(() => {
    if (!socket || !parsedReceiverId) return;

    socket.emit("markAsRead", { sender_id: parsedReceiverId, receiver_id: usertoken.user.id });
  }, [socket, parsedReceiverId]);





  useEffect(() => {



    const handlePrivateMessage = (msg) => {

      if (parseInt(msg.sender_id) === parsedReceiverId) {

        socket.emit("markAsRead", {
          sender_id: parsedReceiverId,
          receiver_id: usertoken.user.id,
        });
      }



      setMessages((prevMessages) => {
        if (parseInt(msg.sender_id) === usertoken.user.id) {

          return prevMessages.map((m) => {

            return m.id === msg.id ? { ...m, status: msg.status } : m
          }
          );
        } else if (

          parseInt(msg.receiver_id) === usertoken.user.id &&
          parseInt(msg.sender_id) === parsedReceiverId
        ) {


          return [...prevMessages, msg];
        }
        return prevMessages;
      });
    };



    const handleMessageRead = ({ sender_id, receiver_id }) => {


      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.sender_id === sender_id && msg.receiver_id === parsedReceiverId && msg.status !== "read") {
            return { ...msg, status: "read" };
          }
          return msg;
        })
      );
    };





    socket.on("privateMessage", handlePrivateMessage);

    socket.on("messageRead", handleMessageRead);

    return () => {
      socket.off("privateMessage", handlePrivateMessage);
      socket.off("messageRead", handleMessageRead);

    };
  }, [parsedReceiverId, socket, usertoken?.user?.id]);



  useEffect(() => {
    if (!socket || !parsedReceiverId) return;

    const handleModeChange = (data) => {

      const { id, username, visibility, profile_pic } = data.results[0];


      if (parseInt(id) === parseInt(parsedReceiverId)) {


        setReceiver((prev) => ({
          ...prev,
          username: username,
          profile_pic: profile_pic === "null" ? null : profile_pic,
          visibility: visibility
        }));
      } else {

        return;
      }

    }
    socket.on("modeChanged", handleModeChange);
    return () => {
      socket.off("modeChanged", handleModeChange);
    }
  }, [socket])


  const sendMessage = () => {
    if (message.trim() === "") return;

    const msgData = {
      sender_id: usertoken.user.id,
      receiver_id: parsedReceiverId,

      message,
    };


    axios.post("/api/messages", msgData)
      .then((res) => {

        const savedMessage = {
          ...msgData,
          id: res.data.message_id,
          created_at: res.data.created_at || new Date().toISOString(),
          status: "sent"
        };

        setMessages((prev) => [...prev, savedMessage]);
        setMessage("");
      })
      .catch((err) => console.error(err));
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";


    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);


    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };



  return (

    <div className="chat-container">
      <Helmet>
        <title>Chat – Connect Anonymously | Bindhash</title>
        <meta
          name="description"
          content="Start or continue private and anonymous chats on Bindhash. Share your thoughts freely and connect emotionally with people who truly understand."
        />
      </Helmet>
      <div className="chat-scrollbox" ref={chatContainerRef}>
        <div className="receiver-data">
          <div className="receiver-pic">

            {receiver.visibility === 'anonymous' ? (<AnonymousAavatar size='40px' />) : (<Avatar src={receiver?.profile_pic} alt={receiver.username} sx={{ height: '32px', width: '32px' }} />)}
            <h3>{receiver?.username}
            </h3>
          </div>
          <div className="receiver-new-chat">
            {receiver?.philosophy || ''}
          </div>
          <div className="receiver-activity ">
            <Tooltip title="view profile ">
              <button style={{ padding: '0.5rem 1rem' }} className="active">View</button>
            </Tooltip>

            <Tooltip title="Report">
              <OutlinedFlagIcon className='btnhover' sx={{ cursor: 'pointer', height: "3rem", width: "3rem" }} onClick={() => setShowReport(true)} />

            </Tooltip>
            {showReports && (<ReportPopup
              reportedId={parsedReceiverId}
              reportingId={usertoken?.user.id}
              onClose={() => {
                setShowReport(false)
              }}
            />)}

          </div>
        </div>


        <div className="chat-messages">
          {!chatloading ? messages.map((msg, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: '0.3', ease: 'easeInOut' }}
              className={`chat-messaged-each ${msg.sender_id === usertoken.user.id ? "own-message" : "other-message"}`} key={index}>
              <p className="message-text">{msg.message}</p>
              <p className="message-status">
                {msg.created_at ? formatTime(msg.created_at) : "Time N/A"} {msg.sender_id === usertoken.user.id && (msg.status === "read" ? "✓✓ Read" : msg.status === "delivered" ? "✓ Delivered" : `✓ ${msg.status}`)}
              </p>
            </motion.div>
          )) : (
            <ChatSkeleton />
          )}
        </div>
      </div>

      <div className="chat-input">
        <div className="chat-input-left">
          <button>

            <SmilePlus size={25} />
          </button>
        </div>
        <div className="chat-input-right">
          <textarea
            ref={textareaRef}
            placeholder="Type a message..."
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          <button onClick={sendMessage}><StraightRoundedIcon sx={{ fontSize: '2rem', color: 'var(--bothwhitecolor)' }} className="i active" /></button>
        </div>

      </div>
    </div>
  );
};
export default Chat;
