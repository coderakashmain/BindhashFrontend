import { createContext, useState, useEffect, useId, useContext } from "react";
import axios from "axios";

const PollContext = createContext();
import { UserAuthCheckContext } from "./UserAuthCheck";
import { useNavigate } from "react-router-dom";


export const usePolls = () => useContext(PollContext);

export const PollProvider = ({ children}) => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {usertoken} = useContext(UserAuthCheckContext)
    const navigate = useNavigate()
    

  
  
  
    const fetchPolls = async () => {
      if(!usertoken) return navigate('/login')
        setLoading(true);
        try {
            const response = await axios.get(`/api/polls/${usertoken.user.id}`);
         
            setPolls(response.data);
   
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };



  
    useEffect(() => {
        if (usertoken===null) {
         return navigate("/login")
        }
        if (usertoken.user.id) {
          fetchPolls();
        }
    }, [usertoken]);

  return (
    <PollContext.Provider value={{ polls,setPolls, fetchPolls, loading, error }}>
      {children}
    </PollContext.Provider>
  );
};
