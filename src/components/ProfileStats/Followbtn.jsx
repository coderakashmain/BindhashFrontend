import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { UserAuthCheckContext } from '../../Context/UserAuthCheck';
import './Followbtn.css'
const Followbtn = ({ targetUserId = null, isFollowingInitial = null, userId }) => {
  const { usertoken } = useContext(UserAuthCheckContext);
  const actualTargetId = targetUserId || userId;
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [checked, setChecked] = useState(isFollowingInitial !== null); // mark if we already know follow status

  useEffect(() => {
    if (!actualTargetId || checked) return;

    const checkFollowingStatus = async () => {
      try {
        const response = await axios.get(`/api/users/is-following?followerId=${usertoken.user.id}&followingId=${actualTargetId}`);
        setIsFollowing(response.data.isFollowing);
        setChecked(true); // prevent future calls
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    checkFollowingStatus();
  }, [actualTargetId, checked]);

  const handleFollowToggle = async () => {
    if (!usertoken) return navigate("/login");
          setIsFollowing(!isFollowing);
    try {
      const endpoint = isFollowing ? '/api/users/unfollow' : '/api/users/follow';
      await axios.post(endpoint, {
        followerId: usertoken.user.id,
        followingId: actualTargetId,
      });
     
    } catch (error) {
      console.error("Error toggling follow status:", error);
       setIsFollowing(!isFollowing);
    }
  };

  if (!actualTargetId) return null; // no target = no button

  return (
    <button
      onClick={handleFollowToggle}
      className='active follow-fuction'
      
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default Followbtn;
