import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './AllpageRouter.css'
import Slidebar from '../components/Slidebar/Slidebar'
import PageRouter from './PageRouter'
import Navbar from '../components/Navbar/Navbar'

const AllpageRouter = () => {

 

  return (
    <section  id='Entire-section'>
    <Navbar/>
      <div id='Entire-section-box'>
      <PageRouter/>
      {/* <Slidebar /> */}
      </div>
    </section>
  )
}

export default AllpageRouter
