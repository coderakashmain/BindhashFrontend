import React, { useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Slidebar.css";
import { House, CirclePlus, PenLine, CircleUser, Settings, LogOut } from 'lucide-react'
import Bangbox from "../Bangbox/Bangbox";
import Avatar from '@mui/material/Avatar';
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import ActiveAvatar from "../Avatar/AvatacActive";
import { SnackbarContext } from "../../Context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';


const Slidebar = () => {
  const sidebarref = useRef(null);
  const location = useLocation();
  const dragHandleRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const { usertoken } = useContext(UserAuthCheckContext)
  const {setSnackbar} = useContext(SnackbarContext);


  useEffect(() => {
    const handleMouseDown = (e) => {
      if(sidebarref.current){
        isDragging.current = true;
        startX.current = e.clientX;
  
        startWidth.current = sidebarref.current.offsetWidth;
  
        // Prevent text selection while dragging
        document.body.style.userSelect = 'none';
      }

    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;


      const deltaX = e.clientX - startX.current;
      const newWidth = startWidth.current + deltaX;
      if (newWidth > 250 && newWidth < 600) {
        sidebarref.current.style.width = `${newWidth}px`;
      }




    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = 'auto';
    };

    dragHandleRef.current.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      if(dragHandleRef.current)   dragHandleRef.current.removeEventListener('mousedown', handleMouseDown);
    
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
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

  }, []);

  const handleLogout = async () => {


    try {
      setSnackbar({ open: true, message: "Logged out successfully", type: "success" });
      await axios.post(`/api/auth/logout`)

      window.location.href = "/login";
      // window.location.reload();
    } catch (err) {
      console.error("Logout Error:", err)
    }

  }

  return (
    <div className="sidebar" ref={sidebarref}>
      {/* Logo */}
      <div className="logo">
        <Bangbox size="1.7rem" />
      </div>

      {/* Navigation Links */}
      <nav>
        <ul>
          <li>
            <Link to="" style={location.pathname === '/' ? { color: 'var(--primary-color)' } : {}}><House strokeWidth={location.pathname === '/' ? 3 : '2'} size='1.3rem' /> Home</Link>
          </li>
          <li>
            <Link to="/explore" style={location.pathname === '/explore' ? { color: 'var(--primary-color)' } : {}}><CirclePlus strokeWidth={location.pathname === '/explore' ? 3 : '2'} size='1.3rem' /> Explore</Link>
          </li>
          <li>
            <Link to="/room" style={location.pathname === '/room' ? { color: 'var(--primary-color)' } : {}}><CirclePlus strokeWidth={location.pathname === '/room' ? 3 : '2'} size='1.3rem' /> Rooms</Link>
          </li>
          <li>
            <Link to="/chat" style={location.pathname === '/chat' ? { color: 'var(--primary-color)' } : {}}><CirclePlus strokeWidth={location.pathname === '/chat' ? 3 : '2'} size='1.3rem' /> Chats</Link>
          </li>
          <li>
            <Link to="/createpost" style={location.pathname === '/createpost' ? { color: 'var(--primary-color)' } : {}}><PenLine strokeWidth={location.pathname === '/createpost' ? 3 : '2'} size='1.3rem' /> Create Post</Link>
          </li>
          <li>
            <Link to="/profile" style={location.pathname === '/profile' ? { color: 'var(--primary-color)' } : {}}><CircleUser strokeWidth={location.pathname === '/profile' ? 3 : '2'} size='1.3rem' /> Profile</Link>
          </li>
          <li>
            <Link to="/setting" style={location.pathname === '/setting' ? { color: 'var(--primary-color)' } : {}}><Settings size='1.3rem' strokeWidth={location.pathname === '/setting' ? 3 : '2'} /> Settings</Link>
          </li>
        </ul>
          <hr style={{ borderColor : 'var(--lighttextcolor)' , opacity : 0.2}} />
          <h4>Own Rooms</h4>

          <ul className="own-rooms-ul">
            <li> <Avatar sx={{backgroundColor : 'var(--icon-back-color)' , color : 'var(--icon-color)'}}><AddIcon/></Avatar> Create a new room</li>
          </ul>

      </nav>

      <div ref={dragHandleRef} className="sidebar-drag"></div>

      {/* Logout Button */}
      <button className="sidebar-p-b">
        <aside>
          <div className="sidebar-p-b-a">


            <ActiveAvatar size="40" username={usertoken?.user?.username} profile_pic={usertoken?.user?.profile_pic} />
          </div>
          <div className="sidebar-p-b-n">
            <span>{usertoken?.user?.fullname}</span>
            <span>@{usertoken?.user?.username}</span>
          </div>

        </aside>
        <div className="sidebar-p-b-logout" onClick={handleLogout}>
          <LogOut size='1.3rem' />
        </div>

      </button>
    </div>
  );
};

export default Slidebar;
