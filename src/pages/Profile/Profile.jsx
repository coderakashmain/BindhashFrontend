import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet'
import './Profile.css'
import '../../App.css'
import Post from "../../components/Post/Post";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import defaultprofilepicture from '../../Photo/defaultprofilepic.png'
import { Images, Settings, Ellipsis, Undo2, Pencil, Compass, Gem, SwitchCamera, MessageCircle, UserPlus, Send } from 'lucide-react'
import ProfileStats from "../../components/ProfileStats/ProfileStats";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import ProfileUpload from "../../components/ProfileUpload/ProfileUpload";
import Followbtn from "../../components/ProfileStats/Followbtn";
import PostFunctionComponent from "../../components/PostFuctionComponent/PostFunctionComponent";
import { motion, AnimatePresence } from 'framer-motion'
import ShareProfile from "../../components/ShareProfile/ShareProfile";
import { AllPostContextData } from "../../Context/AllPostContext";
import TagSelector from "../../components/Usertags/TagSelector";
import CircularProgress from '@mui/material/CircularProgress';
import UserProfileBio from "../../components/Bio/UserProfileBio";
import { MobileViewContext } from "../../Context/MobileResizeProvider";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import PostSwiper from "../../components/PostSwiper/PostSwiper";
import ProfileSkeleton from "../../components/Fallback/ProfileSkeleton";


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
  const { totalUserPost, allpost } = useContext(AllPostContextData)
  const [profileEditView, setProfileEditView] = useState(false);
  const { isMobile } = useContext(MobileViewContext);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    if (!usertoken?.user?.id) {
      navigate('/login');
    }



  }, [usertoken, navigate]);

  useEffect(() => {
    if (usertoken?.user?.username !== username) {
      navigate('*');
    } else {
      setLoading(false);
    }
  }, [usertoken])












  const [isFollowing, setIsFollowing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleFollow = () => setIsFollowing(!isFollowing);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);



  const handlepostclick = () => {
    setMpostbtn(true)
  };



  if (loading) return <ProfileSkeleton />;



  return (
    <div className="profile-container">





      <div className="profile-left-box">
        {/* <div className="profile-sub-nav">
          <div className="prifle-sub-nav-inside-box">
            <div className="profile-back">
              <button onClick= {()=> {
                navigate(-1)
              }} className="btnhover"><Undo2 /></button>
            </div>
            <div className="profile-username-box">
              {usertoken.user.fullname ? (<strong>{usertoken.user.fullname}</strong>) : (<strong>Not set yet</strong>)}
              <p>{usertoken.user.username}</p>
            </div>
          </div>
          <div onClick={()=> navigate('/setting')} className="profile-userdataedit btnhover">
            <Settings  className="" />
          </div>
        </div> */}

        <Helmet>
          <title>{`${usertoken?.user?.username} | Profile – Bindhash`}</title>
          <meta
            name="description"
            content={`View ${usertoken?.user?.name}'s profile on Bindhash. Discover their posts, interests, and connect through anonymous rooms or chats.`}
          />
        </Helmet>
        <div className="profile-page-profile-image-box">
          <div className="profile-back-img-box" >
            {profilebackpicloading && <div style={{ borderRadius: '0%' }} className="profile-pic-loading">
              <div className="profile-pic-anime-loader"></div>
            </div>}

            <img src={usertoken?.user.profileback_pic ? usertoken?.user.profileback_pic : "https://picsum.photos/800/300"} alt="Cover" />
            <div className="profile-back-img-edit">
              <ProfileUpload mainphoto={false} borderRadius="0.2rem" size={19} paddingvalue='0.8rem' setProfilepicloading={setProfilbackepicloading} />
            </div>
          </div>
          <div className="profile-main-img-box">
            {profilepicloading && <div className="profile-pic-loading">
              <div className="profile-pic-anime-loader"></div>
            </div>}
            <img src={usertoken?.user?.profile_pic ? usertoken?.user?.profile_pic : defaultprofilepicture} alt="" />
            <div className="profile-main-img-edit">
              {/* <SwitchCamera size={18} /> */}

              <ProfileUpload mainphoto={true} size={19} paddingvalue='0.8rem' setProfilepicloading={setProfilepicloading} />
            </div>
          </div>
        </div>



        <div className="profile-page-data-box">

          <AnimatePresence>
            {mpostbtn && (
              <PostFunctionComponent widthsize='40rem' mpostbtn={mpostbtn} setMpostbtn={setMpostbtn} />
            )}
          </AnimatePresence>

          <div className="profile-page-left-data-box">
            <div className="profile-page-left-data-box-btn">

              {usertoken.user.id ? (<button onClick={handlepostclick} className="button active"><Images size={18} />Upload/Post</button>) : (
                <button className="follow-btn  active" onClick={toggleFollow}>
                  <Followbtn />
                </button>
              )}



              {usertoken.user.id ? (<button
                onClick={() => {
                  // if (isMobile) {
                  //   navigate('/profile/edit')

                  // }
                  // else {
                  setProfileEditView(true)
                  // }
                }

                }
                className="button active"><Pencil size={18} /> Edit Profile</button>)


                : (<button className="message-btn button active"><MessageCircle size={18} /> Message</button>)}
              <AnimatePresence>
                {profileEditView && (
                  <ProfileEdit setProfileEditView={setProfileEditView} userId={usertoken.user.id} />)}
              </AnimatePresence>
              <div className="message-btn button active"> <ShareProfile backcolor='none' btnhover={false} fontsize={20} content="Share Profile" profileurllink={`/profile/${usertoken.user.username}`} /></div>

            </div>

            <div className="profile-page-stats">
              <div className="stat-box"><strong>{totalUserPost}</strong><span>Posts</span></div>
              <ProfileStats gap='5rem' />
            </div>

            {/* <div className="user-leadboard-point">
              <h2><Compass size='1rem' />Leaderboard</h2>
              <div className="user-leadboard-point-box" >
                <span onClick={() => {
                  if (isMobile) {
                    navigate('/leaderboard')

                  }
                }}> Points 759<Gem size={14} color="blue" /></span>
              </div>
            </div> */}
            {/* 
            <div className="mutual-friends">
              <p>Commen Friends </p>
              {[1, 2].map((_, i) => (
                <div className="friend" key={i}>
                  <img src="https://picsum.photos/30" alt="Friend" />
                  <span>Friend {i + 1}</span>
                </div>
              ))}
            </div> */}





          </div>
          <div className="profile-page-right-data-box">
            <h1>              {usertoken.user.fullname ? usertoken.user.fullname : "Not set yet"}</h1>
            <p>{usertoken.user.username}</p>
            {usertoken.user?.bio?.philosophy && (<p>{usertoken.user.bio.philosophy}</p>)}
            <AnimatePresence>

              <TagSelector userId={usertoken.user.id} />
            </AnimatePresence>
            <UserProfileBio setProfileEditView={setProfileEditView} />
          </div>
        </div>

        <PostSwiper />

      </div>
      <div className="profile-right-box">
        <SuggestedUsers />

        {/* fdsfdsdf */}

      </div>




    </div>
  );
};

export default Profile;
