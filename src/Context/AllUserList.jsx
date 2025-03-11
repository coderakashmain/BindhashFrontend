import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { UserAuthCheckContext } from './UserAuthCheck';
import axios from 'axios';


export const AllUserListContext= createContext();

const AllUserList = ({children}) => {
    const [alluser,setAlluser] = useState([]);
    const {usertoken} = useContext(UserAuthCheckContext);

    useEffect(() => {
        if (!usertoken?.user?.id) return;  
    
        axios.get(`/api/users/userlist?userId=${usertoken.user.id}`)
          .then((res) => setAlluser(res.data))
          .catch((err) => console.error(err));
      }, [usertoken]);


  return (
   <AllUserListContext.Provider value={{alluser,setAlluser}}>
       {children}   
       </AllUserListContext.Provider>
  )
}

export default AllUserList
