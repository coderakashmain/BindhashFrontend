import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import MyTextEditor from "../MyTextEditor/MyTextEditor";
import PhotoFilter from "../PhotoFilter/PhotoFilter";
import { CircleFadingPlus, Plus ,X} from 'lucide-react'
import StoryDuration from "./StoryDuration";
import { Button } from "@mui/material";
import SpotifyMusic from "./SpotifyMusic";
import defaultprofilepic from '../../Photo/defaultprofilepic.png'
import { SnackbarContext } from "../../Context/SnackbarContext";


const StoryModal = ({
    showModal,
    setShowModal,
    handleStorySubmit,
    textContent,
    setTextContent,
    handleFileChange,
    isAnonymous,
    setIsAnonymous,
    hiddenMessage,
    setHiddenMessage,
    maxDuration,
    setMaxDuration,
    viewPrivacy,
    setViewPrivacy,
    allowedUsers,
    setAllowedUsers,
    uploading,
    setstorymodeltrue
}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const [closing, setClosing] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const progressRef = useRef(null);
    const { usertoken } = useContext(UserAuthCheckContext)
    const [filteredMedia, setFilteredMedia] = useState(null);
    const [selectedMusic, setSelectedMusic] = useState(null);
const {setSnackbar}  = useContext(SnackbarContext)


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const onFileChange = (e) => {
        handleFileChange(e);
        const file = e.target.files[0];
      
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFilePreview({ url: fileURL, type: file.type.split("/")[0] });
        }
        setFilteredMedia(null);
    };


    useEffect(() => {
        if (progressRef.current) {
            progressRef.current.style.width = `${(maxDuration / 24) * 100}%`;
        }
    }, [maxDuration]);

    const transitionSettings = {
        type: "spring",
        stiffness: isMobile ? 80 : 80,
        damping: isMobile ? 18 : 12,
    };
    const handleClose = () => {
        setClosing(true);
        setstorymodeltrue(false);


    };

    return (
        <AnimatePresence
            onExitComplete={() => {
                setFilePreview(null);
                setShowModal(false);
                setClosing(false);
            }}>
            {showModal && !closing && (
                <motion.div className="modal-overlay-box " initial={{ background: "rgba(0, 0, 0, 0.0)", backdropFilter : 'blur(0px)' }}
                    animate={{ background: "var(--popupbackcolor)", backdropFilter : 'blur(4px) '}}
                    exit={{ background: "rgba(0, 0, 0, 0.0)", backdropFilter : 'blur(0px) '}}
                    onClick={handleClose}>

                    <motion.div
                        className={`modal-container scrollbar ${isMobile ? "mobile-modal" : ""}`}
                        initial={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0 }}
                        animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
                        exit={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0 }}
                        transition={transitionSettings}
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: !filePreview && !isMobile ? '40rem' : '' }}
                    >
                        {(!filePreview || isMobile) && (<div className="story-user-info" style={{ position: filePreview ? 'fixed' : 'block' }}>
                            <div className="story-user-info-inside">
                                <img src={usertoken.user.profile_pic ? usertoken.user.profile_pic  : defaultprofilepic} alt="Profile" className="profile-pic" />
                                {!filePreview && (<span>{usertoken.user.username}</span>)}
                            </div>
                            <button className="story-close-btn btnhover" onClick={handleClose}>
                                <X/>
                            </button>
                        </div>)}

                        {filePreview ? (<div className="story-upload-file-edit">



                            <div className="story-upload-file-edit-left">

                                {filePreview && (
                                    <PhotoFilter media={filePreview.url} type={filePreview.type} setFilteredMedia={setFilteredMedia} />
                                )}
                            </div>

                            <div className="story-upload-file-edit-right">
                                {!isMobile && <div className="story-user-info">
                                    <div className="story-user-info-inside">
                                        <img src={usertoken.user.profile_pic ? usertoken.user.profile_pic  : defaultprofilepic}alt="Profile" className="profile-pic" />
                                        <span>{usertoken.user.username}</span>
                                    </div>
                                    <button className="story-close-btn" onClick={handleClose}>
                                        Close
                                    </button>
                                </div>}

                                <MyTextEditor textContent={textContent} setTextContent={setTextContent} />

                                <button onClick={() => setSelectedMusic(null)}>Select Music</button>

                                {selectedMusic && (
                                    <div>
                                        <p>Playing: {selectedMusic.name} - {selectedMusic.artist}</p>
                                        <audio controls autoPlay>
                                            <source src={selectedMusic.url} type="audio/mpeg" />
                                        </audio>
                                    </div>
                                )}

                                {/* {!selectedMusic && <SpotifyMusic setMusic={setSelectedMusic} />} */}

                                <div className="story-option-custume">
                                    <StoryDuration maxDuration={maxDuration} setMaxDuration={setMaxDuration} />
                                    <Button
                                        variant="contained"
                                        onClick={() => setIsAnonymous(!isAnonymous)}
                                        sx={{
                                            backgroundColor: isAnonymous ? "#1976D2" : "#E0E0E0",
                                            color: isAnonymous ? "white" : "black",
                                            "&:hover": {
                                                backgroundColor: isAnonymous ? "#1565C0" : "#BDBDBD",
                                            },
                                            padding: "8px 16px",
                                            borderRadius: "20px",
                                            textTransform: "none",
                                            margin: 'auto'
                                        }}
                                    >
                                        {isAnonymous ? "Posting Anonymously" : "Post with Name"}
                                    </Button>

                                    <input
                                        type="text"
                                        placeholder="Hidden Message"
                                        value={hiddenMessage}
                                        onChange={(e) => setHiddenMessage(e.target.value)}
                                    />




                                    <select value={viewPrivacy} onChange={(e) => setViewPrivacy(e.target.value)}>
                                        <option value="public">Public</option>
                                        <option value="friends">Friends</option>
                                        <option value="custom">Custom</option>
                                    </select>

                                    {viewPrivacy === "custom" && (
                                        <input
                                            type="text"
                                            placeholder="Allowed Users (comma-separated IDs)"
                                            onChange={(e) => setAllowedUsers(e.target.value.split(","))}
                                        />
                                    )}

                                    <button className="story-submit-btn" onClick={handleStorySubmit} disabled={uploading}>
                                        {uploading ? "Uploading..." : "Add Story"}
                                    </button>
                                </div>
                            </div>
                        </div>) : (
                            <>
                                <div className="story-upload-box-out">
                                    <input type="file" accept="image/*,video/*,audio/*" onChange={onFileChange} />
                                    <label htmlFor="story-upload" className="custom-file-upload">
                                        <CircleFadingPlus className="story-icon" />
                                        <span>Photo/Video</span>
                                    </label>
                                </div>
                                <button 
                                onClick={()=> setSnackbar({open : true, message : 'Available soon.', type : 'info'})}
                                className="story-share-thoughts"><Plus />Share some thoughts</button>
                            </>



                        )}


                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StoryModal;
