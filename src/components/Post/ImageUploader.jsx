import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import { ImagePlus } from "lucide-react";
import { getCroppedImg } from '../../components/ProfileUpload/cropUtils'
import "./ImageUploader.css";
import PostEditView from "./PostEditView";
import {motion,AnimatePresence} from 'framer-motion'

function ImageUploader() {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const [imageType, setImageType] = useState(null);
    

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setImageType(file.type);
                setShowCropper(true); // Show cropper after selecting image
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = async () => {
        if (!image || !croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        setCroppedImage(croppedImage);
        setShowCropper(false)
        
    };
  

    return (
        <>
            <button onClick={handleButtonClick} className="home-post-button-box-image" style={{ flexGrow: 1 }}>
                <ImagePlus size={18} className="home-upload-icon" /> Image
            </button>
            <input
                className="post-photo-upload"
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
            />

            {showCropper && (
                <div className="post-p-u-edit">
                    <AnimatePresence>
                    <motion.div
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: '100%' }}
                          transition={{duration : 0.2, ease :'easeInOut'}}
                    className="post-p-u-edit-i">
                        <div className="cropper-container">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1} // LOCK 1:1 ASPECT RATIO
                                cropShape="rect" // Keep it rectangle
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <div className="port-p-u-btn">
                        <button style={{background : 'rgba(0,0,0,0.3)'}} onClick={()=>{
                              setImage(null);
                              setShowCropper(false); 
                              setCroppedImage(null);

                        }}>Cancel</button>
                        <button style={{background : 'black'}} onClick={()=>{
                                    fileInputRef.current.click();
                        }}>Change</button>
                        <button onClick={handleCrop}>Crop </button>
                            
                        </div>
                    </motion.div>
                    </AnimatePresence>
       
                </div>
            )}
                         {croppedImage && <PostEditView setImage={setImage} setImageType={setImageType} setCroppedImage={setCroppedImage} postdata={croppedImage} type={imageType}  setShowCropper={setShowCropper}/>}
        </>
    );
}

export default ImageUploader;
