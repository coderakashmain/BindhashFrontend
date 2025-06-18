import React, { Suspense } from 'react'
import UserList from './UserList'
import './FullchatPage.css'
import { Outlet } from 'react-router-dom'
import ChatSkeleton from '../../components/Fallback/ChatSkeleton'
import { Helmet } from 'react-helmet'

const FullchatPage = () => {
  return (
    <section className='full-chat-page'>
      <Helmet>
              <title>Chat – Connect Anonymously | Bindhash</title>
              <meta
                name="description"
                content="Start or continue private and anonymous chats on Bindhash. Share your thoughts freely and connect emotionally with people who truly understand."
              />
            </Helmet>
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
