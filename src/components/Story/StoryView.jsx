import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Reply, X } from "lucide-react";
import './StoryView.css'
import Time from "../Time/Time";
import { useEffect, useRef, useState } from "react";
import { duration } from "@mui/material";
import defaultprofilpic from '../../Photo/defaultprofilepic.png'

const StoryView = ({ selectedStory, setSelectedStory }) => {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);
    const [isExiting, setIsExiting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);


    
    useEffect(() => {
        
        if (!selectedStory || selectedStory.length === 0 || !selectedStory[currentIndex]) return
        let interval;

        if (selectedStory[currentIndex].media_type === "image") {
            let startTime = Date.now();
            interval = setInterval(() => {
                let elapsed = Date.now() - startTime;
                let percent = Math.min((elapsed / 10000) * 100, 100);
                setProgress(percent);
                if (percent === 100) {
                    handleNext();
                }
            }, 100);
        } else if (selectedStory[currentIndex].media_type === "video") {
            setProgress(0);
        }

        return () => clearInterval(interval);
    }, [currentIndex, selectedStory]);




    if (!selectedStory || selectedStory.length === 0) return null;


    const handleNext = () => {
        if (currentIndex < selectedStory.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setProgress(0); // Reset progress
        } else {
          setIsSmallScreen(null)
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setProgress(0); // Reset progress
        }
    };

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth <= 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const handleTouchEnd = (e) => {
        if (!touchStartX) return;
        const touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;

        if (difference > 50) {
            handleNext(); // Swipe left → Next story
        } else if (difference < -50) {
            handlePrev(); // Swipe right → Previous story
        }
    };
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleClick = (e) => {
        const screenWidth = window.innerWidth;
        const clickX = e.clientX;

        if (clickX < screenWidth / 2) {
            handlePrev(); // Click left side → Previous story
        } else {
            handleNext(); // Click right side → Next story
        }
    };



    const handleClose = () => {
        setIsExiting(true); // Start exit animation
        setTimeout(() => {
            setSelectedStory(null);
            setIsExiting(false);
        }, 500);

    };
    const transitionSettings = {
        type: "spring",
        stiffness: isSmallScreen ? 80 : 80,
        damping: isSmallScreen ? 18 : 12,
        duration: 2,
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={isSmallScreen ? { y: "100%" } : { opacity: 0 }}
                    animate={isSmallScreen ? { y: "0%" } : { opacity: 1 }}
                    exit={isSmallScreen ? { y: "120%" } : { opacity: 0 }}
                    transition={transitionSettings}
                    className="story-view-story-fullscreen"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}

                    onClick={handleClick}
                // Close on click
                >
                    {/* Background Blur */}
                    <div className="story-view-story-overlay"></div>

                    {/* Story Content */}
                    <div className="story-view-story-content">
                        {/* User Info at the Top */}
                        <div className="story-view-story-header">
                            <div className="story-view-story-header-left">
                               <img src={ selectedStory[currentIndex].profile_pic ? selectedStory[currentIndex].profile_pic : defaultprofilpic} alt="User" className="story-view-profile-pic" />
                                <p className="username">
                                    <span>{selectedStory[currentIndex].username}</span>
                                    <Time posttime={selectedStory[currentIndex].created_at} />
                                </p>
                            </div>
                            <div className="story-view-story-header-right">
                                <div className="story-timer">
                                    <div className="story-timer-progress" style={{ width: `${progress}%` }}></div>
                                </div>
                                <button onClick={handleClose}><X /></button>
                            </div>

                        </div>

                        {/* Media Display */}
                        <div className="media-container" onClick={(e) => e.stopPropagation()}>
                            {selectedStory[currentIndex].media_type === "image" && (
                                <img src={selectedStory[currentIndex].media_url} alt="Story" />
                            )}
                            {selectedStory[currentIndex].media_type === "video" && (
                                <video ref={videoRef} src={selectedStory[currentIndex].media_url} autoPlay onEnded={handleNext}
                                    onTimeUpdate={(e) => {
                                        const currentTime = e.target.currentTime;
                                        const duration = e.target.duration;
                                        if (duration) setProgress((currentTime / duration) * 100);
                                    }}
                                />
                            )}
                        </div>


                        {/* Caption */}
                        <p className="story-view-story-caption">{selectedStory.is_anonymous ? "Anonymous Story" : selectedStory.text_content}</p>

                        {/* story-view-action Buttons */}
                        <div className="story-view-story-actions">
                            <button className="story-view-action-btn"><Reply size={20} /> Reply</button>
                            <button className="story-view-action-btn"><Heart size={20} /> </button>
                        </div>
                    </div>
                </motion.div>
            )}


        </AnimatePresence>
    );
};

export default StoryView;
