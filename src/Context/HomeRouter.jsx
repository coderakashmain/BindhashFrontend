import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { MobileViewContext } from './MobileResizeProvider'
import MobileNav from '../components/Navbar/MobileNav'



const HomeRouter = () => {
  const {isMobile} = useContext(MobileViewContext)
  const location = useLocation();
  const [navvisibelity, setNavVisibility] = React.useState(true);

  useEffect(() => {
    if (location.pathname.startsWith('/chat/mobilechat')) {
      setNavVisibility(false);
    } else {
      setNavVisibility(true);
    }
  }, [location.pathname]);


  return (
    <>
       <Navbar />
      <Outlet/>
      {isMobile && navvisibelity&&  (<MobileNav/>)}
    </>
  )
}

export default HomeRouter
