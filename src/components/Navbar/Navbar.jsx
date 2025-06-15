import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Bell, Mail, User, Home, LogIn, UserPlus, MessageCircle, Search, Medal, Ghost } from "lucide-react";
import "./Navbar.css";
import weblogo from '../../Photo/weblogo.svg'
import Bangbox from "../Bangbox/Bangbox";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import defaulprofilepic from '../../Photo/defaultprofilepic.png'
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import UserSearch from "../UserSearch/UserSearch";
import ActiveAvatar from "../Avatar/AvatacActive";
import FlutterDashRoundedIcon from '@mui/icons-material/FlutterDashRounded';
import { Tooltip } from "@mui/material";
import ModeSwitcherToast from "../ThemeSwitcher/ModeSwitcherToast ";



const Navbar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { usertoken } = useContext(UserAuthCheckContext)
  const navigate = useNavigate();
  const [anonmode, setAnonmode] = useState('')
  useEffect(() => {
    if (!usertoken) {
      return
    }
  }, [usertoken, navigate]);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (usertoken?.user.visibility === 'anonymous') {
      setAnonmode('anonymous')
    } else {
      setAnonmode('self');
    }

  }, [usertoken])



  return (
    <nav className="navbar" style={{ padding: isMobile ? '0rem 0.5rem' : '' }}>
      {/* Left Side - Logo */}
      <div className="nav-left">


        <Bangbox size={'1.5rem'} click={true} />
        <div className="nav-left-search-b">

          {!isMobile && (<UserSearch />)}
        </div>
      </div>

      {/* Middle - Navigation Links */}
      {/* {!isMobile && (<div className="nav-center">
        <NavLink to="/" style={{ backgroundColor: `${location.pathname === '/' ? 'var(--buttonhovercolor)' : ''}`, color: `${location.pathname === '/' ? 'var(--buttoncolor) ' : ''}` }} className="nav-link">
          <Home size={20} />
        </NavLink>
        <NavLink to="/profile" style={{ backgroundColor: `${location.pathname === '/profile' ? 'var(--buttonhovercolor)' : ''}`, color: `${location.pathname === '/profile' ? 'var(--buttoncolor) ' : ''}` }} className="nav-link">
          <User size={20} />
        </NavLink>
        <NavLink to="/login" style={{ backgroundColor: `${location.pathname === '/login' ? 'var(--buttonhovercolor)' : ''}`, color: `${location.pathname === '/login' ? 'var(--buttoncolor) ' : ''}` }} className="nav-link">
          <LogIn size={20} />
        </NavLink>
        <NavLink to="/register" style={{ backgroundColor: `${location.pathname === '/register' ? 'var(--buttonhovercolor)' : ''}`, color: `${location.pathname === '/register' ? 'var(--buttoncolor) ' : ''}` }} className="nav-link">
          <UserPlus size={20} />

        </NavLink>
      </div>)} */}

      {/* Right Side - Icons */}
      <div className="nav-right">
        <Tooltip title="Feedback">
          <button onClick={() => navigate('/feedback')} className="feedback-btn-nav">Feedback</button>
        </Tooltip>
        {!isMobile && (<p>Beta Version</p>)}
        <Tooltip title={anonmode === 'anonymous' ? "Switch to Self Mode" : "Switch to Anonymous Mode"}>
          <button style={{ cursor: 'pointer' }} onClick={() => {

            setAnonmode((prev) => (prev === 'anonymous' ? 'self' : 'anonymous'));
          }}>
            {anonmode === 'anonymous' ? <FlutterDashRoundedIcon /> : <Ghost />}


          </button>
        </Tooltip>
            <ModeSwitcherToast mode={anonmode} />
        <Tooltip title="switch theme">
          <span>  <ThemeSwitcher /></span>
        </Tooltip>

        <NavLink to="/notifications" className="icon-button">
          <Bell size={17} />
        </NavLink>
        {/* {!isMobile && (<NavLink to="/chat" className="icon-button">
          <MessageCircle size={22} />
        </NavLink>)}
        {isMobile && (<NavLink to="/search" className="icon-button ">

          <Search size={22} strokeWidth={2} />

        </NavLink>)} */}
        <NavLink to="/profile" className="icon-button nav-user-profile-icon">

          <ActiveAvatar username={usertoken?.user.username} profile_pic={usertoken?.user.profile_pic} size="2rem" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
