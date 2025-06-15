import React from 'react';
import './ChatSkeleton.css';

const ChatSkeleton = () => {
  return (
    <div className="chat-skal-container">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`chat-skal-message ${i % 2 === 0 ? 'left' : 'right'}`}
        >
          <div className="chat-skal-bubble shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
