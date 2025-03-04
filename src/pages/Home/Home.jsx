import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import './Home.css'
import { AllPostContextData } from "../../Context/AllPostContext";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { useNavigate } from "react-router-dom";
import { Heart } from 'lucide-react'
import ProfileStats from "../../components/ProfileStats/ProfileStats";
import Followbtn from "../../components/ProfileStats/Followbtn";
import ProfileUpload from "../../components/ProfileUpload/ProfileUpload";


const Home = () => {
  const { allpost, setAllpost, isLiked, setIsLiked } = useContext(AllPostContextData);
  const { usertoken } = useContext(UserAuthCheckContext);

  const [newComment, setNewComment] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const navigate = useNavigate();


  useEffect(()=>{
    if (usertoken === null) { 
      navigate("/login");
    }
  },[usertoken])
  if (usertoken === null) {
    return null; 
  }


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



  return (
    <section className="container">
       <div className="home-profile-out-box">
      <div className="home-profile">
        <div className="profile-header">
          <div className="profile-pic-container">
            <img
              src={usertoken.user.profile_pic ? `http://localhost:3000${usertoken.user.profile_pic}` : "/default-profile.png"}
              alt="Profile"
              className="profile-pic-large"
            />
            <ProfileUpload /> {/* Upload Icon & Functionality */}
          </div>
          <h2>{usertoken.user.username}</h2>
          <p className="profile-bio">{usertoken.user.bio || "No bio available."}</p>
        </div>

        <div className="profile-stats">
          <div>
            <strong>{allpost.length > 0 ? allpost.find(post => post.post_user_id === usertoken.user.id)?.post_count || 0 : 0}</strong> <span>Posts</span>


          </div>
          <div>
            <ProfileStats />
          </div>

        </div>

        <button className="edit-profile-btn">Edit Profile</button>
      </div>
     </div>
      <div className="container-box">
        <h2>Posts</h2>
        {allpost.map((allpost) => (
          <div key={allpost.post_id} className="post">
            {/* Profile section */}
            <div className="post-header">

              <img
                src={allpost.post_user_pic ? `http://localhost:3000${allpost.post_user_pic}` : "/default-profile.png"}
                alt="Profile"
                className="profile-pic"
              />

              <h3>{allpost.post_username}</h3>
            </div>
            {<p>{new Date(allpost.created_at).toLocaleString()}</p>}

            {/* Post content */}
            {allpost.image && <div className="post-head-img-box"> <img src={`http://localhost:3000${allpost.image}`} loading="lazy" alt="Post" className="post-image" /></div>}
            <p>{allpost.content}</p>

            <div className="post-actions">
              <button
                onClick={() => handleLike(allpost.post_id)}
                className={isLiked[allpost.post_id] ? "liked" : ""}
              >
                <Heart size={20} fill={isLiked[allpost.post_id] ? "red" : "white"} color={isLiked[allpost.post_id] ? "red" : "black"} /> {allpost.like_count}
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
                allpost.comments.map((comment) => (
                  <div key={comment.comment_id} className="comment">
                    <img src={comment.commenter_pic ? `http://localhost:3000${comment.commenter_pic}` : "/default-profile.png"} alt="User" className="comment-pic" />
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
    </section>
  );
};

export default Home;
