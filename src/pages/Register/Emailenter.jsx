import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Button } from "@mui/material";
import { SnackbarContext } from "../../Context/SnackbarContext";


const Emailenter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {setSnackbar} = useContext(SnackbarContext);

  const handleRegister = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register/otpsend", { email });
      navigate("varifyotp", { state: { email } });
      setSnackbar({ open: true, message: "OTP sent to your email", type: "success" });
      setLoading(false)
    } catch (error) {
      if (error.response && error.response.status === 429) {
        navigate("varifyotp", { state: { email } });
      }
      setLoading(false)
      setError("Registration failed. Try again.");
      setSnackbar({ open: true, message: "Registration failed. Try again.", type: "error" });
      alert(err)

    }
  };


  return (
    <div className="register-container-box1">
      <div className="register-container-box1-inside">
        <h2 style={{fontWeight :'bold',margin : '0 0 1rem 0'}}>Register</h2>
        {error && <p className="error">{error}</p>}
        <button type=""><b>Sign up with Google</b></button>
        <div className="or-line">
          <div></div>OR  <div></div>

        </div>
         <h3 style= {{fontSize : '1.4rem'}}>What's your email?</h3>
          <p style={{ margin : '1rem 0', fontSize : '0.9rem'}}>Enter the email on whice you can be connected.</p>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
         
        
        <TextField
               label="Email"
               variant="outlined"
               type="email" 
               fullWidth
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
             />
          <div className="terms-condition-box">
            <input style={{margin : '0 0.3rem 0 0'}} type="checkbox" name="terms and condition box" />
            I accept company's
            <NavLink href="terms-condition">Terms of use </NavLink> & <NavLink href="privacy-policy"> Privacy policy</NavLink>
          </div>
          <button type="submit" disabled={loading} > {loading ? <CircularProgress size='1.2rem' color='white' /> : 'Next'}</button>
        </form>
        <p style={{fontSize : '1rem'}}>
          Already have an account? <Link  style = {{fontSize : '1rem', color : 'var(--buttoncolor)'}} to="/login">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Emailenter
