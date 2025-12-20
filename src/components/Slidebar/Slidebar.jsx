import React, { useContext, useEffect, useRef, useState } from "react";
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
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { motion, AnimatePresence } from 'framer-motion'
import { MobileViewContext } from "../../Context/MobileResizeProvider";
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import HouseOutlinedIcon from '@mui/icons-material/HouseRounded';
import AppsOutlinedIcon from '@mui/icons-material/AppsRounded';
import Face6Icon from '@mui/icons-material/Face6';
import DrawIcon from '@mui/icons-material/Draw';
import CombineAvatat from "../Avatar/CombineAvatat";
import LiveAvatar from "../Avatar/LiveAvatar";


const Slidebar = () => {
  const sidebarref = useRef(null);
  const location = useLocation();
  const dragHandleRef = useRef(null);
  const { usertoken } = useContext(UserAuthCheckContext)
  const { setSnackbar } = useContext(SnackbarContext);
  const [collapsed, setCollapsed] = useState(false);









  useEffect(() => {
    const handleResize = () => {
      if (sidebarref.current) {

        if (window.innerWidth < 640) {
          sidebarref.current.style.display = 'none';
        } else {

          sidebarref.current.style.display = 'block';
        }
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


  useEffect(() => {
    const resizeHandle = () => {
      if (window.innerWidth < 872) {
        setCollapsed(true);
      };

    }

    window.addEventListener('resize', resizeHandle);

    return () => window.removeEventListener('resize', resizeHandle);
  }, []);

  if (!usertoken || !usertoken.user) return null;

  return (
    <motion.div
      animate={{ width: collapsed ? '3%' : '18rem' }}
      transition={{ duration: 0.9 }}

      style={{ padding: collapsed ? '0.8rem 0.4rem' : '' }}
      className="sidebar" ref={sidebarref}>


      {/* Logo */}

      <div className="sidebar-header">

        <div className="logo" style={{ justifyContent: collapsed ? 'center' : 'space-between' }}>
          {!collapsed && (<Bangbox size="1.7rem" />)}
        </div>
        <button className="sidebar-p-b " style={{ gap: '0.9rem', flexWrap: collapsed ? 'wrap' : 'nowrap', flexDirection: collapsed ? 'column' : 'row', width : collapsed ? '100%' : 'auto' }}>

          <ViewSidebarIcon onClick={() => setCollapsed(!collapsed)} className="squize-sidebar" sx={{ cursor: 'pointer' }} />

        </button>
      </div>



      {/* Navigation Links */}

      <ul className={`${collapsed ? 'centerli' : ''} `}>
        <li>
          <Link to="/" style={location.pathname === '/' ? { color: 'var(--primary-color)' } : {}}><Diversity3RoundedIcon strokeWidth={location.pathname === '/room' ? 3 : '2'} size='1.3rem' /> {collapsed ? '' : "Rooms"}</Link>
        </li>

        <li>
          <Link to="/feed" style={location.pathname === '/feed' ? { color: 'var(--primary-color)' } : {}}><HouseOutlinedIcon strokeWidth={location.pathname === '/' ? 3 : '2'} size='1.3rem' /> {collapsed ? '' : "Feed"}</Link>
        </li>


        <li>
          <Link to="/chat" style={location.pathname === '/chat' ? { color: 'var(--primary-color)' } : {}}><ChatRoundedIcon strokeWidth={location.pathname === '/chat' ? 3 : '2'} size='1.3rem' />{collapsed ? '' : "Chats"} </Link>
        </li>
        <li>
          <Link to="/createpost" style={location.pathname === '/createpost' ? { color: 'var(--primary-color)' } : {}}><DrawIcon strokeWidth={location.pathname === '/createpost' ? 3 : '2'} size='1.3rem' />{collapsed ? '' : "Create Post"} </Link>
        </li>
        <li>
          <Link to={`/profile/o/${usertoken?.user?.username}`} style={location.pathname === `/profile/o/${usertoken?.user?.username}` ? { color: 'var(--primary-color)' } : {}}><Face6Icon strokeWidth={location.pathname === `/Profile/o/${usertoken.user.username}` ? 3 : '2'} size='1.3rem' /> {collapsed ? '' : "Profile"}</Link>
        </li>
        <li>
          <Link to="/setting" style={location.pathname === '/setting' ? { color: 'var(--primary-color)' } : {}}><AppsOutlinedIcon size='1.3rem' strokeWidth={location.pathname === '/setting' ? 3 : '2'} /> {collapsed ? '' : "Settings"}</Link>
        </li>
      </ul>
      <hr style={{ borderColor: 'var(--lighttextcolor)', opacity: 0.2 }} />
      {!collapsed && (<h4>Own Rooms</h4>)}
      <ul className="own-rooms-ul">
        <li style={{ justifyContent: collapsed ? 'center' : 'flex-start', background: 'var(--logolinearcolor)' }}> <Avatar sx={{ background: collapsed ? 'transparent' : 'var(--lightbackcolor2)', color: 'var(--bothwhitecolor)' }}><AddIcon /></Avatar> {collapsed ? '' : 'Create a new room'}</li>
      </ul>



      <div ref={dragHandleRef} className="sidebar-drag"></div>

      {/* Logout Button */}

    </motion.div>
  );
};

export default Slidebar;
