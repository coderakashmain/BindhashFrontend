import React from 'react';
import './ChatListSkeleton.css'; 
const ChatListSkeleton = ({rows = 7}) => {
  return (
    <div className="chatlist-skal-container">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="chatlist-skal-item">
          <div className="chatlist-skal-avatar shimmer"></div>
          <div className="chatlist-skal-text">
            <div className="chatlist-skal-name shimmer"></div>
            <div className="chatlist-skal-preview shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListSkeleton;
