import React, { Suspense, useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './AllpageRouter.css'
import Slidebar from '../components/Slidebar/Slidebar'
import PageRouter from './PageRouter'
import SkeletonComponent from '../components/Fallback/SkeletonComponent'
import SkeletonRooms from '../components/Fallback/SkeletonRooms'
import MainLoader from '../components/Fallback/MainLoader'
import CircularLoader from '../components/Fallback/CircularLoader'


const AllpageRouter = () => {






  return (
    <Suspense fallback={<CircularLoader />} >
      <section id='page-router'>
        <Outlet />
    {/* <MainLoader/> */}
      </section>
     </Suspense>

  )
}

export default AllpageRouter
