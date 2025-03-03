import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuthCheckContext } from "./UserAuthCheck";

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
      <h3>All Users</h3>
      {users.map((u) => (
        <div key={u.id} className="user-item" onClick={() => navigate(`/chat/${u.id}`)}>
          <p>{u.username}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
