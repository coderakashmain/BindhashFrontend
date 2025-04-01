import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { MobileViewContext } from './MobileResizeProvider'
import MobileNav from '../components/Navbar/MobileNav'



const HomeRouter = () => {
  const {isMobile} = useContext(MobileViewContext)



  return (
    <>
       <Navbar />
      <Outlet/>
      {isMobile && (<MobileNav/>)}
    </>
  )
}

export default HomeRouter
