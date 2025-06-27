import React, { useContext, createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuthCheckContext } from './UserAuthCheck';

export const UserPostListDataContext = createContext();

const UserPostListContext = ({ children }) => {
  const [userpost, setUserpost] = useState([]);
  const { usertoken } = useContext(UserAuthCheckContext);
  const [fetchLoader, setFetchLoader] = useState(true);

  const fetchUserPosts = async () => {
    if (!usertoken?.user?.id) return;

    setFetchLoader(true);
    try {
      const response = await axios.get('/api/posts/fetchuserpost', {
        params: { userId: usertoken.user.id }
      });

      if (Array.isArray(response.data)) {
        setUserpost(response.data);
      }
    } catch (err) {
      console.error(err.response?.data?.error || "Error fetching user posts.");
    } finally {
      setFetchLoader(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [usertoken]);

  return (
    <UserPostListDataContext.Provider value={{ userpost, setUserpost, fetchLoader, fetchUserPosts }}>
      {children}
    </UserPostListDataContext.Provider>
  );
};

export default UserPostListContext;
