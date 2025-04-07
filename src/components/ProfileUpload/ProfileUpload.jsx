  import React, { useState, useRef, useContext, useEffect } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import {UserRoundPen ,SwitchCamera} from "lucide-react"
import { getCroppedImg } from "./cropUtils"; // Utility to get cropped image
import './ProfileUpload.css'
const ProfileUpload = ({setProfilepicloading,paddingvalue,size,mainphoto,borderRadius}) => {
  const { usertoken, setUsertoken } = useContext(UserAuthCheckContext);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropModal, setShowCropModal] = useState(false);
  const fileInputRef = useRef(null);



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setShowCropModal(true);
    }
  };

  const handleCropComplete = async (_, croppedAreaPixels) => {
    console.log('cropped is worked')
    const cropped = await getCroppedImg(image, croppedAreaPixels);
    setCroppedImage(cropped);
   
  };

  const handleUpload = async () => {
    if (!croppedImage) return;
    setProfilepicloading(true);
    const originalFormat = "image/jpeg"; // Adjust format if necessary
    const file = new File([croppedImage], `profile_pic_${Date.now()}.jpg`, { type: originalFormat });


 
    const formData = new FormData();
    formData.append("profile_pic", file);
    formData.append("userid", usertoken.user.id);
    formData.append("mainphoto", mainphoto);

    
    
    setShowCropModal(false);
    try {
      const response = await axios.post("/api/users/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUsertoken((prev) => {
        if (response.data.profile_pic) {
            return {
                ...prev,
                user: { 
                    ...prev.user, 
                    profile_pic: response.data.profile_pic 
                },
            };
        }
        if(response.data.profileback_pic){
          return {
            ...prev,
            user: { 
                ...prev.user, 
                profileback_pic: response.data.profileback_pic 
            },
        };
        }
        return prev;
    });
      setProfilepicloading(false);

    } catch (error) {
      setProfilepicloading(false);
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="profile-upload">
      <input

        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />
      <button style={ {padding : paddingvalue ? paddingvalue : '', borderRadius : borderRadius ? borderRadius : ''}} onClick={() => fileInputRef.current.click()} className="upload-icon">
      <SwitchCamera size={size ? size  : 18} color="black" />
      </button>

      {showCropModal && (
        <div className="crop-modal" style={{poszIndex : '10'}}>
            <div className="crop-model-edit-box">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={mainphoto ? 1 : 1.8/0.8}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
          </div>
          <div className="crop-btn-submit">
          <button  onClick={handleUpload}>Save</button>
          <button onClick={() =>{ 
            setImage(null)
            setShowCropModal(false)}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUpload;
