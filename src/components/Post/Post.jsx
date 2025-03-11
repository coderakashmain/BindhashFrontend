import React, { useState, useEffect } from "react";
import axios from "axios";

const Post = ({ post, user }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  

  useEffect(() => {
    // Fetch like count
    axios.get(`/api/posts/likes/${post.id}`).then((res) => {
      setLikes(res.data.likeCount);
    });
  }, [post.id]);

  const handleLike = async () => {
    try {
      await axios.post("/api/posts/like", {
        user_id: user.id,
        post_id: post.id,
      });

      // Toggle like state
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="post">
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" loading="lazy" className="post-image" />}
      <div className="post-actions">
        <button onClick={handleLike} className={liked ? "liked" : ""}>
          👍 {likes} Likes
        </button>
      </div>
    </div>
  );
};

export default Post;
