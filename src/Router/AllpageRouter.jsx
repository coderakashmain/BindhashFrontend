import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './AllpageRouter.css'
import Slidebar from '../components/Slidebar/Slidebar'
import PageRouter from './PageRouter'


const AllpageRouter = () => {






  return (
    <section id='page-router'>
      <Outlet/>
      </section>
   
  )
}

export default AllpageRouter
