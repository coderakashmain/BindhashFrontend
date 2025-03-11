import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import './Home.css'
import { AllPostContextData } from "../../Context/AllPostContext";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Search, ThumbsUp, Send } from 'lucide-react'
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




const Home = () => {
  const { allpost, setAllpost, isLiked, setIsLiked } = useContext(AllPostContextData);
  const { usertoken } = useContext(UserAuthCheckContext);

  const [newComment, setNewComment] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const navigate = useNavigate();
  const [profilepicloading, setProfilepicloading] = useState(false);
  const homeporfileRef = useRef();
  const homeusggestionRef = useRef();
  const [resizedisplay, setResizeddisplay] = useState(true);


  useEffect(() => {
    if (usertoken === null) {
      navigate("/login");
    }
  }, [usertoken])
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

  const stories = [
    {
      id: 1,
      image: "https://picsum.photos/200",
      username: "Akash",
    },
    {
      id: 2,
      image: "https://picsum.photos/200",
      username: "Akash",
    },
    {
      id: 3,
      image: "https://picsum.photos/200",
      username: "Akash",
    },
    {
      id: 4,
      image: "https://picsum.photos/200",
      username: "Akash",
    },
    {
      id: 5,
      image: "https://picsum.photos/200",
      username: "Akash",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/150",
      username: "Ravi",
    },
  ];



  return (
    <section className="container">
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
                <ProfileUpload setProfilepicloading={setProfilepicloading} />
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
          <div className="home-post-box-story scrollbar">
            <ul className="home-story-box">
            {stories.map((story) => (
        <li key={story.id}  > 
            <img src={story.image} alt={story.username} />
         </li>
      ))}
              {/* <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li> */}
            </ul>
          </div>
            <div className="home-post-box-upload">
              <div className="home-post-type-box ">
                <input type="text" name="post"  />
                <button className="button">Post</button>
              </div>
              <div className="home-post-button-box"></div>

            </div>


        </div>
        <h2>Posts</h2>
        {allpost.map((allpost) => (
          <div key={allpost.post_id} className="post">
            {/* Profile section */}
            <div className="post-header">

              <img
                src={allpost.post_user_pic ? allpost.post_user_pic : defaultprofilephoto}
                alt="Profile"
                className="profile-pic"

              />

              <h3>{allpost.post_username}</h3>
            </div>
            {<p>{new Date(allpost.created_at).toLocaleString()}</p>}

            {/* Post content */}
            {allpost.image && <div className="post-head-img-box"> <img src={allpost.image} loading="lazy" alt="Post" className="post-image" onClick={() => setSelectedPostId(allpost.post_id)} /></div>}
            <p>{allpost.content}</p>

            <div className="post-actions">
              <button
                onClick={() => handleLike(allpost.post_id)}
                className={isLiked[allpost.post_id] ? "liked" : ""}
              >
                <ThumbsUp size={20} fill={isLiked[allpost.post_id] ? "white" : "white"} color={isLiked[allpost.post_id] ? "#007BFF" : "black"} /> {allpost.like_count}
              </button>
              <button>
                <MessageCircle size={20} />
                {allpost.comments.filter(comment => comment.comment_id && comment.comment_text).length}
              </button>

            </div>

            <div className="comments-section">
              <form onSubmit={(e) => handleCommentSubmit(allpost.post_id, e)}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment[allpost.post_id] || ""}
                  onChange={(e) => handleCommentChange(allpost.post_id, e.target.value)}
                />
                <button type="submit">Post</button>
              </form>

              {/* Display Comments */}


              {allpost.comments.length > 0 ? (
                allpost.comments
                  .filter(comment => comment.comment_id && comment.comment_text) // Only render valid comments
                  .map((comment) => (
                    <div key={comment.comment_id} className="comment">
                      <img
                        src={comment.commenter_pic ? comment.commenter_pic : defaultprofilephoto}
                        alt="User"
                        className="comment-pic"
                      />
                      <p>
                        <strong>{comment.commenter_username}:</strong> {comment.comment_text}
                      </p>
                    </div>
                  ))
              ) : (
                <p>No comments yet.</p>
              )}

            </div>


          </div>
        ))}

      </div>
      <div ref={homeusggestionRef} className="user-suggestion scrollbar">
        <UserSearch />
        {resizedisplay && <Leaderboard />}
        <SuggestedUsers />
        <TrendingPosts />

      </div>
      {selectedPostId && <PostModel postId={selectedPostId} onClose={() => setSelectedPostId(null)} />}
    </section>
  );
};

export default Home;
