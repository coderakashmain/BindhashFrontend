import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Profile.css'
import Post from "../../components/Post/Post";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const {usertoken,setUsertoken} = useContext(UserAuthCheckContext); 
  const usercheck = sessionStorage.getItem('logintoken');
  
  
  

  useEffect(() => {

    
      if (!usertoken) {
      
        navigate('/login')
      
    }else{
  
      setUser(usertoken.user);
      fetchUserPosts(usertoken.user.id);
    }

    
  }, [usertoken,usercheck]);

  if (usertoken === null) {
    return null; // Prevent rendering until authentication state is resolved
  }





  const fetchUserPosts = async (userId) => {
    try {
      const response = await axios.get(`/api/posts/user/${userId}`);
      setPosts(response.data);
      
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.post("/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setContent("");
      setImage(null);
      fetchUserPosts(user.id);
      alert('sucess');
    } catch (err) {
      console.error("Error creating post:", err);
      alert('error');
    }
  };

  const logout = ()=>{
    axios.post(`/api/auth/logout`).then((res) => {
      alert("Logged out successfully");

      sessionStorage.removeItem("logintoken");  
      setUsertoken(null);  

      window.location.reload(); 
    }) .catch((err) => console.error("Logout Error:", err));
   
  }

  return (
    <div className="profile-container">
      {user && (
        <>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={logout}>Logout</button>

          {/* Post Creation Form */}
          <form onSubmit={handlePostSubmit} className="Profile-post-form">
            <textarea
              placeholder="Write something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit">Post</button>
          </form>

        
          <h3>Your Posts</h3>
         
         
        </>
      )}

    </div>
  );
};

export default Profile;
