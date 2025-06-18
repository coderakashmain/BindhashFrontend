import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import './SetUsername.css';
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarContext } from "../../Context/SnackbarContext";
import { Helmet } from "react-helmet"

const SetUsername = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);

  const email = location.state?.email || ""; // Get email from previous page

  useEffect(() => {
    if (!email) {
      navigate("/register"); // Redirect if no email found
    }
    console.log("This is my email ", email)
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullNameRegex = /^[a-zA-Z ]{3,}$/;
    const usernameRegex = /^[a-z_][a-z0-9_]{2,}$/;

    if (!username || !fullName) {
      setError("Both fields are required!");
      setLoading(false);
      return;
    }

    if (!fullNameRegex.test(fullName)) {
      setError("Full name must be at least 3 characters and contain only letters and spaces.");
      setLoading(false);
      return;
    }

    if (!usernameRegex.test(username)) {
      setError("Username must start with a letter or underscore, and contain only lowercase letters, numbers, or underscores (min 3 characters).");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/setusername", { email, username, fullName });
      if (response.data.success) {
        setLoading(false)
        navigate("/register/setgender", { state: { email } });
        setSnackbar({ open: true, message: " Name  set successfully", type: "success" });
      } else {
        setSnackbar({ open: true, message: "Failed to set Name. Try again.", type: "error" });
        setError(response.data.error || "Failed to set Name. Try again.");
        setLoading(false)
      }
    } catch (err) {
      console.error(err);
      setLoading(false)
      setSnackbar({ open: true, message: "Error setting Name.", type: "error" });
      setError("Error setting username.");
    }
  };

  return (
    <div className="set-username-container">

      <Helmet>
        <title>Set Username – Create Your Identity | Bindhash</title>
        <meta
          name="description"
          content="Choose a unique username and name for your Bindhash profile. This helps others find, connect, and recognize you while posting or chatting."
        />
      </Helmet>
      <h2 style={{ fontSize: '2rem', margin: '0rem 0rem 2rem 0', fontWeight: 'bold' }}>What is Your FullName and UserName ?</h2>
      <p style={{ marginBottom: "1rem", color: 'gray' }}>Please fill  the all box. All boxes are required! </p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="username-form">

        {/* Full Name Field */}
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* Username Field */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Submit Button */}
        <Button sx={{ margin: '2rem 0 0 0 ', padding: '0.8rem', }} disabled={loading} type="submit" variant="contained" color="primary" fullWidth>
          {loading ? <CircularProgress size='1.5rem' color='white' /> : "  Save & Continue"}
        </Button>
      </form>


    </div>
  );
};

export default SetUsername;
