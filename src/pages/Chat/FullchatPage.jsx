import React from 'react'
import UserList from './UserList'
import './FullchatPage.css'
import { Outlet } from 'react-router-dom'

const FullchatPage = () => {
  return (
    <section className='full-chat-page'>
        <UserList/>
        <div className="chat-data">
        <Outlet/>
        </div>
      
    </section>
  )
}

export default FullchatPage
