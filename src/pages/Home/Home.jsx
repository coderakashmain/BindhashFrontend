import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import './Home.css'
import { motion, transform, AnimatePresence } from "framer-motion";
import { AllPostContextData } from "../../Context/AllPostContext";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, ScanEye, Plus, DiamondPlus, Search, ThumbsUp, Send, ImagePlus, Video, SquareStack, SmilePlus, EllipsisVertical, CircleFadingPlus, Share2, Album } from 'lucide-react'
import ProfileStats from "../../components/ProfileStats/ProfileStats";
import Followbtn from "../../components/ProfileStats/Followbtn";
import ProfileUpload from "../../components/ProfileUpload/ProfileUpload";
import defaultprofilephoto from '../../Photo/defaultprofilepic.png'
import UserSearch from "../../components/UserSearch/UserSearch";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import TrendingPosts from "../../components/TrendingPosts/TrendingPosts";
import PostModel from "../../components/Post/PostModel";
import ShareProfile from "../../components/ShareProfile/ShareProfile";
import StorySection from "../../components/Story/StorySection";
import Time from "../../components/Time/Time";
import PollCreate from "../../components/Poll/PollCreate";
import PollList from "../../components/Poll/PollList";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { colors } from "@mui/material";
import PollView from "../../components/Poll/PollView";
import PostOptions from "../../components/PostOptions/PostOptions";
import { MobileViewContext } from "../../Context/MobileResizeProvider";
import ImageUploader from "../../components/Post/ImageUploader";
import PostEditView from "../../components/Post/PostEditView";
import VideoPost from "./VideoPost";
import PostFunctionComponent from "../../components/PostFuctionComponent/PostFunctionComponent";



const Home = () => {
  const { allpost, setAllpost, isLiked, setIsLiked, loading, loaderRef, hasMore } = useContext(AllPostContextData);
  const { usertoken } = useContext(UserAuthCheckContext);

  const [newComment, setNewComment] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const navigate = useNavigate();
  const [profilepicloading, setProfilepicloading] = useState(false);
  const homeporfileRef = useRef();
  const homeusggestionRef = useRef();
  const [resizedisplay, setResizeddisplay] = useState(true);
  const [imgloaded, setImgLoaded] = useState(false);
  const [content, setContent] = useState("");
  const [pollcreation, setPollcreation] = useState(false);
  const [feed, setFeed] = useState([]);
  const [storymodeltrue, setstorymodeltrue] = useState(false)
  const storyuplodRef = useRef(null)
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef(null);
  const location = useLocation();
  const { isMobile } = useContext(MobileViewContext)
  const [mpostbtn, setMpostbtn] = useState(false);
  const [videopost, setVideopost] = useState(null);
  const videouploadRef = useRef();
  const [videotype, setVideoType] = useState(null);




  useEffect(() => {

    if (usertoken === null) {
      navigate("/login");

    }
  }, [usertoken])







  useEffect(() => {
    if (!allpost) return;

    const rankedFeed = allpost.map(item => {
      const engagementScore = (item.likes * 2) + (item.comments * 3) + (item.views * 1);


      const hoursSinceCreation = (Date.now() - new Date(item.created_at).getTime()) / (1000 * 60 * 60);
      const timeFactor = Math.exp(-hoursSinceCreation / 24);

      return { ...item, score: engagementScore + timeFactor };
    });

    // Sort by highest score
    rankedFeed.sort((a, b) => b.score - a.score);

    setFeed(rankedFeed);
  }, [allpost])



  if (usertoken === null) {
    return null;
  }


  useEffect(() => {
    const handleresize = () => {
      if (window.innerWidth > 1366) {
        homeporfileRef.current.style.display = 'block';
        setResizeddisplay(false)
      } else {
        homeporfileRef.current.style.display = 'none';
        setResizeddisplay(true);
      }

      if (window.innerWidth > 698) {
        homeusggestionRef.current.style.display = 'block';

      } else {
        homeusggestionRef.current.style.display = 'none';

      }
    };
    handleresize();

    // Add event listener for resize
    window.addEventListener('resize', handleresize);


    return () => window.removeEventListener('resize', handleresize)
  }, [window.innerWidth])



  const handleLike = async (postId) => {
    if (!usertoken) {
      navigate('/login')
    } else {
      try {
        const response = await axios.post("/api/posts/like", {
          user_id: usertoken.user.id,
          post_id: postId,
        });

        setAllpost((prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === postId
              ? { ...post, like_count: post.like_count + response.data.change }
              : post
          )
        );

        // ✅ Store liked status for UI toggle
        setIsLiked((prevLiked) => ({
          ...prevLiked,
          [postId]: response.data.liked, // Store liked status as true/false
        }));

      } catch (error) {
        console.error("Error liking post:", error);
      }
    }

  };

  const handleCommentChange = (postId, value) => {
    setNewComment((prev) => ({
      ...prev,
      [postId]: value, // Store comment per post
    }));
  };

  const handleCommentSubmit = async (postId, e) => {

    e.preventDefault();
    if (!usertoken) {
      navigate('/login');
    } else {
      if (!newComment[postId]?.trim()) return;
      try {
        const response = await axios.post("/api/posts/comment", {
          user_id: usertoken.user.id,
          post_id: postId,
          comment: newComment[postId],
        });

        const newCommentData = response.data;

        // Fetch Latest Comments
        setAllpost((prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === postId
              ? { ...post, comments: [...post.comments, newCommentData] }
              : post
          )
        );

        setNewComment((prev) => ({
          ...prev,
          [postId]: "", // Reset only this post's input field
        }));

      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }

  };

  const placeholderimg = (image) => {
    const placeholder = image.replace("/upload/", "/upload/w_1000,h_1000,c_fill,e_blur:200/");


    return placeholder
  }


  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setMpostbtn(false)

    const formData = new FormData();
    formData.append("user_id", usertoken.user.id);
    formData.append("content", content);

    try {
      await axios.post("/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setContent("");

      alert('sucess');
    } catch (err) {
      console.error("Error creating post:", err);
      alert('error');
    }
  };
  const handlecontendChange = (e) => {
    const contentValue = e.target.value;
    setContent(contentValue);

  }


  const hanldestorymodel = () => {
    setMpostbtn(false)
    setstorymodeltrue(true)
  }


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (storyuplodRef.current && !storyuplodRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  useEffect(() => {
    // Select the scrolling container
    scrollContainerRef.current = document.querySelector(".container-box");

    if (!scrollContainerRef.current) return;

    const handleScroll = () => {
      const currentScrollY = scrollContainerRef.current.scrollTop;


      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setVisible(false); // Hide navbar when scrolling down
      } else {
        setVisible(true); // Show navbar when scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    scrollContainerRef.current.addEventListener("scroll", handleScroll);
    return () => scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);



  const videobtnclick = () => {

    if (videouploadRef.current) {
      
      videouploadRef.current.click();
    }

  };

  const [videoselect, setVideoselect] = useState(false);
  const handlevideoChange = (event) => {
    const file = event.target.files[0];

    setVideopost(file);
    setVideoType(file.type);
    setVideoselect(true)


    setMpostbtn(false)


  }








  return (
    <section className="container">
      {videoselect && <PostEditView setVideoselect={setVideoselect} setVideopost={setVideopost} setVideoType={setVideoType} postdata={videopost} type={videotype} />}
      <div ref={homeporfileRef} className="home-profile-out-box scrollbar">
        <div className="home-profile">
          <div className="home-profile-header">
            <div className="home-profle-header-box">
              <div className="home-profile-pic-container">

                <img
                  src={usertoken.user.profile_pic ? usertoken.user.profile_pic : defaultprofilephoto}
                  alt="Profile"
                  className="profile-pic-large"
                />
                {profilepicloading && <div className="profile-pic-loading">
                  <div className="profile-pic-anime-loader"></div>
                </div>}
                <ProfileUpload mainphoto={true} setProfilepicloading={setProfilepicloading} />
              </div>
              <div className="home-profile-name-box">
                <h2>{usertoken.user.username} <span style={{ fontSize: '0.7rem', color: 'var(--lighttextcolor)' }}>M</span></h2>
                <p>{usertoken.user.fullname ? usertoken.user.fullname : "Fullname not set"}</p>
              </div>
            </div>
            {/* <button className="iconbtn home-pro-share active"><Send  size={18} /></button> */}
            <ShareProfile fontsize={20} profileurllink={`/profile/${usertoken.user.username}`} />

          </div>

          <div className="profile-stats">
            <div>
              <strong>{allpost.length > 0 ? allpost.find(post => post.post_user_id === usertoken.user.id)?.post_count || 0 : 0}</strong> <span>Posts</span>


            </div>
            <div>
              <ProfileStats />
            </div>

          </div>
          <p className="profile-bio">{usertoken.user.bio || "No bio available."}</p>
          <div className="home-profile-overviev">

            <h4 >Profile Overview</h4>

          </div>

          <div className="home-profile-buttons">
            <button className="view-profile-btn">View Profile</button>
            <button className="edit-profile-btn">Edit Profile</button>
            <button className="settings-btn">⚙️</button>
          </div>
        </div>
        <Leaderboard />

      </div>
      <div className="container-box scrollbar">
        <div className="home-post-box">
          <StorySection storymodeltrue={storymodeltrue} setstorymodeltrue={setstorymodeltrue} />
          <div className="home-post-box-upload">

            <form onSubmit={handlePostSubmit} className="home-post-type-box">
              <input type="text" name="post" placeholder="Write a post" value={content} onChange={handlecontendChange} />
              <button className="button" type="submit">Post</button>
            </form>

            <div className="home-post-button-box">
              <ImageUploader />
              <input type="file"
                ref={videouploadRef}
                onChange={handlevideoChange}
                accept="video/*"
                style={{ display: "none" }}
                className=" home-vidoe-post-input"
              />
              <button onClick={videobtnclick} className="home-post-button-box-video"><Video size={18} className="home-upload-icon" />Video</button>
              <button onClick={hanldestorymodel} className="home-post-button-box-story"><CircleFadingPlus size={18} className="home-upload-icon" />Story</button>
              <button className="home-post-button-box-story" onClick={() => setPollcreation(true)}><DiamondPlus size={18} className="home-upload-icon" />Poll</button>
              {pollcreation && <PollCreate pollcreation={pollcreation} onClose={() => setPollcreation(false)} />}
            </div>

          </div>


        </div>

        {/* <PollList /> */}
        {feed.map((allpost) => (
          allpost.type === "post" ? (
            <div key={`post-${allpost.post_id}`} className="post">

              <div className="post-header">
                <div className="post-header-user">
                  <img
                    src={allpost.post_user_pic ? allpost.post_user_pic : defaultprofilephoto}
                    alt="Profile"
                    className="profile-pic"

                  />
                  <div className="post-header-username-box">
                    <h3>{allpost.post_username}</h3>
                    {<Time posttime={allpost.created_at} />}

                  </div>
                </div>
                <div className="post-header-edit">

                  {usertoken.user.id !== allpost.post_user_id && (<Followbtn targetUserId={allpost.post_user_id} />)}
                  {/* <EllipsisVertical size={20} /> */}
                  <PostOptions />
                </div>

              </div>

              {allpost.image &&
                <>
                  <div className="post-head-img-box">

                    {allpost.media_type === 'image' ? (<>
                      <img
                        src={placeholderimg(allpost.image)}

                        alt="Post"
                        className={`post-image ${imgloaded ? "hidden" : "visible"}`}
                      />


                      <img
                        src={allpost.image}

                        loading="lazy"
                        alt="Post"
                        className={`post-image ${imgloaded ? "visible" : "blurred"}`}
                        onLoad={() => setImgLoaded(true)}

                      />

                    </>) : (
                      <VideoPost videoSrc={allpost.image} />
                    )}
                  </div>


                </>
              }
              <div className={`home-post-contnt-box-out ${allpost.image ? 'post-head-content-box-true' : 'post-head-content-box-false'}`}>
                {allpost.content && (<p className="home-post-contnt">{allpost.content}</p>)}

              </div>




              <div className="post-actions">
                <div className="post-action-left">

                  <button
                    onClick={() => handleLike(allpost.post_id)}
                    className={isLiked[allpost.post_id] ? "liked" : ""}
                  >
                    <ThumbsUp size={20} color={isLiked[allpost.post_id] ? "#007BFF" : "black"} /> {allpost.like_count}
                  </button>
                  <button>
                    <MessageCircle size={20} onClick={() => setSelectedPostId(allpost.post_id)} />
                    {allpost.comments.filter(comment => comment.comment_id && comment.comment_text).length}
                  </button>
                  <button><Share2 size={20} /></button>
                </div>
                <div className="post-action-right">
                  <button>     <ScanEye size={20} /></button>

                  <button>

                    <Album size={20} />
                  </button>
                </div>

              </div>



            </div>
          ) : (
            <PollView key={`poll-${allpost.poll_id}`} pollId={allpost.poll_id} />
          )
        ))}
        <div ref={loaderRef} className="loader" style={{ marginBottom: '4rem' }}>
          {loading && hasMore && allpost.length > 0 && (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <CircularProgress color="black" />
            </Box>
          )}
        </div>

      </div>
      <div ref={homeusggestionRef} className="user-suggestion scrollbar">
        <UserSearch />
        {resizedisplay && <Leaderboard />}
        <SuggestedUsers />
        <TrendingPosts />

      </div>
      {selectedPostId && <PostModel postId={selectedPostId} onClose={() => setSelectedPostId(null)} />}

      {/* <motion.div
        initial={{ width: "0rem", background: 'transparent' }}
        animate={{ width: expanded ? "90vw" : "5rem", background: expanded ? 'rgba(82, 82, 82, 0.084)' : 'rgba(0, 0, 0, 0)', backdropFilter: expanded ? 'blur(5px)' : 'blur(0px)' }}

        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}

        ref={storyuplodRef} className="home-story-box-post" >
        <div className="home-story-box-post-inside" onClick={() => setExpanded(true)}>
          <img src={usertoken.user.profile_pic ? usertoken.user.profile_pic : defaultprofilephoto} alt="" />
          {!expanded && (
              <motion.span
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }} // Bouncing animation
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="home-story-box-post-plus-icon">
                <CircleFadingPlus size="1.3rem" strokeWidth={2} />
              </motion.span>
          )}
        </div>

        {expanded && (
          <motion.div
            className="story-list-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <StorySection storymodeltrue={storymodeltrue} setstorymodeltrue={setstorymodeltrue} />
          </motion.div>
          </motion.div>
        )}

      </motion.div> */}

      <motion.div
        className="home-float-u-btn"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ width: "4rem", height: "4rem", opacity: 1, scale: visible ? 1 : 0 }}
        whileHover={{
          scale: 1.15,
          boxShadow: "0px 0px 15px rgba(0, 136, 255, 0.6)",
        }} // Glowing effect on hover
        whileTap={{ scale: 0.9 }} // Shrinks when tapped
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={() => setMpostbtn(true)}
      >
        <Plus size="2rem" />
      </motion.div>


      <AnimatePresence>
        {mpostbtn && (
          <PostFunctionComponent mpostbtn={mpostbtn} setMpostbtn={setMpostbtn} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Home;
