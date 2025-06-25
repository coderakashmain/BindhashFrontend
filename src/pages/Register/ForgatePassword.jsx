import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/VpnKey';
import './Register.css';
import '../Login/Login.css';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [retryAfter, setRetryAfter] = useState(0);


    useEffect(() => {
        if (retryAfter > 0) {
            const timer = setInterval(() => {
                setRetryAfter((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [retryAfter]);

 
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');

        try {
            const res = await axios.post('/api/auth/forgot-password/sendotp', { email });
            setMsg(res.data.message);
            setStep(2);
            if (res.data.retryAfter) {
                setRetryAfter(res.data.retryAfter);
            }
        } catch (err) {
            setMsg(err.response?.data?.error || 'Something went wrong.');
            setRetryAfter(err.response?.data?.retryAfter || 0);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');

        try {
            const res = await axios.post('/api/auth/forgot-password/verify', { email, otp });
            setMsg(res.data.message);
            setStep(3);
        } catch (err) {
            setMsg(err.response?.data?.error || 'Verification failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');


           const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

 
    if (!passwordRegex.test(newPassword)) {
      setMsg(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      setLoading(false)
      return;
    }

        try {
            const res = await axios.post('/api/auth/forgot-password/reset', { email, newPassword });
            setMsg(res.data.message);
            setStep(1);
            setEmail('');
            setOtp('');
            setNewPassword('');
        } catch (err) {
            setMsg(err.response?.data?.error || 'Reset failed.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="register-container-box1">
            <Helmet>
                <title>Reset Password | Bindhash</title>
                <meta name="description" content="Securely reset your Bindhash password with OTP verification." />
            </Helmet>

            <div className="register-container-box1-inside login-container-box1-inside">
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    {step === 1 && <EmailIcon style={{ fontSize: 50, color: '#2890E1' }} />}
                    {step === 2 && <KeyIcon style={{ fontSize: 50, color: '#2890E1' }} />}
                    {step === 3 && <LockIcon style={{ fontSize: 50, color: '#2890E1' }} />}
                    <h2>
                        {step === 1 && "Enter Registered Gmail"}
                        {step === 2 && "Enter OTP Sent to Your Email"}
                        {step === 3 && "Set Your New Password"}
                    </h2>
                    <p style={{ color: '#555' , textAlign :'start'}}>
                        {step === 1 && "We'll send you an OTP to reset your password."}
                        {step === 2 && "Verify the OTP to proceed."}
                        {step === 3 && "Secure your account with a new password."}
                    </p>
                </div>

                <form onSubmit={
                    step === 1 ? handleSendOtp :
                        step === 2 ? handleVerifyOtp :
                            handleResetPassword
                }>
                    {step === 1 && (
                        <TextField
                            label="Registered Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                    )}

                    {step === 2 && (
                        <TextField
                            label="OTP"
                            type="number"
                            variant="outlined"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                            InputProps={{ inputProps: { className: 'no-spinner' } }}
                        />
                    )}

                    {step === 3 && (
                        <TextField
                            label="New Password"
                            type="password"
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading || (retryAfter > 0 && step === 1)}
                    >
                        {loading ? <CircularProgress size="1.2rem" style={{color : 'white'}} /> :
                            step === 1 ? "Send OTP" :
                                step === 2 ? "Verify OTP" :
                                    "Reset Password"}
                    </Button>

                    {step === 2 && (retryAfter > 0 ?(
                        <p style={{ color: '#999', marginTop: '10px' }}>
                            Please wait <strong>{retryAfter}</strong> seconds before requesting a new OTP.
                        </p>) : (
                            <pre style={{marginTop : '1rem', fontSize : '0.8rem'}}>Didn't Receive OTP? <span style={{cursor : 'pointer',color : 'var(--blue-color)'}} onClick={handleSendOtp}> Resend OTP</span></pre>
                        )
                    )}

                    {msg && (
                        <p style={{
                            marginTop: '1rem',
                            color: msg.toLowerCase().includes('success') ? 'green' : 'red'
                        }}>{msg}</p>
                    )}
                </form>
                <NavLink to='/login' style={{ display: 'block', textAlign: 'center', marginTop: '2rem', color: 'var(--blue-color)' }}>Go back to Login</NavLink>
            </div>
        </div>
    );
};

export default ForgotPassword;
