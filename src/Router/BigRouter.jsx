import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

const BigRouter = () => {
  return (
    <>

      <Outlet/>
    </>
  )
}

export default BigRouter
