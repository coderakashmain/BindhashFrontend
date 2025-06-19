import React, { useContext, useEffect, useState } from "react";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css'

import Bangbox from "../../components/Bangbox/Bangbox";
import { TextField, Button, Typography, Alert, Divider, Chip, IconButton } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarContext } from "../../Context/SnackbarContext";
import '../../App.css'
import { motion, AnimatePresence } from 'framer-motion'
import { FacebookOutlined, Google, Twitter } from "@mui/icons-material";
import { Helmet } from "react-helmet";


const Login = () => {
  const [webLoading, setWebLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUsertoken, usertoken } = useContext(UserAuthCheckContext);
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const location = useLocation();
  const email = location.state?.email || "";


  useEffect(() => {
    if (usertoken) {
      navigate('/')
    } else {

      setWebLoading(false);
    }


  }, []);



  useEffect(() => {
    if (email) {
      setUsername(email)
    }
  }, [email])

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { username, password }, { withCredentials: true });
      sessionStorage.setItem('logintoken', true);
      setUsertoken(response.data);
      navigate("/feed");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
        setSnackbar({ open: true, message: err.response.data.error, type: "error" });

      } else {
        setError("Something went wrong. Please try again."); // fallback error
      }


    } finally {
      setLoading(false)
    }

  };


  if (webLoading) {
    return
  }


  return (
    <>
        
      <div className="login-container">
        <Helmet>
          <title>Login – Welcome Back | Bindhash</title>
          <meta
            name="description"
            content="Log in to your Bindhash account to connect, share anonymously or as yourself, and join emotional conversations that matter."
          />
        </Helmet>
        <div className="login-container-box1">
          <div className="login-container-box1-inside">
            <Bangbox size="2rem" click={false} />
            <Typography variant="body2" className="login-too-note">
              Continue With
            </Typography>
            {/* <Divider className="login-divider">
              <Chip label="Continue with" size="small" />
            </Divider> */}
            <div className="login-social-buttons">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton className="login-social-btn login-google">
                  <Google />
                </IconButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton className="login-social-btn login-facebook">
                  <FacebookOutlined />
                </IconButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton className="login-social-btn login-twitter">
                  <Twitter />
                </IconButton>
              </motion.div>
            </div>

            <Divider className="login-divider">
              <Chip label="or use email / username" size="small" />
            </Divider>



            {error && <p style={{ color: 'red', margin: '1rem 0 0.3rem 0' }} className="error">{error}</p>}
            <form onSubmit={handleLogin}>

              <TextField
                label="Username or Email"
                variant="outlined"
                type="text"
                fullWidth
                required
                value={username}

                sx={{
                  marginTop: '1.4rem'
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
                  marginTop: '1.4rem'
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <NavLink to="/register/forgotepassword">Forget password?</NavLink>
              <button className="login-signup-button" disabled={loading} type="submit">{loading ? <CircularProgress size='1.2rem' color='white' /> : 'Sign In'}</button>
            </form>
            <p style={{ marginTop: '0.9rem' }}>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
          <motion.div className="login-privacy" >
            <Alert severity="info" className="login-privacy-alert">
              <Typography variant="body2">
                <strong>Your Privacy Matters:</strong> We use minimal data collection and offer complete anonymity. Your
                personal information is never shared or sold.
              </Typography>
            </Alert>
          </motion.div>
        </div>
        <div className="login-container-box2">
          {/* <img src={loginlogo} alt="loginlogo" /> */}
          {/* <Bangbox size="6vw" click={false}/> */}
          <h2 >Welcome Back</h2>
          <p>Share your journey, find your strength</p>
        </div>
      </div>
    </>
  );
};

export default Login;


