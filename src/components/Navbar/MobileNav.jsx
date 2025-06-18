import React, { useEffect, useRef, useState } from 'react'
import './MobileNav.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { House, Medal, Settings, Store, Megaphone, Search, MessageCircle, User } from 'lucide-react'
import { motion } from 'framer-motion'
import AppsOutlinedIcon from '@mui/icons-material/AppsRounded';
import HouseOutlinedIcon from '@mui/icons-material/HouseRounded';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import { Tooltip } from '@mui/material'


const MobileNav = () => {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const scrollContainerRef = useRef(null);
    const location = useLocation();



    useEffect(() => {

        scrollContainerRef.current = document.querySelector(".container-box");

        if (!scrollContainerRef.current) return;

        const handleScroll = () => {
            const currentScrollY = scrollContainerRef.current.scrollTop;


            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        scrollContainerRef.current.addEventListener("scroll", handleScroll);
        return () => scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);



    return (
        <motion.section
            className="mobile-nav glass"
            animate={{ y: visible ? "0%" : "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <NavLink to="" className="mobile-nav-a">
                <Tooltip title="Home">
                    <motion.button whileTap={{ background: 'var(--lightbackcolor)' }}>
                        <HouseOutlinedIcon className={location.pathname === "/" ? "mobile-nav-active-icon" : ""} />
                    </motion.button>
                </Tooltip>
            </NavLink>
            <NavLink to="/search" className="mobile-nav-a">
                <Tooltip title='Search'>

                    <motion.button whileTap={{ background: 'var(--lightbackcolor)' }}>
                        <TroubleshootOutlinedIcon className={location.pathname === "/search" ? "mobile-nav-active-icon" : ""} />
                    </motion.button>
                </Tooltip>
            </NavLink>


            <NavLink to="/room" className="mobile-nav-a">
                <Tooltip title='Rooms'>
                    <motion.button whileTap={{ background: 'var(--lightbackcolor)' }}>
                        <Groups3OutlinedIcon className={location.pathname === "/room" ? "mobile-nav-active-icon" : ""} />
                    </motion.button>
                </Tooltip>


            </NavLink>
            <NavLink to="/chat" className="mobile-nav-a">

                <Tooltip title='Chats'>
                    <motion.button whileTap={{ background: 'var(--lightbackcolor)' }} >
                        <MarkUnreadChatAltOutlinedIcon className={location.pathname === "/chat" ? "mobile-nav-active-icon" : ""} />
                    </motion.button>
                </Tooltip>
            </NavLink>


            <NavLink to="/setting" className="mobile-nav-a">

                <Tooltip title='Setting'>
                    <motion.button whileTap={{ background: 'var(--lightbackcolor)' }} >
                        <AppsOutlinedIcon className={location.pathname === "/setting" ? "mobile-nav-active-icon" : ""} />
                    </motion.button>
                </Tooltip>

            </NavLink>
        </motion.section>
    )
}

export default MobileNav
