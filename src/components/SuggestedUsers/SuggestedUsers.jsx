import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import Followbtn from "../ProfileStats/Followbtn";
import "./SuggestedUsers.css";
import CombineAvatat from "../Avatar/CombineAvatat";
import ChatListSkeleton from "../Fallback/ChatListSkeleton";

const SuggestedUsers = ({ homeuser }) => {
  const { usertoken } = useContext(UserAuthCheckContext);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(`/api/users/suggested-users?userId=${usertoken.user.id}`);
        const nonAnonymousUsers = response.data.filter(user => user.visibility !== "anonymous");
        setLoading(false)

        setSuggestedUsers(nonAnonymousUsers);
      } catch (error) {
        console.error("Error fetching suggested users");
      }
    };

    fetchSuggestedUsers();
  }, [usertoken?.user.id]);



  return (
    <div className="suggested-users-container" style={homeuser ? { padding: '0.91rem' } : {}}>
      {suggestedUsers.length > 0 && (
        !loading ? (
          <>

            <h2>Suggested Users</h2>
            {suggestedUsers.map((user) => (
              <div key={user.id} className="suggestion-profile">
                <div className="suggestion-profile-pic">

                  <CombineAvatat username={user.username} profile_pic={user.profile_pic} visibility={user.visibility} size="2.2rem" />

                </div>
                <div className="suggestion-profile-info">
                  <h3>{user.username}</h3>

                </div>
                <Followbtn targetUserId={user.id} />
              </div>
            ))}
          </>
        ) :
          (

            <ChatListSkeleton rows={5} />
          )
      )
      }

    </div>
  );
};

export default SuggestedUsers;
