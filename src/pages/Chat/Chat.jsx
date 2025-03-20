import React, { useEffect, useState, useContext, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import axios from "axios";
import { SendHorizontal, SmilePlus, UserRound } from 'lucide-react';
import profilelogo from '../../Photo/defaultprofile2.png'
import { useSocket } from "../../Context/SocketContext";
import defaultprofilepic from '../../Photo/defaultprofilepic.png'



const Chat = () => {
  const socket = useSocket();
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
    if (!socket || !receiverId) return;

    socket.emit("markAsRead", { sender_id: receiverId, receiver_id: usertoken.user.id });
  }, [socket, receiverId]);




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




    socket.on("privateMessage", handlePrivateMessage);

    return () => {
      socket.off("privateMessage", handlePrivateMessage); // Cleanup on unmount
    };
  }, [receiverId, socket]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const msgData = {
      sender_id: usertoken.user.id,
      receiver_id: receiverId,

      message,
    };

    // Save to database
    axios.post("/api/messages", msgData)
      .then((res) => {
        const savedMessage = { ...msgData, message_id: res.data.message_id, created_at: res.data.created_at || new Date().toISOString(), status: "sent" };

        // Notify receiver via WebSocket
        socket.emit("sendMessage", savedMessage);

        // Update UI
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

    // Convert 24-hour format to 12-hour format
    hours = hours % 12 || 12; // Converts 0 to 12 for midnight

    return `${hours}:${minutes} ${ampm}`;
  };

  return (

    <div className="chat-container">
      <div className="chat-scrollbox" ref={chatContainerRef}>
        <div className="receiver-data">
          <div className="receiver-pic">
            <img
              src={receiver.profile_pic ? receiver.profile_pic : defaultprofilepic} loading="lazy" alt="receiverphtot"
              
            />
          </div>
          <h3>{receiver?.username}
          </h3>
          <button className=" button">View Profile</button>
          <div className="receiver-new-chat">
              hsdfsdk
          </div>
        </div>


        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div className={`chat-messaged-each ${msg.sender_id === usertoken.user.id ? "own-message" : "other-message"}`} key={index}>
              <p className="message-text">{msg.message}</p>
              <p className="message-status">
                {msg.created_at ? formatTime(msg.created_at) : "Time N/A"}  {msg.status === "read" ? "✓✓ Read" : msg.status === "delivered" ? "✓ Delivered" : "✓ Sent"}
              </p>
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
