import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flame ,ChartNoAxesCombined,ThumbsUp} from "lucide-react";
import defaultprofilepic from '../../Photo/defaultprofilepic.png'
import './TrendingPosts.css'
import PostModel from "../Post/PostModel";
import Time from "../Time/Time";
import PostContent from "../Post/PostContent";


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
 
// console.log(trendingPosts)
  return (
    <div className="trendingcom-trending-posts">
      <h2> <span className="trendingpost-head-spen">Trending Posts </span><span style={{fontWeight : 'bold'}}>Top 10</span></h2>
      {/* <ul>
        {trendingPosts.length > 0 ? trendingPosts.map((post) => (
          <li key={post.id} className="trendingcom-trending-post"  >
            <div className="trendingcom-user-info" >
              <img src= {post.profile_pic ? post.profile_pic : defaultprofilepic} alt={post.username} className="profile-pic"  />
             
              <span className="trendingcom-username">{post.username}</span>
            </div>
            <p className="trendingcom-post-content">{post.content}</p>
            {post.image && <img src={post.image} alt="Post" className="trendingcom-post-image"  onClick={() => setSelectedPostId(post.id)}/>}
            <div className="trendingcom-post-meta">
              <span className="trendingcom-likes"><ThumbsUp  size={16} color="#007BFF"/> {post.like_count} Likes</span>
              <span className="trendingcom-time">
                <Time posttime={post.created_at}/>
               </span>
            </div>
          </li>
        )) : (
          <button className="no-t-p">No Post Yet</button>

        )}
      </ul> */}
       <PostContent feed={trendingPosts} moreload={false} />
      {selectedPostId && <PostModel postId={selectedPostId} onClose={() => setSelectedPostId(null)} />}
    </div>
  );
};

export default TrendingPosts;
