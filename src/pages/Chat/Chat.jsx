import React, { useEffect, useState, useContext, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import axios from "axios";
import { SendHorizontal, SmilePlus, UserRound } from 'lucide-react';
import profilelogo from '../../Photo/defaultprofile2.png'

const socket = io("http://localhost:3000");

const Chat = () => {
  const { usertoken } = useContext(UserAuthCheckContext);
  const { receiverId } = useParams();
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const prevReceiverId = useRef(null);
  const chatContainerRef = useRef(null);



  useEffect(() => {
    if (!usertoken || receiverId === prevReceiverId.current) return;

    console.log("Fetching user and messages...");

    prevReceiverId.current = receiverId;

    // Fetch receiver details
    axios.get(`/api/users/chat?userId=${receiverId}`)
      .then((res) => setReceiver(res.data[0]))
      .catch((err) => console.error(err));


    // Fetch chat history
    axios.get(`/api/messages/${receiverId}?userId=${usertoken.user.id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));


  }, [usertoken, receiverId]);



  useEffect(() => {
    const handlePrivateMessage = (msg) => {
      if (msg.sender_id === receiverId || msg.receiver_id === receiverId) {
        setMessages((prev) => {
          // Check if the message already exists in state
          if (prev.some(m => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      }
    };

    socket.off("privateMessage"); // Ensure no duplicate listeners
    socket.on("privateMessage", handlePrivateMessage);

    return () => {
      socket.off("privateMessage", handlePrivateMessage); // Cleanup on unmount
    };
  }, [receiverId]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const msgData = {
      sender_id: usertoken.user.id,
      receiver_id: receiverId,
      message,
    };

    // Save to database
    axios.post("/api/messages", msgData)
      .then(() => {
        socket.emit("sendMessage", msgData);
        setMessages((prev) => [...prev, msgData]);
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
  
    // Convert 24-hour format to 12-hour format
    hours = hours % 12 || 12; // Converts 0 to 12 for midnight
  
    return `${hours}:${minutes} ${ampm}`;
  };

  return (

    <div className="chat-container">
      <div className="chat-scrollbox" ref={chatContainerRef}>
        <div className="receiver-data">
          <div className="receiver-pic" style={{ border: receiver.profile_pic ? 'none' : '3px solid black' }}>
            <img
              src={receiver.profile_pic ? `http://localhost:3000${receiver.profile_pic}` : profilelogo} loading="lazy" alt="receiverphtot"
              style={{ height: receiver.profile_pic ? '5rem' : '4rem' }}
            />



          </div>
          <h3>{receiver?.username} 
          </h3>
        </div>


        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div className={`chat-messaged-each ${msg.sender_id === usertoken.user.id ? "own-message" : "other-message"}`}>
            <p className="message-text">{msg.message}</p>
            <span className="message-time" style={{ color : msg.sender_id !== usertoken.user.id  ?  '#3d3b3b': '', gap : msg.sender_id !== usertoken.user.id ? '0rem' : '0.4rem'}}>{formatTime(msg.created_at)}  <span>{msg.sender_id === usertoken.user.id ? "✔✔" : ''}</span>  </span>
          </div>
          ))}
        </div>
      </div>
          
      <div className="chat-input">
        <div className="chat-input-left">
          <button>

            <SmilePlus size={25} color='black' />
          </button>
        </div>
        <div className="chat-input-right">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}><SendHorizontal size={20} color='white' className="i" /></button>
        </div>

      </div>
    </div>
  );
};
export default Chat;
