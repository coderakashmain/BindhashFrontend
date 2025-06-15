import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import './Userlist.css'
import { ArrowRightLeft } from 'lucide-react'
import profilelogo from '../../Photo/defaultprofilepic.png'
import '../../App.css'
import Newaccount from "../../components/Newaccount/Newaccount";
import { MobileViewContext } from '../../Context/MobileResizeProvider'
import { Avatar } from "@mui/material";
import TruncatedText from "../../components/TextReducer/TruncatedText";
import {

  SecurityOutlined,

} from "@mui/icons-material"
import ChatListSkeleton from "../../components/Fallback/ChatListSkeleton";
import AnonymousAavatar from "../../components/Avatar/AnonymousAavatar";
import { useSocket } from "../../Context/SocketContext";

const UserList = () => {
  const { usertoken } = useContext(UserAuthCheckContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { isMobile } = useContext(MobileViewContext);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();





  useEffect(() => {
    if (!usertoken) return;
    setLoading(true);
    axios.get(`/api/messages/users?userId=${usertoken.user.id}`)
      .then((res) => {
        const sorted = res.data.sort((a, b) =>
          new Date(b.last_message_time) - new Date(a.last_message_time)
        );
        setUsers(sorted);
        setLoading(false);
      }
      )
      .catch((err) => {
        setLoading(false);
        console.error(err)
      });


  }, [usertoken]);








  useEffect(() => {
    if (!socket) return;

    const handleModeChange = (data) => {

      const { id, username, visibility, profile_pic } = data.results[0];




      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === parseInt(id)
            ? {
              ...user,
              username,
              visibility,
              profile_pic: profile_pic === "null" ? null : profile_pic,
            }
            : user
        )
      );


    }





    const handlePrivateMessage = (msg) => {
      const { sender_id, receiver_id, message, created_at, status } = msg;


      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {

          const isRelevantUser = user.id === sender_id || user.id === receiver_id;

          if (!isRelevantUser) return user;

          const isCurrentUserReceiver = receiver_id === usertoken.user.id;
          const isMessageFromUser = sender_id === user.id;


          const shouldIncrementUnseen =
            isCurrentUserReceiver && user.id === sender_id && status !== "read";

          return {
            ...user,
            last_message: message,
            last_message_time: created_at,
            last_message_seen: status === "delivered",
            unseen_count: shouldIncrementUnseen
              ? (user.unseen_count || 0) + 1
              : user.unseen_count || 0,
          };
        });


        return updatedUsers.sort(
          (a, b) =>
            new Date(b.last_message_time) - new Date(a.last_message_time)
        );
      });
    };

    const handleMessageRead = ({ sender_id, receiver_id }) => {
        
       
      setUsers((prevUsers) =>
        prevUsers.map((user) => {

          if (user.id === sender_id && receiver_id === usertoken.user.id) {
            return {
              ...user,
              last_message_seen: false,
              unseen_count: 0, 
            };
          }
          return user;
        })
      );
    };








    socket.on("messageRead", handleMessageRead);
    socket.on("privateMessage", handlePrivateMessage);
    socket.on("modeChanged", handleModeChange);
    return () => {
      socket.off("privateMessage", handlePrivateMessage);
      socket.off("modeChanged", handleModeChange);
      socket.off("messageRead", handleMessageRead);

    }
  }, [socket]);





  const handlenavigate = (u) => {

    if (!isMobile) {
      navigate(`/chat/${u.id}/${u.username}`)
    } else {

      navigate(`/chat/mobilechat/${u.id}/${u.username}`)
    }
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === u.id
          ? { ...user, unseen_count: 0 }
          : user
      )
    );

  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";


    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  };




  return (
    <div className="user-list">

      <Newaccount />
      <button className="global-random-chat-btn">Chat with Random</button>

      <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }} >Message</h3>

      {!loading ? users?.length > 0 ?
        users.map((u) => (

          <div key={u.id} className="user-item " onClick={() => handlenavigate(u)}>
            <div className="user-item-image-box">
              {u.visibility === 'anonymous' ? (
                <AnonymousAavatar />

              ) :
                (
                  <Avatar src={u.profile_pic} alt={u.username} />
                )
              }


              {/* <Avatar className="author-avatar">
                        
                      </Avatar> */}
            </div>
            <div className="user-item-name-massage">
              <h3 >{u.username} <span>{formatTime(u.last_message_time)}</span></h3>
              <aside className="u-i-n-m-lastm" style={{ color: !u.last_message_seen ? 'var(--lighttextcolor)' : "var(--textcolor)", fontWeight: !u.last_message_seen ? 'normal' : 'bold' }}>
                <TruncatedText text={u.last_message} limit={40} isShowmore={false} />

                {u.unseen_count > 0 && (
                  <div className="unseen-badge">
                    {u.unseen_count}
                  </div>
                )}

              </aside>

            </div>

          </div>
        )) :
        (<div className="no-chat-user">
          <button> Start a new chat </button>

        </div>) : (<ChatListSkeleton />)
      }
    </div>
  );
};

export default UserList;
