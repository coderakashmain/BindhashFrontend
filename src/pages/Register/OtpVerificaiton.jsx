import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useEditor } from '@tiptap/react';
import { TextField, Button } from "@mui/material";
import './Otpverification.css'
import { SnackbarContext } from "../../Context/SnackbarContext";


const OtpVerificaiton = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState("");
    const location = useLocation();
    const email = location.state?.email || "";
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setSnackbar} = useContext(SnackbarContext);

    useEffect(()=>{
        if(!email){
            navigate('/register')
        }
        console.log(email)
    },[email])
    


    const handleVerifyOtp = async (e) => {
    
        e.preventDefault(); 
        setLoading(true);
        setError(""); 
        if (!otp || otp.length !== 6) {
          setError("Please enter a valid 6-digit OTP.");
          setLoading(false);
          return;
        }
    
        try {
          const response = await axios.post("/api/auth/verifyotp", { email, otp });
    
          if (response.data.success) {
            setSnackbar({ open: true, message: "OTP verified successfully", type: "success" });
            navigate("/register/setpassword",{state:{email}}); // Redirect to set password page
          } else {
            setError("Invalid OTP. Please try again.");
          }
        } catch (err) {
            if(err.response && err.response.status === 410){
                setSnackbar({ open: true, message: "OTP expired! Request a new one.", type: "error" });
                setError("OTP expired! Request a new one.");
                // navigate('/register')
            }
            if(err.response && err.response.status === 401){
                setSnackbar({ open: true, message: "Invalid OTP! Please enter correct OTP.", type: "error" });
                setError("Invalid OTP! Please enter correct OTP.");
                // navigate('/register')
            }else{
                console.log(err)
                setError("OTP verification failed. Try again.");
                setSnackbar({ open: true, message: "OTP verification failed. Try again.", type: "error" });

            }
        } finally {
          setLoading(false);
        }
      };
    
    return (
        <div className="register-container-box1">
            <div className="register-container-box1-inside">
                <h2>Email Authentication</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleVerifyOtp} style={{ width: '100%' }}>

                    {/* <input type="number" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required /> */}
                       <TextField
                                   label="OTP"
                                   variant="outlined"
                                   type="number" 
                                   fullWidth
                                   required
                                   value={otp}
                                   onChange={(e) => setOtp(e.target.value)}
                                 />

                    <button type="submit" disabled={loading}>
                        {loading ?<CircularProgress size='1.2rem' color='white'/> : "Verify OTP"}
                    </button>
                </form>
                <p>
                    Didn't receive OTP? <span onClick={() => alert("Resend OTP logic here!")}>Resend OTP.</span>
                </p>

            </div>
        </div>
    )
}

export default OtpVerificaiton
