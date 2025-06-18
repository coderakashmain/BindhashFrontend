import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField, Button } from "@mui/material";
import './SetPassword.css'; // 
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarContext } from "../../Context/SnackbarContext";
import { Helmet } from "react-helmet";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);

  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false)
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      setLoading(false)
      return;
    }

    try {
      const response = await axios.post("/api/auth/setpassword", { email, password });
      if (response.data.success) {

        navigate("/register/setusername", { state: { email } });
        setSnackbar({ open: true, message: "Password set successfully", type: "success" });
        setLoading(false)
      } else {
        setError("Failed to set password. Try again.");
        setLoading(false)
        setSnackbar({ open: true, message: "Failed to set password. Try again.", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setError("Error setting password.");
      setLoading(false)
      setSnackbar({ open: true, message: "Error setting password.", type: "error" });
    }
  };

  return (
    <div className="set-password-container">
      <Helmet>
        <title>Set Your Password – Secure Your Account | Bindhash</title>
        <meta
          name="description"
          content="Create a strong password to protect your Bindhash account. Your security matters—set your password to continue connecting safely."
        />
      </Helmet>
      <h2 style={{ fontSize: '2rem', margin: '0rem 0rem 2rem 0', fontWeight: 'bold' }}>Set Your Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="password-form">

        {/* Password Field */}
        <TextField
          type={showPassword ? "text" : "password"}
          label="New Password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        {/* Confirm Password Field */}
        <TextField
          type={"password"}
          label="Confirm Password"
          variant="outlined"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}

        />

        {/* Submit Button */}
        <Button type="submit" disabled={loading} variant="contained" sx={{
          background: 'var(--linearcolor)',
          marginTop: '2rem',
          padding: '0.8rem',
          color: '#fff',
          '&:hover': {
            background: 'var(--linearcolor)', // optional, same as default
            opacity: 0.9
          },
        }} fullWidth>
          {loading ? <CircularProgress size='1.5rem' color='white' /> : "Set Password"}

        </Button>
      </form>
    </div>
  );
};

export default SetPassword;
