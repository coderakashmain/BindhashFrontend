import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const UserAuthCheckContext = createContext();
import axios from 'axios';



const UserAuthCheck = ({children}) => {

    const [usertoken,setUsertoken] = useState(null);
    const [loading, setLoading] = useState(true);
   const loginkchecktoken = sessionStorage.getItem('logintoken');

    const navigate = useNavigate();

    
    
    useEffect(() => {
    

    
        const checkAuth = async () => {
            try {
             const response =  await axios.get("/api/auth-check/check", { withCredentials: true });
             setUsertoken(response.data)
            } catch (error) {
              console.error("Auth check failed:", error);
              setUsertoken(null);
              // navigate("/login");
            }finally {
              setLoading(false); 
            }
          };
          checkAuth();

 
  
    
    }, []); 

    if (loading) {
      return <div>Loading...</div>; // Prevent flashing by showing loading state
    }

  return (
    <UserAuthCheckContext.Provider value={{usertoken,setUsertoken}}>
        {children}
      
    </UserAuthCheckContext.Provider>
  )
}

export default UserAuthCheck
