import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css'
import Bangbox from "../../components/Bangbox/Bangbox";
import { SnackbarContext } from "../../Context/SnackbarContext";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setSnackbar } = useContext(SnackbarContext);





  return (
    <div className="register-container">

      <Outlet/>
      <div className="register-container-box2">
        <Bangbox size={"10vw"}/>
      </div>
    </div>
  );
};

export default Register;
