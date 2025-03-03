import axios from 'axios';
import React, { useState } from 'react'


const Followbtn = () => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowToggle = async (targetUserId) => {
      if (!usertoken) return navigate("/login");
    
      try {
        if (isFollowing) {
          await axios.post("/api/users/unfollow", {
            followerId: usertoken.user.id,
            followingId: targetUserId,
          });
        } else {
          await axios.post("/api/users/follow", {
            followerId: usertoken.user.id,
            followingId: targetUserId,
          });
        }
    
        setIsFollowing(!isFollowing);
      } catch (error) {
        console.error("Error toggling follow status:", error);
      }
    };
    
    return (
      <button onClick={() => handleFollowToggle(targetUserId)}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    );
}

export default Followbtn
