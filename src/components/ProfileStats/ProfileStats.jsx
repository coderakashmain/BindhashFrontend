import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { motion } from "framer-motion";
import "./ProfileStats.css"; // Import your CSS file for styling
import dafaultprofilepic from '../../Photo/defaultprofilepic.png'
import { X } from "lucide-react"; // Import the X icon from lucide-react
import { MobileViewContext } from "../../Context/MobileResizeProvider";
import { duration } from "@mui/material";
import Followbtn from "./Followbtn";
import SuggestedUsers from "../SuggestedUsers/SuggestedUsers";
import { FollowersFollowingContext } from "../../Context/FollowersFollowing";
import Subheadcomponent from "../Subheadcomponent/Subheadcomponent";
import CombineAvatat from "../Avatar/CombineAvatat";


const ProfileStats = ({ gap }) => {
  const { usertoken } = useContext(UserAuthCheckContext);
  const [stats, setStats] = useState({ followers_count: 0, following_count: 0 });
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const { isMobile } = useContext(MobileViewContext);
  const { fetchFollowers, fetchFollowing, followersList, followingList } = useContext(FollowersFollowingContext);

  useEffect(() => {
    if (usertoken) {
      axios
        .get(`/api/users/followers-count?userId=${usertoken.user.id}`)
        .then((response) => {
          setStats(response.data);
        })
        .catch((error) => console.error("Error fetching follow stats:", error));
    }
  }, [usertoken]);

  const fetchFollowersdlist = async () => {


    fetchFollowers();
    setShowFollowers(!showFollowers);
    setShowFollowing(false);
  };

  const fetchFollowinglist = async () => {


    fetchFollowing();
    setShowFollowing(!showFollowing);
    setShowFollowers(false);
  };



  return (
    <div className="profile-follow-data" style={{ display: 'flex', flexDirection: 'row', gap: gap ? gap : '2vw' }}>
      <div onClick={fetchFollowersdlist} style={{ cursor: 'pointer' }}>
        <strong style={{ fontSize: '1.1rem', display: 'block', textAlign: 'center' }}>{stats.followers_count}</strong>
        <span
          style={{ fontSize: '0.75rem', color: 'gray' }}
        >Followers
        </span>
      </div>
      <div onClick={fetchFollowinglist} style={{ cursor: "pointer" }}>
        <strong style={{ fontSize: '1.1rem', display: 'block', textAlign: 'center' }}>{stats.following_count}</strong> <span
          style={{ fontSize: '0.75rem', color: 'gray' }}
        >Following</span>
      </div>

      {showFollowers && (
        <motion.div className="list-container scrollbar" initial={{ opacity: 0, scale: 0.9, x: isMobile ? '100%' : 0 }}

          animate={{ opacity: 1, scale: 1, x: isMobile ? '0%' : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}

        >
          <div style={{ marginBottom: '1rem' }}>
            <Subheadcomponent headline="Followers" onClose={() => setShowFollowers(false)} />
          </div>
          {followersList.length === 0 ? (
            <p style={{padding : '0rem 1rem'}}>No followers yet.</p>
          ) : (
            <ul>
              {followersList.map((user) => (
                <li key={user.id} className="followrslist-li">
                  <div className="followrslist-li-div">
                    <CombineAvatat username={user.username} profile_pic={user.profile_pic} visibility={user.visibility} size="2.2rem" />
                    <div className="followrs-user-details-left">
                      <span className="user-name">{user.fullname}</span>
                      <span className="user-username">@{user.username}</span>
                    </div>
                  </div>
                  <div className="followres-user-details-right">
                    <Followbtn userId={user.id} />
                  </div>
                </li>
              ))}
            </ul>
          )}
          <SuggestedUsers />
        </motion.div>
      )}

      {/* Following List */}
      {showFollowing && (
        <motion.div className="list-container scrollbar" initial={{ opacity: 0, scale: 0.9, x: isMobile ? '100%' : 0 }}

          animate={{ opacity: 1, scale: 1, x: isMobile ? '0%' : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}>

          <div style={{ marginBottom: '1rem' }}>

            <Subheadcomponent headline="Following" onClose={() => setShowFollowing(false)} />
          </div>
          {followingList.length === 0 ? (
            <p style={{padding : '0rem 1rem'}}>Not following anyone yet.</p>
          ) : (
            <ul>
              {followingList.map((user) => (

                <li key={user.id} className="user-details-li">
                  {/* <img src={user.profile_pic || dafaultprofilepic} alt="Profile" className="profile-img" /> */}
                  <CombineAvatat username={user.username} profile_pic={user.profile_pic} visibility={user.visibility} size="2.2rem" />
                  <div className="user-details">
                    <div className="followrs-user-details-left">
                      <span className="user-name">{user.fullname}</span>
                      <span className="user-username">@ {user.username}</span>
                    </div>
                    <div className="followres-user-details-right">
                      <Followbtn userId={user.id} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <SuggestedUsers />
        </motion.div>
      )}


    </div>
  );
};

export default ProfileStats;
