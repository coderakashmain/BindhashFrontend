import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { UserPlus } from 'lucide-react'
import { UserAuthCheckContext } from '../../Context/UserAuthCheck';
import './Followbtn.css'

const Followbtn = ({ targetUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const {usertoken} = useContext(UserAuthCheckContext);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const response = await axios.get(`/api/users/is-following?followerId=${usertoken.user.id}&followingId=${targetUserId}`);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    checkFollowingStatus();
  }, [targetUserId, usertoken.user.id]);

  


  const handleFollowToggle = async () => {
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
    <button       onClick={handleFollowToggle}
    
    style={{ padding: '0.8rem 0.6rem', borderRadius: '5px', backgroundColor: isFollowing ? '#ebebeb' : 'black', cursor: 'pointer',display :'flex',alignItems :'center', gap: '0.3rem',fontSize :'0.8rem',outline : 'none', border : 'none',color: isFollowing ? 'black' : 'white' }} className='active follow-fuction'>
      {isFollowing ? "Unfollow" : (
        <>
          Follow <UserPlus size={15} />
        </>
      )}
    </button>
  );
}

export default Followbtn
