import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './AllpageRouter.css'
import Slidebar from '../components/Slidebar/Slidebar'
import PageRouter from './PageRouter'
import Navbar from '../components/Navbar/Navbar'
import PollCreate from '../components/Poll/PollCreate'
import PollView from '../components/Poll/PollView'
import Feedback from '../pages/Feedback/Feedback'

import PollList from '../components/Poll/PollList'


const AllpageRouter = () => {






  return (
    <section id='Entire-section'>
      
      <Navbar />
      <div id='Entire-section-box'>
        <PageRouter />
      </div>

    </section>
  )
}

export default AllpageRouter
