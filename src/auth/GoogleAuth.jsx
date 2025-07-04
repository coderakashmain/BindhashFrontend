import React, { useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserAuthCheckContext } from "../Context/UserAuthCheck";
import "./GoogleAuth.css";
import { useNavigate } from "react-router";


const GoogleAuth = ({SetgoogleLogin}) => {
    const googleClientId = import.meta.env.VITE_AUTH_CLIENTID_GOOGLE;
    const { setUsertoken } = useContext(UserAuthCheckContext);
    
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        SetgoogleLogin(true)
        try {
            if (!response.credential) {
                console.error("No credential found in response.");
                return;
            }
            const res = await axios.post(
                "/api/auth/google",
                { token: response.credential },
                { withCredentials: true }
            );

            sessionStorage.setItem("logintoken", true);
            setUsertoken(res.data);
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Error sending token to backend:", error);
        }
        finally{
            SetgoogleLogin(false)
        }
    };

    const handleFailure = () => {
        console.error("Google login failed");
    };

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <div className="google-auth">
                <div className="custom-google-btn active">
                    <GoogleLogin  onSuccess={handleSuccess} onError={handleFailure} />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
