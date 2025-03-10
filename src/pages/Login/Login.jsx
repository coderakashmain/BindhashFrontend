import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import './Login.css'
import loginlogo from '../../Photo/blob.svg'
import Bangbox from "../../components/Bangbox/Bangbox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUsertoken } = useContext(UserAuthCheckContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
      sessionStorage.setItem('logintoken', true);
      setUsertoken(response.data);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-box1">
        <div className="login-container-box1-inside">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            <a href="">Forget password?</a>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
      <div className="login-container-box2">
        <img src={loginlogo} alt="loginlogo" />
        <Bangbox size="10rem" click={false}/>
      </div>
    </div>
  );
};

export default Login;
