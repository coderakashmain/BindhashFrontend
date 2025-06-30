import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '@mui/icons-material'; // MUI Icon
import './SubRoomDefaultChatpage.css'; // Make sure this file exists

const SubRoomDefaultChatpage = () => {
  const { category, slug } = useParams();
  const roomname = slug.split("-").slice(0, -1).join(" ").toUpperCase();

  return (
    <aside id="default-subroompage" className="subroom-d-page-container">
      <div className="subroom-d-page-header">
        <Person className="subroom-d-page-icon" />
        <h3 className="subroom-d-page-title">{roomname}</h3>
      </div>
      <p className="subroom-d-page-slogan">
        “Every chat starts with a vibe. Let yours be felt !”
      </p>
    </aside>
  );
};

export default SubRoomDefaultChatpage;
