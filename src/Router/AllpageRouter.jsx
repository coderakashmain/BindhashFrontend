import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './AllpageRouter.css'
import Slidebar from '../components/Slidebar/Slidebar'
import PageRouter from './PageRouter'
import Navbar from '../components/Navbar/Navbar'
import PollCreate from '../components/Poll/PollCreate'
import PollView from '../components/Poll/PollView'
import Feedback from '../pages/Feedback/Feedback'


const AllpageRouter = () => {



  return (
    <section id='Entire-section'>
      {/* <PollCreate /> */}
      {/* <PollView /> */}
      {/*<Feedback/>*/}
      <Navbar />
      <div id='Entire-section-box'>
        <PageRouter />
        {/* <Slidebar /> */}
      </div>
    </section>
  )
}

export default AllpageRouter
