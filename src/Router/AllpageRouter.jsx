import React, { Suspense, useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './AllpageRouter.css'
import CircularLoader from '../components/Fallback/CircularLoader'
import RouteLoader from '../components/Fallback/RouteLoader'
import MainLoader from '../components/Fallback/MainLoader'
import { useState } from 'react'



const AllpageRouter = () => {
  const [hideLoader, setHideLoader] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
    setHideLoader(true);
  }, 3000);



    return () => clearTimeout(timeoutId)
  }, [])





  return (

    <>
    {!hideLoader && (  <MainLoader />)}
      <RouteLoader />

      <section id='page-router'>
        <Outlet />
      </section>
    </>


  )
}

export default AllpageRouter
