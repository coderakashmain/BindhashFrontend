import React, { Suspense } from 'react'
import UserList from './UserList'
import './FullchatPage.css'
import { Outlet } from 'react-router-dom'
import ChatSkeleton from '../../components/Fallback/ChatSkeleton'

const FullchatPage = () => {
  return (
    <section className='full-chat-page'>
      <UserList />
      <div className="chat-data">
       <Suspense fallback={<ChatSkeleton/>}>
        <Outlet />
       
        </Suspense>
      </div>

    </section>
  )
}

export default FullchatPage
