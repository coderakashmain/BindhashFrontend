import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, GraduationCap, Code, Music, Quote, Pencil,Plus } from "lucide-react";

import './UserProfileBio.css'
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { useNavigate } from "react-router-dom";
import { MobileViewContext } from "../../Context/MobileResizeProvider";

const UserProfileBio = ({ userId ,setProfileEditView}) => {
    const {usertoken}=useContext(UserAuthCheckContext);
    const {isMobile} = useContext(MobileViewContext)


  const navigate = useNavigate();

const editclick= ()=>{
    if(isMobile){
        navigate('/profile/edit')
    }else{
        
        setProfileEditView(true)
    }
}
 

  return (
    <div className="profile-page-right-bio-box">
      <h2>Bio</h2>
      <ul>
        <li onClick={editclick}>
          <GraduationCap size={18} /> {usertoken?.user?.bio?.education || <span className="add-text"><Plus size='1.4rem'/>Add Education</span>}
          <Pencil size={16} className="edit-icon" />
        </li>

        <li onClick={editclick}>
          <Briefcase size={18} /> {usertoken?.user?.bio?.profession || <span className="add-text"><Plus size='1.4rem'/> Add Profession</span>}
          <Pencil size={16} className="edit-icon" />
        </li>

        <li onClick={editclick}>
          <Code size={18} /> {usertoken?.user?.bio?.skills || <span className="add-text"><Plus size='1.4rem'/> Add Skills</span>}
          <Pencil size={16} className="edit-icon" />
        </li>

        <li onClick={editclick}>
          <Music size={18} /> {usertoken?.user?.bio?.hobbies || <span className="add-text"><Plus size='1.4rem'/> Add Hobbies</span>}
          <Pencil size={16} className="edit-icon" />
        </li>

        <li onClick={editclick}>
          <Quote size={18} /> {usertoken?.user?.bio?.philosophy || <span className="add-text"><Plus size='1.4rem'/> Add Philosophy</span>}
          <Pencil size={16} className="edit-icon" />
        </li>
      </ul>

     
    </div>
  );
};

export default UserProfileBio;
