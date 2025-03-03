import React, { useEffect, useState, useContext, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import axios from "axios";

const socket = io("http://localhost:3000"); 

const Chat = () => {
  const { usertoken } = useContext(UserAuthCheckContext);
  const { receiverId } = useParams();
  const [receiver, setReceiver] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const prevReceiverId = useRef(null); 
 
  
  useEffect(() => {
    if (!usertoken || receiverId === prevReceiverId.current) return ;
    
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


  return (
    <div className="chat-container">
      <h3>Chat with {receiver?.username}</h3>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender_id === usertoken.user.id ? "own-message" : "other-message"}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
export default Chat;
