import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import './Home.css'
import '../../App.css'
import { Helmet } from "react-helmet";
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
import { Button, Chip, colors, Menu, MenuItem, Typography } from "@mui/material";
import PollView from "../../components/Poll/PollView";
import PostOptions from "../../components/PostOptions/PostOptions";
import { MobileViewContext } from "../../Context/MobileResizeProvider";
import ImageUploader from "../../components/Post/ImageUploader";
import PostEditView from "../../components/Post/PostEditView";
import VideoPost from "./VideoPost";
import PostFunctionComponent from "../../components/PostFuctionComponent/PostFunctionComponent";
import PostContent from "../../components/Post/PostContent";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import UploadPreviewWithProgress from "../../components/UploadPreviewWithProgress/UploadPreviewWithProgress";
import Queots from "../../components/Queots/Queots";
import { EmojiEventsOutlined, SortOutlined, TrendingUpOutlined } from "@mui/icons-material";
import BottomSheet from "../../components/BottomSheet/BottomSheet";



const Home = () => {
  const { allpost, setAllpost } = useContext(AllPostContextData);
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
  const [profileEditView, setProfileEditView] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [anchorEl, setAnchorEl] = useState(null);





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

    try {
      const response = await axios.post("/api/posts/text/create", { user_id: usertoken.user.id, content });

      console.log(response.data)
      setContent('')
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
      <Helmet>
        <title>Live Feed – Stories & Confessions | Bindhash</title>
        <meta
          name="description"
          content="Scroll through real, raw, and anonymous posts from people just like you. Discover emotional stories, failures, and victories shared from the heart."
        />
      </Helmet>
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
                <h2>@ {usertoken.user.username} <span style={{ fontSize: '0.7rem', color: 'var(--lighttextcolor)' }}>  {usertoken?.user.gender ? usertoken.user.gender.trim().charAt(0).toUpperCase() : ''}</span></h2>
                <p>{usertoken.user.fullname ? usertoken.user.fullname : "Fullname not set"}</p>
              </div>
            </div>

            <ShareProfile fontsize={20} profileurllink={`/profile/${usertoken.user.username}`} />

          </div>

          <div className="profile-stats">
            <div className="home-profile-stats-box-left">
              <strong>{allpost.length > 0 ? allpost.find(post => post.post_user_id === usertoken.user.id)?.post_count || 0 : 0}</strong> <span style={{ fontSize: '0.8rem', color: 'gray' }}>Posts</span>


            </div>
            <div>
              <ProfileStats />
            </div>

          </div>
          {/* <p className="profile-bio">{usertoken.user.bio || "No bio available."}</p> */}
          <div className="home-profile-overviev">



          </div>

          <div className="home-profile-buttons">
            <button className="view-profile-btn" onClick={() => navigate('/profile')}>View Profile</button>
            <button onClick={() => setProfileEditView(!profileEditView)} className="edit-profile-btn">Edit Profile</button>
            {profileEditView && (<ProfileEdit setProfileEditView={setProfileEditView} userId={usertoken.user.id} />)}
            {/* <button className="settings-btn">⚙️</button> */}
          </div>
        </div>
        <Leaderboard />

      </div>
      <div className="container-box scrollbar">



        <motion.div

          className="feed-controls-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >


          <div className="feed-controls">
            <div className="feed-filters">

              <Chip
                label="All Stories"
                onClick={() => setSelectedFilter("all")}
                color={selectedFilter === "all" ? "var(--blue-color)" : "var(--blacktextcolor)"}
                sx={{ color: selectedFilter === "all" ? "var(--blue-color)" : "var(--blacktextcolor)" }}
                className="filter-chip"
              />
              <Chip
                label="Trending"
                onClick={() => setSelectedFilter("trending")}
                color={selectedFilter === "trending" ? "var(--blue-color)" : "var(--blacktextcolor)"}
                sx={{ color: selectedFilter === "trending" ? "var(--blue-color)" : "var(--blacktextcolor)" }}
                className="filter-chip"
                icon={<TrendingUpOutlined />}
              />
              <Chip
                label="Most Supported"
                onClick={() => setSelectedFilter("supported")}
                color={selectedFilter === "supported" ? "var(--blue-color)" : "var(--blacktextcolor)"}
                sx={{ color: selectedFilter === "supported" ? "var(--blue-color)" : "var(--blacktextcolor)" }}
                className="filter-chip"
                icon={<EmojiEventsOutlined />}
              />
              <Chip
                label="Recent"
                onClick={() => setSelectedFilter("recent")}
                color={selectedFilter === "recent" ? "var(--blue-color)" : "var(--blacktextcolor)"}
                sx={{ color: selectedFilter === "recent" ? "var(--blue-color)" : "var(--blacktextcolor)" }}
                className="filter-chip"
              />
            </div>

            {/* <div className="feed-sort">
              <Button
                variant="outlined"
                startIcon={<SortOutlined />}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                className="sort-button"
              >
                Sort: {sortBy === "recent" ? "Recent" : sortBy === "popular" ? "Popular" : "Most Reactions"}
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem
                  onClick={() => {
                    setSortBy("recent")
                    setAnchorEl(null)
                  }}
                >
                  Recent
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSortBy("popular")
                    setAnchorEl(null)
                  }}
                >
                  Popular
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSortBy("reactions")
                    setAnchorEl(null)
                  }}
                >
                  Most Reactions
                </MenuItem>
              </Menu>
            </div> */}
          </div>

        </motion.div>



        <UploadPreviewWithProgress />
        <PostContent feed={feed} />
      </div>
      <div ref={homeusggestionRef} className="user-suggestion scrollbar">

        <Queots />
        {resizedisplay && <Leaderboard />}
        <SuggestedUsers homeuser={true} />
        <TrendingPosts />

      </div>




      {isMobile && (<motion.div
        className="home-float-u-btn"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ width: "4rem", height: "4rem", opacity: 1 }}
        whileHover={{
          scale: 1.15,
          boxShadow: "0px 0px 15px rgba(0, 136, 255, 0.6)",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={() => setMpostbtn(true)}
      >
        <Plus size="2rem" />
      </motion.div>
      )}

      <AnimatePresence>
        {mpostbtn && (
          <PostFunctionComponent setContent={setContent} mpostbtn={mpostbtn} setMpostbtn={setMpostbtn} />
        )}
      </AnimatePresence>





    </section>
  );
};

export default Home;
