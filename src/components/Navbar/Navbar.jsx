import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Bell, Mail, User, Home, LogIn, UserPlus, MessageCircle ,Search,Medal} from "lucide-react";
import "./Navbar.css";
import weblogo from '../../Photo/weblogo.svg'
import Bangbox from "../Bangbox/Bangbox";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import defaulprofilepic from '../../Photo/defaultprofilepic.png'


const Navbar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { usertoken } = useContext(UserAuthCheckContext)
  const navigate = useNavigate();
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


  return (
    <nav className="navbar">
      {/* Left Side - Logo */}
      <div className="nav-left">
        <Bangbox  size= {'1.7rem'} click={true} />
      </div>

      {/* Middle - Navigation Links */}
      {!isMobile && (<div className="nav-center">
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
      </div>)}

      {/* Right Side - Icons */}
      <div className="nav-right">
        {/* {isMobile && (<NavLink to="/leaderboard" className="icon-button">
          <Medal size={22} />
        </NavLink>)} */}
         <NavLink to="/notifications" className="icon-button">
          <Bell  size={22} />
        </NavLink>
        {!isMobile && (<NavLink to="/chat" className="icon-button">
          <MessageCircle size={22} />
        </NavLink>)}
        {isMobile && ( <NavLink to="/search" className="icon-button ">
        
           <Search size={22}  strokeWidth={2}/>
         
        </NavLink>) }
        <NavLink to="/profile" className="icon-button nav-user-profile-icon">
        
       {     <img src={usertoken.user.profile_pic ? usertoken.user.profile_pic : defaulprofilepic } alt="" />}
         
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
