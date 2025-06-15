import React, { Suspense, useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { MobileViewContext } from './MobileResizeProvider'
import MobileNav from '../components/Navbar/MobileNav'
import SkeletonComponent from '../components/Fallback/SkeletonComponent'
import SkeletonRooms from '../components/Fallback/SkeletonRooms'



const HomeRouter = () => {
  const { isMobile } = useContext(MobileViewContext)
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
    <section style={{ height: '100vh', width: '80%', flexGrow: 1,display : 'flex',flexDirection : 'column' }}>

      <Navbar />
      <section style={{height : '80%', flex: 1 }}>
        <Outlet />
      </section>

      {/* {isMobile && navvisibelity&&  (<MobileNav/>)} */}
    </section>

  )
}

export default HomeRouter
