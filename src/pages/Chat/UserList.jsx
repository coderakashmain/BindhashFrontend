import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import './Userlist.css'
import {ArrowRightLeft} from 'lucide-react'
import profilelogo from '../../Photo/defaultprofile2.png'
import '../../App.css'
const UserList = () => {
  const { usertoken } = useContext(UserAuthCheckContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (!usertoken) return;

    axios.get(`/api/users?userId=${usertoken.user.id}`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [usertoken]);

  return (
    <div className="user-list">
      <h2 className="user-list-user"><strong>{usertoken.user.username}</strong>  <strong><ArrowRightLeft /></strong></h2>
      <div className="chat-groups">
        <h3>Groups</h3>
        <ul>
          <li>sdfsdf</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <h3>Message</h3>
      
      {users?.length > 0 &&
  users.map((u) => (
    <div key={u.id} className="user-item active" onClick={() => navigate(`/chat/${u.id}`)}>
      <div><img src={u?.profile_pic ? u.profile_pic : profilelogo} loading="lazy" alt="profile_pic" /></div>
      
      <strong>{u.username}</strong>
    </div>
  ))}
    </div>
  );
};

export default UserList;
