import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Profile.css'
import Post from "../../components/Post/Post";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import defaultprofilepicture from '../../Photo/defaultprofilepic.png'
import { Images, Ellipsis, Undo2, Pencil, SwitchCamera, MessageCircle, UserPlus, Send } from 'lucide-react'
import ProfileStats from "../../components/ProfileStats/ProfileStats";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import ProfileUpload from "../../components/ProfileUpload/ProfileUpload";
import Followbtn from "../../components/ProfileStats/Followbtn";
import PostFunctionComponent from "../../components/PostFuctionComponent/PostFunctionComponent";
import {motion,AnimatePresence} from 'framer-motion'

const Profile = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { usertoken, setUsertoken } = useContext(UserAuthCheckContext);
  const usercheck = sessionStorage.getItem('logintoken');
  const [profilepicloading, setProfilepicloading] = useState(false);
  const [profilebackpicloading, setProfilbackepicloading] = useState(false);
  const postopenRef = useRef(null)
   const [mpostbtn, setMpostbtn] = useState(false);



  useEffect(() => {
    if (!usertoken?.user?.id) {
      navigate('/login');
    }
  }, [usertoken, navigate]);










  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("user_id", usertoken.user.id);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.post("/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setContent("");
      setImage(null);

      alert('sucess');
    } catch (err) {
      console.error("Error creating post:", err);
      alert('error');
    }
  };

  const logout = () => {
    axios.post(`/api/auth/logout`).then((res) => {
      alert("Logged out successfully");

      sessionStorage.removeItem("logintoken");
      setUsertoken(null);

      window.location.reload();
    }).catch((err) => console.error("Logout Error:", err));

  }

  const [isFollowing, setIsFollowing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleFollow = () => setIsFollowing(!isFollowing);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);


 
  const handlepostclick = () => {
    setMpostbtn(true)
  };

  return (
    <div className="profile-container">


      {/* <h2>Welcome, {usertoken.user.username}!</h2>
          <button onClick={logout}>Logout</button>

          <form onSubmit={handlePostSubmit} className="Profile-post-form">
            <textarea
              placeholder="Write something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit">Post</button>
          </form> */}


      <div className="profile-left-box">
        <div className="profile-sub-nav">
          <div className="prifle-sub-nav-inside-box">
            <div className="profile-back">
              <button><Undo2 /></button>
            </div>
            <div className="profile-username-box">
              {usertoken.user.user_fullname ? (<strong>{usertoken.user.user_fullname}</strong>) : (<strong>Not set yet</strong>)}
              <p>{usertoken.user.username}</p>
            </div>
          </div>
          <div className="profile-userdataedit">
            <Ellipsis />
          </div>
        </div>
        <div className="profile-page-profile-image-box">
          <div className="profile-back-img-box" >
            {profilebackpicloading && <div style={{ borderRadius: '0%' }} className="profile-pic-loading">
              <div className="profile-pic-anime-loader"></div>
            </div>}

            <img src={usertoken.user.profileback_pic ? usertoken.user.profileback_pic : "https://picsum.photos/800/300"} alt="Cover" />
            <div className="profile-back-img-edit">
              <ProfileUpload mainphoto={false} borderRadius="0.2rem" size={19} paddingvalue='0.8rem' setProfilepicloading={setProfilbackepicloading} />
            </div>
          </div>
          <div className="profile-main-img-box">
            {profilepicloading && <div className="profile-pic-loading">
              <div className="profile-pic-anime-loader"></div>
            </div>}
            <img src={usertoken.user.profile_pic ? usertoken.user.profile_pic : defaultprofilepicture} alt="" />
            <div className="profile-main-img-edit">
              {/* <SwitchCamera size={18} /> */}

              <ProfileUpload mainphoto={true} size={19} paddingvalue='0.8rem' setProfilepicloading={setProfilepicloading} />
            </div>
          </div>
        </div>



        <div className="profile-page-data-box">

           <AnimatePresence>
                  {mpostbtn && (
                    <PostFunctionComponent mpostbtn={mpostbtn} setMpostbtn={setMpostbtn} />
                  )}
                </AnimatePresence>

          <div className="profile-page-left-data-box">
            <div className="profile-page-left-data-box-btn">
              {/* 
              <button className="button active"><Pencil size={18} /> Edit Profile</button> */}
              {usertoken.user.id ? (<button onClick={handlepostclick} className="button active"><Images size={18} />Upload/Post</button>) : (
                <button className="follow-btn  active" onClick={toggleFollow}>
                  <Followbtn />
                </button>
              )}
              <button className="message-btn button active"><MessageCircle size={18} /> Message</button>
              <button className="message-btn button active"><Send size={18} /> Share Profile</button>

            </div>

            <div className="profile-page-stats">
              <div className="stat-box"><strong>125</strong><span>Posts</span></div>
              <div className="stat-box"><strong>3.2K</strong><span>Followers</span></div>
              <div className="stat-box"><strong>1.8K</strong><span>Following</span></div>
            </div>

            <div className="story-highlights">
              {[1, 2, 3].map((_, i) => (
                <div className="story-circle" key={i}>
                  <img src="https://picsum.photos/50" alt="Story" />
                  <p>Highlight {i + 1}</p>
                </div>
              ))}
            </div>

            <div className="mutual-friends">
              <p>Commen Friends </p>
              {[1, 2].map((_, i) => (
                <div className="friend" key={i}>
                  <img src="https://picsum.photos/30" alt="Friend" />
                  <span>Friend {i + 1}</span>
                </div>
              ))}
            </div>

            <div className="user-leader">
              <h2>Leaderboard</h2>
            </div>



          </div>
          <div className="profile-page-right-data-box">
            <h1>Full Name </h1>
            <p>Username</p>

            <div className="user-tags">
              {["#Coder", "#Photography", "#Gaming", "#Travel"].map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
            <div className="profile-page-right-bio-box">
              <h2>Bio</h2>
              <ul>
                <li> Introvert😂 </li>
                <li>º IT BackGround🖱️</li>
                <li>º MPcian🎓</li>
                <li>º Develeper of StudyVault</li>
                <li>º Life.InnerHTML = ''Life is full of Pain"</li>
                <li>º Music Lover🎵</li>
                <li>º Radhe Radhe</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <div className="profile-right-box">
        <SuggestedUsers />

        {/* fdsfdsdf */}

      </div>




    </div>
  );
};

export default Profile;
