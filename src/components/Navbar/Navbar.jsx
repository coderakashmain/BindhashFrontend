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
  const [loadingmode,setLoadingmode] = useState(true);
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



      {/* Right Side - Icons */}
      <div className="nav-right">
        <Tooltip title="Feedback">
          <button onClick={() => navigate('/feedback')} className="feedback-btn-nav">Feedback</button>
        </Tooltip>
        {!isMobile && (<p>Beta Version</p>)}
        <Tooltip title={anonmode === 'anonymous' ? "Switch to Self Mode" : "Switch to Anonymous Mode"}>
          <button style={{ cursor: 'pointer' }} onClick={() => {
            setLoadingmode(false);
            setAnonmode((prev) => (prev === 'anonymous' ? 'self' : 'anonymous'));
          }}>
            {anonmode === 'anonymous' ? <FlutterDashRoundedIcon /> : <Ghost />}


          </button>
        </Tooltip>
            <ModeSwitcherToast mode={anonmode} loadingmode={loadingmode} />
        <Tooltip title="switch theme">
          <span>  <ThemeSwitcher /></span>
        </Tooltip>

        <NavLink to="/notifications" className="icon-button">
          <Bell size={17} />
        </NavLink>
  
        <NavLink to={`/profile/o/${usertoken.user.username}`} className="icon-button nav-user-profile-icon">

          <ActiveAvatar username={usertoken?.user.username} profile_pic={usertoken?.user.profile_pic} size="2rem" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
