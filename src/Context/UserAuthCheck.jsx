import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
export const UserAuthCheckContext = createContext();
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SkeletonComponent from '../components/Fallback/SkeletonComponent';
import CircularLoader from '../components/Fallback/CircularLoader';
import { useSocket } from './SocketContext';
import MainLoader from '../components/Fallback/MainLoader';



const UserAuthCheck = ({ children }) => {

  const [usertoken, setUsertoken] = useState(null);
  const [loading, setLoading] = useState(true);
  const loginkchecktoken = sessionStorage.getItem('logintoken');
  const location = useLocation();
  const socket = useSocket();

  const navigate = useNavigate();


  useEffect(() => {
    if (!usertoken || !socket) return;
    const userId = usertoken.user.id;
    const handleConnect = () => {

      socket.emit("addUser", userId);
    };

    socket.on("connect", handleConnect);


    if (socket.connected) {
      handleConnect();
    }


    return () => {
      socket.off("connect", handleConnect);
    };
  }, [socket, usertoken]);


  useEffect(() => {
    if (!socket || !usertoken) return;

    const handlemodeChange = (data) => {
      const { visibility, id } = data.results[0];



      if (parseInt(id) !== usertoken?.user.id) return;
      if (visibility === 'anonymous') {

        setUsertoken(prev => ({
          ...prev,
          user: {
            ...prev.user,
            visibility: 'anonymous'
          }
        }));
      } else {
        setUsertoken(prev => ({
          ...prev,
          user: {
            ...prev.user,
            visibility: 'self'
          }
        }

        ));
      }
    }


    socket.on('modeChanged', handlemodeChange);

    return () => {
      socket.off('modeChanged', handlemodeChange);
    }

  }, [socket]);





  useEffect(() => {



    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth-check/check", { withCredentials: true });

        setUsertoken(response.data)
      } catch (error) {
        console.error("Auth check failed:", error.response ? error.response.data : error.message);
        setUsertoken(null);


      } finally {
        setLoading(false);
      }
    };
    checkAuth();




  }, [loginkchecktoken]);

  useEffect(() => {

    if (!loading && !usertoken && !location.pathname.startsWith('/register') && location.pathname !== '/') {
      navigate('/login');
    }
  }, [usertoken, loading, navigate]);




  if (loading) {
    return (
      <MainLoader />

    );
  }








  return (
    <UserAuthCheckContext.Provider value={{ usertoken, setUsertoken }}>
      {children}

    </UserAuthCheckContext.Provider>
  )
}

export default UserAuthCheck
