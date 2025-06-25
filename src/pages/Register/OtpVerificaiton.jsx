import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Button } from "@mui/material";
import { SnackbarContext } from "../../Context/SnackbarContext";
import '../../App.css'
import './OtpVerification.css'

const OtpVerificaiton = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState("");
    const location = useLocation();
    const email = location.state?.email || "";
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setSnackbar } = useContext(SnackbarContext);
    const [timer, setTimer] = useState(60)
    const [isresend, setIsresend] = useState(false);
    const [emailpresent, setemailpresent] = useState(true);


    useEffect(() => {
        if (timer > 0) {

            const timeout = setTimeout(() => {
                setTimer(prev => prev - 1);

            }, (1000));

            return () => clearTimeout(timeout)

        } else {
            setIsresend(true);
        }

    }, [timer])


    useEffect(() => {
        if (email) {
            setemailpresent(false)
        }
        if (!email) {
            navigate('/register')
        }


    }, [email])

    if (emailpresent) return;





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
                navigate("/register/setpassword", { state: { email } }); // Redirect to set password page
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            if (err.response && err.response.status === 410) {
                setSnackbar({ open: true, message: "OTP expired! Request a new one.", type: "error" });
                setError("OTP expired! Request a new one.");
                // navigate('/register')
            }
            if (err.response && err.response.status === 401) {
                setSnackbar({ open: true, message: "Invalid OTP! Please enter correct OTP.", type: "error" });
                setError("Invalid OTP! Please enter correct OTP.");
                // navigate('/register')
            } else {
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
            <Helmet>
                <title>Verify OTP – Secure Your Access | Bindhash</title>
                <meta
                    name="description"
                    content="Enter the OTP sent to your email to verify your identity and complete your Bindhash login or registration. This helps keep your account secure."
                />
            </Helmet>
            <div className="register-container-box1-inside otp-page" >
                <h2 style={{marginBottom : '2rem'}}>Email Authentication</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleVerifyOtp} style={{ width: '100%' }}>

               
                    <TextField
                        label="OTP"
                        variant="outlined"
                        type="number"
                        fullWidth

                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        InputProps={{
                            inputProps: {
                                className: 'no-spinner',
                            },
                        }}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? <CircularProgress size='1.2rem' color='white' /> : "Verify OTP"}
                    </button>
                </form>
                <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
                    Didn't receive OTP?  {isresend ? (<span style={{ color: 'var(--blue-color)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate(-1)}>Resend OTP.</span>) : (<span style={{ color: 'var(--blue-color)' }} > Resend in {timer}</span>)}
                </p>

            </div>
        </div>
    )
}

export default OtpVerificaiton
