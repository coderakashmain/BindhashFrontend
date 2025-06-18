import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SnackbarContext } from "../../Context/SnackbarContext";
import axios from "axios";
import './SetGender.css'; // Import your CSS file for styling
import { Undo2 } from 'lucide-react'
import CircularProgress from '@mui/material/CircularProgress';
import { Helmet } from "react-helmet";


const SetGender = () => {
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const { setSnackbar } = useContext(SnackbarContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const email = location.state?.email || "";

    // If email is missing, redirect to registration
    React.useEffect(() => {
        if (!email) {
            navigate("/register");
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!gender) {
            setError("Please select your gendre.");
            setSnackbar({ open: true, message: 'Please select your gendre.', type: 'error' })
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("/api/auth/setgender", { email, gender });

            if (response.data.success) {
                setSnackbar({ open: true, message: "Gender saved successfully!", type: "success" });
                navigate("/login");
                setLoading(false);

            } else {
                setError("Failed to save gender. Try again.");
                setSnackbar({ open: true, message: 'Failed to save gender. Try again.', type: 'error' })
                setLoading(false);
            }
        } catch (err) {
            setError("Error saving gender.");
            setSnackbar({ open: true, message: 'Error saving gender.', type: 'error' })
            setLoading(false)
        }
    };

    return (
        <div className="set-gender-container">
            <Helmet>
                <title>Select Gender – Personalize Your Experience | Bindhash</title>
                <meta
                    name="description"
                    content="Choose your gender identity to help personalize your experience on Bindhash. You can also choose to keep it private."
                />
            </Helmet>
            <button className="back-btn btnhover" onClick={() => navigate(-1)}><Undo2 size="1.7rem" /></button>
            <div className="set-gender-container-box">
                <h2>What's your gender ?</h2>
                <p style={{ textWrap: 'wrap' }} className="info-text">You can change who sees your gender on your profile later.</p>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div className="gender-options">
                        <label className={`gender-box ${gender === "female" ? "selected" : ""}`}>
                            <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
                            Female
                        </label>

                        <label className={`gender-box ${gender === "male" ? "selected" : ""}`}>
                            <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
                            Male
                        </label>

                        <label className={`gender-box ${gender === "other" ? "selected" : ""}`}>
                            <input type="radio" name="gender" value="other" onChange={(e) => setGender(e.target.value)} />
                            <strong>Other</strong>
                            {/* <span className="subtext">Select "More options" to choose another gender or if you'd rather not say.</span> */}
                        </label>
                    </div>

                    <button type="submit" className="next-btn">{loading ? <CircularProgress size='1.5rem' color='white' /> : "Next"}   </button>
                </form>

                <button className="account-link" style={{ textAlign: 'center' }}>I already have an account ?</button>
            </div>
        </div>
    );
};

export default SetGender;
