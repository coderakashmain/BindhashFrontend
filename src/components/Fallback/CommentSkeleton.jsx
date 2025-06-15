import React from 'react'
import './CommentSkeleton.css';

const CommentSkeleton = () => {
  return (
    <div className="comment-skal-container">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="comment-skal-card">
          <div className="comment-skal-avatar shimmer"></div>
          <div className="comment-skal-content">
            <div className="comment-skal-line short shimmer"></div>
            <div className="comment-skal-line long shimmer"></div>
            <div className="comment-skal-line long shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSkeleton;
