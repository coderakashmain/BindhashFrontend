import React from "react";
import './PostCardSkeleton.css'


const PostCardSkeleton = () => {
  return (
    <div className="post-skel-l-container shimmer">
      <div className="post-skel-l-header">
        <div className="post-skel-l-avatar shimmer"></div>
        <div className="post-skel-l-userinfo">
          <div className="post-skel-l-username shimmer"></div>
          <div className="post-skel-l-time shimmer"></div>
        </div>
        <div className="post-skel-l-dots shimmer"></div>
      </div>

      <div className="post-skel-l-text shimmer"></div>

      <div className="post-skel-l-image shimmer"></div>

      <div className="post-skel-l-footer">
        <div className="post-skel-l-btn shimmer"></div>
        <div className="post-skel-l-btn shimmer"></div>
        <div className="post-skel-l-btn shimmer"></div>
        <div className="post-skel-l-btn shimmer"></div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
