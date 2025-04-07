import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";
import { SnackbarContext } from "../../Context/SnackbarContext";
import axios from "axios";

const SettingsPage = () => {
  const navigate = useNavigate();
  const {setSnackbar} = useContext(SnackbarContext);

   const handleLogout = async () => {
  

    

    try{        
       await axios.post(`/api/auth/logout`)

            navigate("/login");
            setSnackbar({ open: true, message: "Logged out successfully", type: "success" });
            window.location.reload();
    }catch(err){
        console.error("Logout Error:", err)
    }
      
}

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-section">
        <h2 className="section-title">Account</h2>
        <div className="settings-item">Profile Information</div>
        <div className="settings-item">Change Password</div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Privacy</h2>
        <div className="settings-item">Manage Blocked Accounts</div>
        <div className="settings-item">Activity Status</div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Notifications</h2>
        <div className="settings-item">Push Notifications</div>
        <div className="settings-item">Email Notifications</div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Support</h2>
        <div className="settings-item">Help Center</div>
        <div className="settings-item">Contact Us</div>
      </div>

      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
