import React, { Suspense, useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './PageRouter.css'
import MobileNav from '../components/Navbar/MobileNav'
import { MobileViewContext } from '../Context/MobileResizeProvider'
import { useSocket } from '../Context/SocketContext'
import { UserAuthCheckContext } from '../Context/UserAuthCheck'
import Slidebar from '../components/Slidebar/Slidebar'
import SkeletonComponent from '../components/Fallback/SkeletonComponent'


const PageRouter = () => {


  const {isMobile} = useContext(MobileViewContext)
  const { usertoken } = useContext(UserAuthCheckContext);
  const socket = useSocket();




  
  
  return (
    <section id='page-layout' >

      {/* <Suspense fallback={<SkeletonComponent/>}> */}
      <Slidebar/>
      <Outlet/>
     {/* </Suspense> */}

  

    </section>
  )
}

export default PageRouter
