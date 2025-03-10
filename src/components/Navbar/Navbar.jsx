import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Bell, Mail, User, Home, LogIn, UserPlus ,MessageCircle} from "lucide-react";
import "./Navbar.css";
import weblogo from '../../Photo/weblogo.svg'
import Bangbox from "../Bangbox/Bangbox";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      {/* Left Side - Logo */}
      <div className="nav-left">
        <Bangbox  click={true}/>
      </div>

      {/* Middle - Navigation Links */}
      <div className="nav-center">
        <NavLink to="/" style={{backgroundColor : `${location.pathname === '/' ? 'var(--buttonhovercolor)' : ''}`,color : `${location.pathname === '/' ? 'var(--buttoncolor) ' : ''}`}}  className="nav-link">
          <Home size={20} /> 
        </NavLink>
        <NavLink to="/profile" style={{backgroundColor : `${location.pathname === '/profile' ? 'var(--buttonhovercolor)' : ''}`,color : `${location.pathname === '/profile' ? 'var(--buttoncolor) ' : ''}`}}  className="nav-link">
          <User size={20} /> 
        </NavLink>
        <NavLink to="/login" style={{backgroundColor : `${location.pathname === '/login' ? 'var(--buttonhovercolor)' : ''}`,color : `${location.pathname === '/login' ? 'var(--buttoncolor) ' : ''}`}} className="nav-link">
          <LogIn size={20} /> 
        </NavLink>
        <NavLink to="/register" style={{backgroundColor : `${location.pathname === '/register' ? 'var(--buttonhovercolor)' : ''}`,color : `${location.pathname === '/register' ? 'var(--buttoncolor) ' : ''}`}}  className="nav-link">
          <UserPlus size={20} /> 
        </NavLink>
      </div>

      {/* Right Side - Icons */}
      <div className="nav-right">
        <NavLink to="/messages" className="icon-button">
          <Mail size={22} />
        </NavLink>
        <NavLink to="/notifications" className="icon-button">
          <Bell size={22} />
        </NavLink>
        <NavLink to="/chat" className="icon-button">
        <MessageCircle   size={22}/>
        </NavLink>
        <NavLink to="/profile" className="icon-button">
          <User size={22} />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
