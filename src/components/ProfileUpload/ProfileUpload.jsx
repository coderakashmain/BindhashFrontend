import React, { useState, useRef, useContext } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import {UserRoundPen} from "lucide-react"
import { getCroppedImg } from "./cropUtils"; // Utility to get cropped image

const ProfileUpload = ({setProfilepicloading}) => {
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
    const cropped = await getCroppedImg(image, croppedAreaPixels);
    setCroppedImage(cropped);
   
  };

  const handleUpload = async () => {
    if (!croppedImage) return;
    setProfilepicloading(true);
    const originalFormat = "image/jpeg"; // Adjust format if necessary
    const file = new File([croppedImage], `profile_pic_${Date.now()}.jpg`, { type: originalFormat });


    console.log(file)
    const formData = new FormData();
    formData.append("profile_pic", file);
    formData.append("userid", usertoken.user.id);

    
    
    setShowCropModal(false);
    try {
      const response = await axios.post("/api/users/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUsertoken((prev) => ({
        ...prev,
        user: { ...prev.user, profile_pic: response.data.profile_pic },
      }));
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
      <button onClick={() => fileInputRef.current.click()} className="upload-icon">
      <UserRoundPen size={13} color="black" />
      </button>

      {showCropModal && (
        <div className="crop-modal">
            <div className="crop-model-edit-box">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
          </div>
          <div className="crop-btn-submit">
          <button  onClick={handleUpload}>Save</button>
          <button onClick={() => setShowCropModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUpload;
