import React from 'react'
import { Outlet } from 'react-router-dom'
import './PageRouter.css'

const PageRouter = () => {
  return (
    <section id='page-router'>
      <Outlet/>
    </section>
  )
}

export default PageRouter
