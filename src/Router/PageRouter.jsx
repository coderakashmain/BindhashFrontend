import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import './PageRouter.css'
import MobileNav from '../components/Navbar/MobileNav'
import { MobileViewContext } from '../Context/MobileResizeProvider'


const PageRouter = () => {


  const {isMobile} = useContext(MobileViewContext)
  
  
  return (
    <>

      <Outlet/>

  

    </>
  )
}

export default PageRouter
