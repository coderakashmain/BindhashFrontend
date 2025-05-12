import React, { useState } from 'react';

const TruncatedText = ({ text, limit = 100 }) => {
  const [showFull, setShowFull] = useState(false);

  if (text.length <= limit) return <p>{text}</p>;

  return (
    <p>
      {showFull ? text : `${text.substring(0, limit)}... `}
      <span
        style={{ color: 'lightblue', cursor: 'pointer' }}
        onClick={() => setShowFull(!showFull)}
      >
        {showFull ? ' show less' : 'read more'}
      </span>
    </p>
  );
};
export default TruncatedText;