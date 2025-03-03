import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Slidebar.css";

const Slidebar = () => {
  const sidebarref = useRef(null);

  useEffect(()=>{
    const handleResize = () => {
      if (window.innerWidth < 500) {
        sidebarref.current.style.display = 'none';
      } else {
        sidebarref.current.style.display = 'block';
      }
    };


    handleResize();


    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
 
  },[])

  return (
    <div className="sidebar" ref={sidebarref}>
      {/* Logo */}
      <div className="logo">
        <h2>MySocial</h2>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul>
          <li>
            <Link to="">🏠 Home</Link>
          </li>
          <li>
            <Link to="/profile">👤 Profile</Link>
          </li>
          <li>
            <Link to="/messages">💬 Messages</Link>
          </li>
          <li>
            <Link to="/notifications">🔔 Notifications</Link>
          </li>
          <li>
            <Link to="/settings">⚙️ Settings</Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <button className="logout-btn">🚪 Logout</button>
    </div>
  );
};

export default Slidebar;
