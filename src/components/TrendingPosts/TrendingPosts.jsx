import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flame ,ChartNoAxesCombined,ThumbsUp} from "lucide-react";
import defaultprofilepic from '../../Photo/defaultprofilepic.png'
import './TrendingPosts.css'
import PostModel from "../Post/PostModel";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await axios.get("/api/posts/trending-posts");
        setTrendingPosts(response.data);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      }
    };

    fetchTrendingPosts();
  }, []);
 

  return (
    <div className="trendingcom-trending-posts">
      <h2><ChartNoAxesCombined size = {24} />Trending Posts</h2>
      <ul>
        {trendingPosts.map((post) => (
          <li key={post.id} className="trendingcom-trending-post"  >
            <div className="trendingcom-user-info" >
              <img src= {post.profile_pic ? post.profile_pic : defaultprofilepic} alt={post.username} className="profile-pic"  />
             
              <span className="trendingcom-username">{post.username}</span>
            </div>
            <p className="trendingcom-post-content">{post.content}</p>
            {post.image && <img src={post.image} alt="Post" className="trendingcom-post-image"  onClick={() => setSelectedPostId(post.id)}/>}
            <div className="trendingcom-post-meta">
              <span className="trendingcom-likes"><ThumbsUp  size={16} color="#007BFF"/> {post.like_count} Likes</span>
              <span className="trendingcom-time">{new Date(post.created_at).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
      {selectedPostId && <PostModel postId={selectedPostId} onClose={() => setSelectedPostId(null)} />}
    </div>
  );
};

export default TrendingPosts;
