import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './PageRouter.css'
import MobileNav from '../components/Navbar/MobileNav'
import { MobileViewContext } from '../Context/MobileResizeProvider'
import { useSocket } from '../Context/SocketContext'
import { UserAuthCheckContext } from '../Context/UserAuthCheck'


const PageRouter = () => {


  const {isMobile} = useContext(MobileViewContext)
  const { usertoken } = useContext(UserAuthCheckContext);
  const socket = useSocket();

  useEffect(() => {
    const userId = usertoken?.user?.id;
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("addUser", userId); // 🔥 Very important
    });
  }, [socket, usertoken]);
  
  
  return (
    <>

      <Outlet/>

  

    </>
  )
}

export default PageRouter
