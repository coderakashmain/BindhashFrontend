import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Button, Alert, Typography } from "@mui/material";
import { SnackbarContext } from "../../Context/SnackbarContext";
import '../Login/Login.css'
import { motion } from 'framer-motion'
import { Helmet } from "react-helmet";




const Emailenter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [isChecked, setIsChecked] = useState(true)

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email) return;
    if (!isChecked) {
      setError("Please accept the Terms & Conditions to continue.");
    }

    sessionStorage.setItem('emailId', email)
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register/otpsend", { email, isChecked });
      navigate("varifyotp", { state: { email } });
      setSnackbar({ open: true, message: "OTP sent to your email", type: "success" });
      setLoading(false)
    } catch (error) {
      if (error.response && error.response.status === 429) {
        navigate("varifyotp", { state: { email } });
      }
      if (error.response && error.response.status === 409) {
             setSnackbar({ open: true, message: error.response.data.error, type: "error" });
             setError("Email already registered!");
             setLoading(false)
             return;
      }
  
      setLoading(false)
      setError("Registration failed. Try again.");
      setSnackbar({ open: true, message: error.response.data.error, type: "error" });
   

    }
  };
  

  useEffect(() => {
    const email = sessionStorage.getItem('emailId');
    if (email) {
      setEmail(email);

    }
  }, [])


  return (
    <div className="register-container-box1">
      <Helmet>
        <title>Register – Join Bindhash Today</title>
        <meta
          name="description"
          content="Create your Bindhash account to share your story, chat anonymously, and connect emotionally with like-minded individuals. Your journey starts here."
        />
      </Helmet>
      <div className="register-container-box1-inside login-container-box1-inside">
        <h2 style={{ fontWeight: 'bold', margin: '0 0 0.2rem 0', padding: '0rem' }}>Register</h2>
        {/* {error && <p style={{mart : '0.3rem'}} className="error">{error}</p>} */}
        <button type=""><b>Sign up with Google</b></button>
        <div className="or-line">
          <div></div>OR  <div></div>

        </div>
        <p style={{ margin: '1rem 0', fontSize: '0.9rem', textAlign :'start' }}>Enter the email on whice you can be connected.</p>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>


          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            // name='Email Enter Box'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="terms-condition-box" style={{color : "var(--lighttextcolor)" }}>
            <input style={{ margin: '0 0.3rem 0 0'}} type="checkbox" name="terms and condition box" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
            I accept company's
            <NavLink href="terms-condition">Terms of use </NavLink> & <NavLink href="privacy-policy"> Privacy policy</NavLink>
          </div>
          <button type="submit" disabled={loading} > {loading ? <CircularProgress size='1.2rem' color='white' /> : 'Next'}</button>
        </form>
        <p style={{ fontSize: '1rem' , marginTop : '1rem',color  : "var(--lighttextcolor)"}}>
          Already have an account? <Link style={{ fontSize: '1rem', color: 'var(--blue-color)' }} to="/login">Login</Link>
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
  )
}

export default Emailenter
