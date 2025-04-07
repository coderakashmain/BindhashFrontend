import React, { createContext, useContext, useEffect, useState } from 'react'

export const FollowersFollowingContext = createContext();
import { UserAuthCheckContext } from './UserAuthCheck';
import axios from 'axios';


const FollowersFollowing = ({children}) => {
      const [followersList, setFollowersList] = useState([]);
      const [followingList, setFollowingList] = useState([]);
      const {usertoken} = useContext(UserAuthCheckContext);

    //   const [followersfetch,setFollowersfetch] = useState(false);
    //   const [followingfetch,setFollowingfetch] = useState(false);




        const fetchFollowers = async () => {

            try {
              const { data } = await axios.get(`/api/users/followers-list?userId=${usertoken.user.id}&type=followers`);
              setFollowersList(data);
            } catch (error) {
              console.error("Error fetching followers:", error);
            }
      
         
        };
      
        const fetchFollowing = async () => {
         
            try {
              const { data } = await axios.get(`/api/users/followers-list?userId=${usertoken.user.id}&type=following`);
              setFollowingList(data);
            } catch (error) {
              console.error("Error fetching following:", error);
            }
  
         
        };


     
        

  return (
    <FollowersFollowingContext.Provider value={{followersList,followingList,fetchFollowers,fetchFollowing}}>   
      {children}
    </FollowersFollowingContext.Provider>
  )
}

export default FollowersFollowing
