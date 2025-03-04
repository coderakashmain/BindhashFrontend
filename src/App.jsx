import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllpageRouter from './Router/AllpageRouter';
import PageRouter from './Router/PageRouter';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Notfound from './pages/Notfound';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import AllPostContext from './Context/AllPostContext';
import UserAuthCheck from './Context/UserAuthCheck';
import Chat from './pages/Chat/Chat';
import FullchatPage from './pages/Chat/FullchatPage';
import DefaultChatPage from './pages/Chat/DefaultChatPage';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '*',
      element: <><ErrorBoundary><Notfound /></ErrorBoundary></>
    },
    {
      path: '/',
      element: <><ErrorBoundary><UserAuthCheck><AllPostContext><AllpageRouter /></AllPostContext></UserAuthCheck></ErrorBoundary></>,
      children: [
        {
          path: '',
          element: <><ErrorBoundary><PageRouter /></ErrorBoundary></>,
          children: [
            {
              path: '',
              element: <><ErrorBoundary><Home /></ErrorBoundary></>
            }, {
              path: 'profile',
              element: <><ErrorBoundary><Profile /></ErrorBoundary></>
            }
            ,
            {

              path :'chat',
              element : <><ErrorBoundary><FullchatPage/></ErrorBoundary></>,
              children : [
                {
                  path: "",
                  element: <><ErrorBoundary><DefaultChatPage/></ErrorBoundary></>
                },
                {
                  path: ":receiverId",
                  element: <><ErrorBoundary><Chat/></ErrorBoundary></>
                }
              ]
            },
            

          ]
        },
        {
          path: 'login',
          element: <><ErrorBoundary><Login /></ErrorBoundary></>
        },
        {
          path: 'register',
          element: <><ErrorBoundary><Register /></ErrorBoundary></>
        }
      ]
    }
  ])
  return (
    <>

      <RouterProvider router={router} />

    </>
  )
}

export default App
