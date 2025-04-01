import React, { useEffect, useRef, useState } from 'react'
import './MobileNav.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { House, Store, Megaphone, Search, MessageCircle, User } from 'lucide-react'
import { motion } from 'framer-motion'


const MobileNav = () => {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const scrollContainerRef = useRef(null);
    const location = useLocation();



    useEffect(() => {
      // Select the scrolling container
      scrollContainerRef.current = document.querySelector(".container-box");
  
      if (!scrollContainerRef.current) return;
  
      const handleScroll = () => {
        const currentScrollY = scrollContainerRef.current.scrollTop; 
        
  
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setVisible(false); // Hide navbar when scrolling down
        } else {
          setVisible(true); // Show navbar when scrolling up
        }
  
        lastScrollY.current = currentScrollY;
      };
  
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
      return () => scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

   

    return (
        <motion.section 
           className="mobile-nav glass"
            animate={{ y: visible ? "0%" : "100%"  }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            >
            <NavLink to="" className="mobile-nav-a">
                <motion.button whileTap={{ scale: 0.9 }}>
                    <House  className={location.pathname === "/" ? "mobile-nav-active-icon" : ""}/>
                </motion.button>
            </NavLink>
            <NavLink to="/search" className="mobile-nav-a">
                <motion.button whileTap={{ scale: 0.9 }}>
                <Search className={location.pathname === "/search" ? "mobile-nav-active-icon" : ""} />
                </motion.button>
            </NavLink>
            <NavLink to="/trending-post" className="mobile-nav-a">
                <motion.button whileTap={{ scale: 0.9 }}>
                    <Megaphone className={location.pathname === "/trending-post" ? "mobile-nav-active-icon" : ""} />
                </motion.button>
            </NavLink>
            <NavLink to="/chat" className="mobile-nav-a">
                <motion.button whileTap={{ scale: 0.9 }} >
                    <MessageCircle className={location.pathname === "/chat" ? "mobile-nav-active-icon" : ""} />
                </motion.button>
            </NavLink>
        </motion.section>
    )
}

export default MobileNav
