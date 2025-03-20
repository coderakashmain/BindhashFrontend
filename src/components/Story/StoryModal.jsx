import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import MyTextEditor from "../MyTextEditor/MyTextEditor";
import PhotoFilter from "../PhotoFilter/PhotoFilter";
import { CircleFadingPlus, Plus } from 'lucide-react'


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
    uploading
}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const [closing, setClosing] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const progressRef = useRef(null);
    const { usertoken } = useContext(UserAuthCheckContext)
    const [filteredMedia, setFilteredMedia] = useState(null);
    

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


    };

    return (
        <AnimatePresence
            onExitComplete={() => {
                setShowModal(false);
                setClosing(false);
                setFilePreview(null);
            }}>
            {showModal && !closing && (
                <motion.div className="modal-overlay-box " initial={{ background: "rgba(0, 0, 0, 0.0)" }}
                    animate={{ background: "rgba(0, 0, 0, 0.5)" }}
                    exit={{ background: "rgba(0, 0, 0, 0.0)" }}
                    onClick={handleClose}>

                    <motion.div
                        className={`modal-container scrollbar ${isMobile ? "mobile-modal" : ""}`}
                        initial={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0 }}
                        animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
                        exit={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0 }}
                        transition={transitionSettings}
                        onClick={(e) => e.stopPropagation()}
                    >
                      { (!filePreview || isMobile )&& (  <div className="story-user-info">
                            <div className="story-user-info-inside">
                                <img src={usertoken.user.profile_pic} alt="Profile" className="profile-pic" />
                                <span>{usertoken.user.username}</span>
                            </div>
                            <button className="story-close-btn" onClick={handleClose}>
                                Close
                            </button>
                        </div>)}

                        {filePreview ? (<div className="story-upload-file-edit">



                            {/* {filePreview && (
                                <div className="media-preview">
                                    {filePreview.type === "image" && <img src={filePreview.url} alt="Preview" />}
                                    {filePreview.type === "video" && <video src={filePreview.url} controls />}
                                    {filePreview.type === "audio" && <audio src={filePreview.url} controls />}
                                </div>
                            )} */}
                            <div className="story-upload-file-edit-left">

                                {filePreview && (
                                    <PhotoFilter media={filePreview.url} type={filePreview.type} setFilteredMedia={setFilteredMedia} />
                                )}
                            </div>

                            <div className="story-upload-file-edit-left">
                                {!isMobile  &&   <div className="story-user-info">
                            <div className="story-user-info-inside">
                                <img src={usertoken.user.profile_pic} alt="Profile" className="profile-pic" />
                                <span>{usertoken.user.username}</span>
                            </div>
                            <button className="story-close-btn" onClick={handleClose}>
                                Close
                            </button>
                        </div>}
                            <MyTextEditor textContent={textContent} setTextContent={setTextContent} />


                                <label>
                                    Anonymous?
                                    <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
                                </label>

                                <input
                                    type="text"
                                    placeholder="Hidden Message"
                                    value={hiddenMessage}
                                    onChange={(e) => setHiddenMessage(e.target.value)}
                                />

                                <div className="story-duration">
                                    <label>Story Duration:</label>
                                    <select value={maxDuration} onChange={(e) => setMaxDuration(e.target.value)}>
                                        <option value={6}>6 hours</option>
                                        <option value={12}>12 hours</option>
                                        <option value={24}>24 hours</option>
                                    </select>
                                    <div className="progress-bar">
                                        <div ref={progressRef} className="progress"></div>
                                    </div>
                                </div>



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
                        </div>) : (
                            <>
                                <div className="story-upload-box-out">
                                    <input type="file" accept="image/*,video/*,audio/*" onChange={onFileChange} />
                                    <label htmlFor="story-upload" className="custom-file-upload">
                                        <CircleFadingPlus className="story-icon" />
                                        <span>Photo/Video</span>
                                    </label>
                                </div>
                                <button className="story-share-thoughts"><Plus />Share some thoughts</button>
                            </>



                        )}


                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StoryModal;
