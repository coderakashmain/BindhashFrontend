import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
    User, AtSign, Briefcase, GraduationCap, Code, Music, Quote, Save, Pencil
} from "lucide-react";
import "./ProfileEdit.css"; 
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { MobileViewContext } from "../../Context/MobileResizeProvider";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import Subheadcomponent from "../Subheadcomponent/Subheadcomponent";

const ProfileEdit = ({ userId,setProfileEditView }) => {
    const {usertoken} = useContext(UserAuthCheckContext);
    const {isMobile} = useContext(MobileViewContext);
    const navigate = useNavigate();
    // User State
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        bio: {
            education: "",
            profession: "",
            skills: "",
            hobbies: "",
            philosophy: "",
        },
    });

    const [loading, setLoading] = useState(false);
    const [editingField, setEditingField] = useState(null);

 

    
    const handleChange = (e) => {
        const { name, value } = e.target;
       
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleBioChange = (e) => {
        const { name, value } = e.target;
      
        setUser((prev) => ({
            ...prev,
            bio: { ...prev.bio, [name]: value },
        }));
    };


    const handleSave = async (field) => {

       
        setLoading(true);
        try {
            await axios.put(`/api/users/profiledit/${usertoken.user.id}`, user);
            setEditingField(null); 

        } catch (error) {
            console.error("Failed to update profile", error);
        }
        setLoading(false);
    };

 
    const enableEdit = (field) => {
        setEditingField(field);
    };

    return (
        <motion.div
            initial = {{ opacity : 0}}
        animate = {{  opacity : 1}}
        exit = {{ opacity : 0}}
        transition={{duration : 0.2}}
        className="Profile-edit-container-box">

        
        <motion.div
        initial = {{ y  : 50 , opacity : 0}}
        animate = {{ y  : 0 , opacity : 1}}
        exit = {{ y  : 50 , opacity : 0}}
        transition={{duration : 0.2}}
        className="profile-edit-container">
            <Subheadcomponent headline = "Edit" onClose={()=>      setProfileEditView(false)} />

            {/* Full Name */}
            <div className="input-group">
                <User size={20} />
                <input
                    type="text"
                    name="fullName"
                    defaultValue={usertoken?.user?.fullname || ""}
                    onChange={handleChange}
                    placeholder="Full Name"
                />
            </div>

            {/* Username */}
            <div className="input-group">
                <AtSign size={20} />
                <input
                    type="text"
                    name="username"
                    defaultValue={usertoken?.user?.username || ""}
                    onChange={handleChange}
                    placeholder="Username"
                />
            </div>

            {/* Bio Categories */}
            <div className="bio-section">
                <h3>Bio</h3>

                {[
                    { icon: <GraduationCap size={20} />, name: "education", placeholder: "Education (e.g., B.Sc IT at MPC)" },
                    { icon: <Briefcase size={20} />, name: "profession", placeholder: "Profession (e.g., Web Developer)" },
                    { icon: <Code size={20} />, name: "skills", placeholder: "Skills (e.g., React.js, Node.js)" },
                    { icon: <Music size={20} />, name: "hobbies", placeholder: "Hobbies (e.g., Music, Gym, Anime)" },
                    { icon: <Quote size={20} />, name: "philosophy", placeholder: "Philosophy (e.g., Hustling to build something big)" }
                ].map(({ icon, name, placeholder }) => (
                    <div className="input-group" key={name}>
                        {icon}
                        <input
                            type="text"
                            name={name}
                            defaultValue={usertoken.user.bio?.[name] || ""}
                            onChange={handleBioChange}
                            placeholder={placeholder}
                            disabled={editingField !== name}
                        />
                        {editingField !== name &&  (
                            <Pencil size={16} className="edit-icon" onClick={() => enableEdit(name)} />
                        ) }
                    </div>
                ))}
            </div>

            {/* Save All Button */}
            <div className="profile-edit-btn-box">
                <button  onClick={()=>{
                   
                      
                            setProfileEditView(false)
                 
                

                }} className="edit-cancel-p-btn">Cancel</button>
            <button className="save-btn" onClick={() => handleSave()} disabled={loading}>
                <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
            </button>
            </div>
           
        </motion.div>
        </motion.div>
    );
};

export default ProfileEdit;
