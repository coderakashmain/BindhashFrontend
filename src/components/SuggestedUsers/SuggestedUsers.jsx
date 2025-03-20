import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import Followbtn from "../ProfileStats/Followbtn";
import defaultprofilepic from '../../Photo/defaultprofilepic.png'
import "./SuggestedUsers.css";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SuggestedUsers = () => {
  const { usertoken } = useContext(UserAuthCheckContext);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(`/api/users/suggested-users?userId=${usertoken.user.id}`);
        setSuggestedUsers(response.data);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    fetchSuggestedUsers();
  }, [usertoken.user.id]);



  return (
    <div className="suggested-users-container">
     {suggestedUsers.length > 0 ? ( <>
      <h2>Suggested Users</h2>
      {suggestedUsers.map((user) => (
        <div key={user.id} className="suggestion-profile">
          <div className="suggestion-profile-pic">
            <img src={user.profile_pic ? user.profile_pic : defaultprofilepic} alt="Profile" />
            
          </div>
          <div className="suggestion-profile-info">
            <h3>{user.username}</h3>
            {user.mutual_count > 0 ? (
              <p>Followed by <strong>{user.mutual_count} mutual friends</strong></p>
            ) : (
              <p>Suggested for you</p>
            )}
          </div>
          <Followbtn targetUserId={user.id} />
        </div>
      ))}
      </>) : (
         <Box sx={{ width: "100%" }} >
         <Skeleton  height={50} />
         <Skeleton animation="wave" height={50} />
         <Skeleton  height={50} />
         <Skeleton animation="wave"   height={50}/>
         <Skeleton   height={50}/>
         <Skeleton animation="wave" />
         <Skeleton animation="wave" />
         <Skeleton animation={false} />
       </Box>
      )}
    </div>
  );
};

export default SuggestedUsers;
