import React, { useContext, useEffect, useState } from "react";
import { Link,NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import './Login.css'
import loginlogo from '../../Photo/blob.svg'
import Bangbox from "../../components/Bangbox/Bangbox";
import { TextField, Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarContext } from "../../Context/SnackbarContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUsertoken } = useContext(UserAuthCheckContext);
  const [loading, setLoading] = useState(false);
  const {setSnackbar} = useContext(SnackbarContext);
      const location = useLocation();
      const email = location.state?.email || "";

      
  useEffect(()=>{
    if(email){
      setUsername(email)
    }
  },[email])

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { username, password }, { withCredentials: true });
      sessionStorage.setItem('logintoken', true);
      setUsertoken(response.data);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);  
        setSnackbar({ open: true, message: err.response.data.error, type: "error" });

      } else {
        setError("Something went wrong. Please try again."); // fallback error
      }
    
      
    }finally{
      setLoading(false)
    }
    
  };
 

  return (
    <div className="login-container">
      <div className="login-container-box1">
        <div className="login-container-box1-inside">
          <h2 >Login</h2>
          {error && <p style={{color : 'red' , margin : '1rem 0 0.3rem 0'}} className="error">{error}</p>}
          <form onSubmit={handleLogin}>

            <TextField
                           label="Username or Email"
                           variant="outlined"
                           type="text" 
                           fullWidth
                           required
                           value={ username}
                          
                           sx={{
                            marginTop : '1.4rem'
                           }}
                           onChange={(e) => setUsername(e.target.value)}
                         />
            <TextField
                           label="Password"
                           variant="outlined"
                           type="password" 
                           fullWidth
                           required
                           sx={{
                            marginTop : '1.4rem'
                           }}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                         />
            {/* <input type="text" placeholder="Username or Email" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /> */}
            <button  disabled= {loading} type="submit">{loading ? <CircularProgress size='1.2rem' color='white' /> : 'Login'}</button>
            <NavLink to="">Forget password?</NavLink>
          </form>
          <p style={{marginTop : '0.9rem'}}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
      <div className="login-container-box2">
        {/* <img src={loginlogo} alt="loginlogo" /> */}
        <Bangbox size="10vw" click={false}/>
      </div>
    </div>
  );
};

export default Login;


