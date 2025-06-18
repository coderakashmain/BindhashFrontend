import React, { Suspense, useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { MobileViewContext } from './MobileResizeProvider'
import MobileNav from '../components/Navbar/MobileNav'
import SkeletonComponent from '../components/Fallback/SkeletonComponent'
import SkeletonRooms from '../components/Fallback/SkeletonRooms'
import FloatingBackbtn from '../components/FloatingComponents/FloatingBackbtn'
import './HomeRouter.css'



const HomeRouter = () => {
  const { isMobile } = useContext(MobileViewContext)
  const location = useLocation();
  const [navvisibelity, setNavVisibility] = React.useState(true);
  const [backvisibility,setBackvisibility] = React.useState(true);

  useEffect(() => {
    if (location.pathname.startsWith('/profile') 
      || location.pathname==='/' 
      || location.pathname==='/chat' 
      || location.pathname==='/trending-post' 
      || location.pathname==='/setting' 
    || location.pathname.startsWith('/search')
  
  
  ) {
    setBackvisibility(false)
      setNavVisibility(true);
    } else {
      setBackvisibility(true)
      setNavVisibility(false);
    }
  }, [location.pathname]);


  // useEffect(()=>{
  //     if (location.pathname.startsWith('/profile') 
  //     || location.pathname==='/' 
  //     || location.pathname==='/chat' 
  //     || location.pathname==='/trending-post' 
  //     || location.pathname==='/setting' 
  //   || location.pathname.startsWith('/search')
    
  
  
  // ) {
  //     setNavVisibility(true);
  //   } else {
  //     setNavVisibility(false);
  //   }

  // },[location.pathname])


  return (
    <section style={{ height: '100vh', width: '80%', flexGrow: 1,display : 'flex',flexDirection : 'column' ,zIndex : 1 }}>

      <Navbar />
      <section className='homerouter' style={{height : '80%', flex: 1, position : "relative" ,zIndex : 1 }}>
        <Outlet />
      </section>

    {isMobile && backvisibility && ( <FloatingBackbtn/>)}

      {isMobile && navvisibelity&&  (<MobileNav/>)}
    </section>

  )
}

export default HomeRouter
