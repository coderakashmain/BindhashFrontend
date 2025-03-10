import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css'
import Bangbox from "../../components/Bangbox/Bangbox";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", { username, email, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-container-box1">
        <div className="register-container-box1-inside">
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}
          <button type=""><b>Sign up with Google</b></button>
          <div className="or-line">
            <div></div>OR  <div></div>

          </div>
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            {/* <p className="main-title-name">Name<span>*</span></p> */}
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="terms-condition-box">
              <input type="checkbox" name="terms and condition box" />
              I accept company's 
              <a href="">Terms of use </a> & <a href=""> Privacy policy</a>
            </div>
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
      <div className="register-container-box2">
        <Bangbox size={"10rem"}/>
        {/* <h1>College Social</h1> */}
      </div>
    </div>
  );
};

export default Register;
