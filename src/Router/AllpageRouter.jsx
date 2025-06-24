import React, { Suspense, useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './AllpageRouter.css'
import CircularLoader from '../components/Fallback/CircularLoader'
import RouteLoader from '../components/Fallback/RouteLoader'


const AllpageRouter = () => {






  return (
    <Suspense fallback={<CircularLoader />} >
      <RouteLoader/>
      <section id='page-router'>
        <Outlet />
      </section>
     </Suspense>

  )
}

export default AllpageRouter
