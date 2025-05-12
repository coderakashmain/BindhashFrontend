import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './AllpageRouter.css'
import Slidebar from '../components/Slidebar/Slidebar'
import PageRouter from './PageRouter'
import SkeletonComponent from '../components/Fallback/SkeletonComponent'
import SkeletonRooms from '../components/Fallback/SkeletonRooms'


const AllpageRouter = () => {






  return (
    <section id='page-router'>
      {/* <SkeletonComponent/> */}
      <Outlet/>
      </section>
   
  )
}

export default AllpageRouter
