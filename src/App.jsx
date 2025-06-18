import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";



import { PollProvider } from './Context/PollProvider';
import { SocketProvider } from './Context/SocketContext';
import AllpageRouter from './Router/AllpageRouter';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MobileResizeProvider from './Context/MobileResizeProvider'
import PageRouter from './Router/PageRouter';
import AllPostContext from './Context/AllPostContext';
import UserAuthCheck from './Context/UserAuthCheck';
import AllUserList from './Context/AllUserList';
import ProfileRouter from './Router/ProfileRouter';
import SnackbarProvider from './Context/SnackbarContext';
import { UploadProvider } from './Context/UploadProvider';
import CircularLoader from './components/Fallback/CircularLoader';
import RandomsubroomChat from './pages/Room/RandomsubroomChat';
import RoomChatbox from './pages/Room/RoomChatbox';
import SubRoomDefaultChatpage from './pages/Room/SubRoomDefaultChatpage';
import CreateChatRoom from './pages/Room/CreateChatRoom';
import LandingPage from './pages/LandingPage/LandingPage';
import Feedback from './pages/Feedback/Feedback';
import ForgatePassword from './pages/Register/ForgatePassword';



const RoomChat = lazy(() => import('./pages/Room/RoomChat'));
const HomeRouter = lazy(() => import('./Context/HomeRouter'));
const Home = lazy(() => import('./pages/Home/Home'));
const Register = lazy(() => import('./pages/Register/Register'));
const Notfound = lazy(() => import('./pages/Notfound'));
const Login = lazy(() => import('./pages/Login/Login'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Chat = lazy(() => import('./pages/Chat/Chat'));
const FullchatPage = lazy(() => import('./pages/Chat/FullchatPage'));
const DefaultChatPage = lazy(() => import('./pages/Chat/DefaultChatPage'));
const StoryView = lazy(() => import('./components/Story/StoryView'));
const UserSearch = lazy(() => import('./components/UserSearch/UserSearch'));
const TrendingPosts = lazy(() => import('./components/TrendingPosts/TrendingPosts'));
const Leaderboard = lazy(() => import('./components/Leaderboard/Leaderboard'));
const ProfileEdit = lazy(() => import('./components/ProfileEdit/ProfileEdit'));
const Emailenter = lazy(() => import('./pages/Register/Emailenter'));
const OtpVerificaiton = lazy(() => import('./pages/Register/OtpVerificaiton'));
const SetPassword = lazy(() => import('./pages/Register/SetPassword'));
const SetUsername = lazy(() => import('./pages/Register/SetUsername'));
const SetGender = lazy(() => import('./pages/Register/SetGender'));
const Snackbar = lazy(() => import('./components/Snackbar/Snackbar'));
const SettingsPage = lazy(() => import('./pages/SettingsPage/SettingsPage'));
const FollowersFollowing = lazy(() => import('./Context/FollowersFollowing'));
const CreatePost = lazy(() => import('./pages/CreatPost/Createpost'));
const Room = lazy(() => import('./pages/Room/Room'));
const RoomPlay = lazy(() => import('./pages/Room/RoomPlay'));




const App = () => {
  const VITE_VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;





  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/sw.js").then(registration => {
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: VITE_VAPID_PUBLIC_KEY
        });
      }).then(subscription => {
        fetch("http://localhost:3000/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: "123", subscription })
        });
      });
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: '*',
      element: <><ErrorBoundary><Notfound /></ErrorBoundary></>
    },
    {
      path: '/',
      element: <><ErrorBoundary><SocketProvider><UserAuthCheck><PollProvider><AllPostContext><MobileResizeProvider><FollowersFollowing><SnackbarProvider><AllUserList><><Snackbar /><UploadProvider><AllpageRouter /></UploadProvider></></AllUserList></SnackbarProvider></FollowersFollowing></MobileResizeProvider></AllPostContext></PollProvider></UserAuthCheck></SocketProvider></ErrorBoundary></>,
      children: [
        {
          path: '',
          index: true,
          element: <><ErrorBoundary><LandingPage /></ErrorBoundary></>
        },

        {
          path: '',
          element: <><ErrorBoundary><PageRouter /></ErrorBoundary></>,
          children: [
            {
              path: '',
              element: <><ErrorBoundary><HomeRouter /></ErrorBoundary></>,
              children: [

                {
                  path: '/feed',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><Home /></Suspense></ErrorBoundary></>
                },
                // {
                //   path: '/:postid/:pusername',
                //   element: <><ErrorBoundary><Suspense fallback = {<CircularLoader/>}><Home /></Suspense></ErrorBoundary></>
                // },
                {
                  path: '/story-view/:id',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><StoryView /></Suspense></ErrorBoundary></>
                },

                {
                  path: 'profile/o/:username',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><ProfileRouter /></Suspense></ErrorBoundary></>,
                  children: [
                    {
                      path: '',
                      element: <><ErrorBoundary><Profile /></ErrorBoundary></>,
                    }
                  ]
                },
                {
                  path: 'trending-post',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><TrendingPosts /></Suspense></ErrorBoundary></>
                },
                {
                  path: 'search',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><UserSearch /></Suspense></ErrorBoundary></>
                },
                {
                  path: 'feedback',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><Feedback /></Suspense></ErrorBoundary></>
                },
                {
                  path: 'room',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><Room /></Suspense></ErrorBoundary></>

                },
                {
                  path: 'room/:category/:slug/creatroom',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><CreateChatRoom /></Suspense></ErrorBoundary></>

                },
                {
                  path: 'room/:roomname',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><RoomPlay /></Suspense></ErrorBoundary></>

                },
                {
                  path: 'room/:category/:slug',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><RoomChat /></Suspense></ErrorBoundary></>,
                  children: [
                    {
                      path: '',
                      element: <><ErrorBoundary><SubRoomDefaultChatpage /></ErrorBoundary></>
                    },
                    {
                      path: 'randomchat/:subroomId',
                      element: <><ErrorBoundary><RandomsubroomChat /></ErrorBoundary></>
                    },
                    {
                      path: ':chatroomname',
                      element: <><ErrorBoundary><RoomChatbox /></ErrorBoundary></>
                    }
                  ]


                },
                // {
                //   path: 'room/:category/:slug/:roomname',
                //   element: <><ErrorBoundary><Suspense fallback = {<CircularLoader/>}><RoomChat /></Suspense></ErrorBoundary></>,


                // },
                {
                  path: 'setting',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><SettingsPage /></Suspense></ErrorBoundary></>
                },
                {
                  path: 'createpost',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><CreatePost /></Suspense></ErrorBoundary></>
                },
                {
                  path: 'leaderboard',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><Leaderboard /></Suspense></ErrorBoundary></>
                },
                ,
                {

                  path: 'chat',
                  element: <><ErrorBoundary><Suspense fallback={<CircularLoader />}><FullchatPage /></Suspense></ErrorBoundary></>,
                  children: [
                    {
                      path: "",
                      element: <><ErrorBoundary><DefaultChatPage /></ErrorBoundary></>
                    },
                    {
                      path: ":receiverId/:username",
                      element: <><ErrorBoundary><Chat /></ErrorBoundary></>
                    },

                  ]
                },
                {
                  path: "/chat/mobilechat/:receiverId/:username",
                  element: <><ErrorBoundary><Chat /></ErrorBoundary></>
                }


              ]
            }
          ]

        },
        {
          path: 'login',
          element: <><ErrorBoundary><Login /></ErrorBoundary></>
        },

        {
          path: 'register',
          element: <><ErrorBoundary><Register /></ErrorBoundary></>,
          children: [
            {
              path: '',
              element: <><ErrorBoundary><Emailenter /></ErrorBoundary></>
            },
            {
              path: 'varifyotp',
              element: <><ErrorBoundary><OtpVerificaiton /></ErrorBoundary></>
            },
            {
              path: 'setpassword',
              element: <><ErrorBoundary><SetPassword /></ErrorBoundary></>
            },
            {
              path: 'setusername',
              element: <><ErrorBoundary><SetUsername /></ErrorBoundary></>
            },
            {
              path: 'setgender',
              element: <><ErrorBoundary><SetGender /></ErrorBoundary></>
            },
            {
              path: 'forgotepassword',
              element: <><ErrorBoundary><ForgatePassword /></ErrorBoundary></>
            },
          ]
        },






      ]
    },

  ])
  return (
    <>

      <RouterProvider router={router} />

    </>
  )
}

export default App
