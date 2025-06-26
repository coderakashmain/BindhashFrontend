import { createContext, useState, useEffect, useId, useContext } from "react";
import axios from "axios";
import { UserAuthCheckContext } from "./UserAuthCheck";

const PollContext = createContext();
import { useNavigate } from "react-router-dom";



export const usePolls = () => useContext(PollContext);

export const PollProvider = ({ children}) => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const {usertoken} = useContext(UserAuthCheckContext)
    

  
  
  useEffect(()=>{
    const fetchPolls = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/polls/${usertoken?.user.id}`);
         
            setPolls(response.data);
   
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };
    fetchPolls();
  },[])



// console.log(polls)

  return (
    <PollContext.Provider value={{ polls,setPolls, loading, error }}>
      {children}
    </PollContext.Provider>
  );
};
