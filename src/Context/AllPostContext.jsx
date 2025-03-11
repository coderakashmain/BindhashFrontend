import React, { createContext, useState,useEffect, useContext } from 'react'
import axios from 'axios';
import { UserAuthCheckContext } from './UserAuthCheck';

export const AllPostContextData = createContext();

const AllPostContext = ({children}) => {
    const [allpost,setAllpost] = useState([]);
    const {usertoken} = useContext(UserAuthCheckContext);
    const [isLiked, setIsLiked] = useState({});

  

    useEffect(() => {

        if(!usertoken){
            return 
        }

        const fetchPosts = async () => {
          try {
            const response = await axios.get(`/api/posts?userId=${usertoken.user.id}`);
      
            if (response.data && Array.isArray(response.data)) {
              setAllpost(response.data);


              const likesState = {};
              response.data.forEach((post) => {
                likesState[post.post_id] = post.is_liked || false;
              });
              setIsLiked(likesState); 
            
              
            }
          
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        };
      
        fetchPosts();
      }, [usertoken]);
 





  return (
    <AllPostContextData.Provider value={{allpost,setAllpost,isLiked,setIsLiked }} >
      {children}
    </AllPostContextData.Provider>
  )
}

export default AllPostContext
