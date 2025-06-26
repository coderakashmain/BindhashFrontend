import React, { useState } from 'react';

const TruncatedText = ({ text, limit = 100,isShowmore = true}) => {
  const [showFull, setShowFull] = useState(false);

  if (text.length <= limit) return <p>{text}</p>;

  return (
    <p>
      {showFull ? text : `${text.substring(0, limit)}... `}
      <span
        style={{ color: 'var(--blue-color)', cursor: 'pointer',display : 'inline' }}
        onClick={() => setShowFull(!showFull)}
      >
        {isShowmore&&( showFull ? 'Show less' : 'Read more')}
      </span>
    </p>
  );
};
export default TruncatedText;