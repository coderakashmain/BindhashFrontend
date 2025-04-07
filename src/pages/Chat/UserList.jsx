import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import './Userlist.css'
import { ArrowRightLeft } from 'lucide-react'
import profilelogo from '../../Photo/defaultprofilepic.png'
import '../../App.css'
import Newaccount from "../../components/Newaccount/Newaccount";
import {MobileViewContext} from '../../Context/MobileResizeProvider'
const UserList = () => {
  const { usertoken } = useContext(UserAuthCheckContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const{isMobile} = useContext(MobileViewContext);



console.log(isMobile)

  useEffect(() => {
    if (!usertoken) return;

    axios.get(`/api/messages/users?userId=${usertoken.user.id}`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [usertoken]);



  return (
    <div className="user-list">

      <Newaccount />

      <h3>Message</h3>

      {users?.length > 0 &&
        users.map((u) => (
          <div key={u.id} className="user-item " onClick={()=> {
            if(!isMobile){
              navigate(`/chat/${u.id}`)
            }else{

              navigate(`/chat/mobilechat/${u.id}`)
            }
            
            }}>
            <div className="user-item-image-box"><img src={u?.profile_pic ? u.profile_pic : profilelogo} loading="lazy" alt="profile_pic" /></div>

            <strong>{u.username}</strong>
          </div>
        ))}
    </div>
  );
};

export default UserList;
