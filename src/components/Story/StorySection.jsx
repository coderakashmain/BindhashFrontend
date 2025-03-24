import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { useSocket } from "../../Context/SocketContext";
import "./StorySection.css";
import "../../pages/Home/Home.css";
import { CircleFadingPlus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import StoryModal from "./StoryModal";
import defaultprofilepic from '../../Photo/defaultprofilepic.png'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StoryView from "./StoryView";

const StorySection = ({storymodeltrue,setstorymodeltrue}) => {
    const { usertoken } = useContext(UserAuthCheckContext);
    const [stories, setStories] = useState([]);
    const [textContent, setTextContent] = useState("");
    const [mediaFile, setMediaFile] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [hiddenMessage, setHiddenMessage] = useState("");
    const [maxDuration, setMaxDuration] = useState(6);
    const [viewPrivacy, setViewPrivacy] = useState("public");
    const [allowedUsers, setAllowedUsers] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const socket = useSocket();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const storyuplodRef = useRef(null);
    const storyviewRef = useRef(null);
    const storyBoxRef = useRef(null);
    const navigate = useNavigate();
    const [selectedStory, setSelectedStory] = useState(null);
    const [seenStories, setSeenStories] = useState(new Set());

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const response = await axios.get("/api/stories/fetch", {
                params: { user_id: usertoken.user.id },
            });

            const fetchedStories = response.data;
            
            const seenStoryIds = new Set(fetchedStories.filter(story => story.is_seen).map(story => story.story_id));
            setStories(fetchedStories);
            setSeenStories(seenStoryIds);
        } catch (error) {
            console.error("Error fetching stories:", error);
        }
    };
    

    const handleFileChange = (event) => {
        setMediaFile(event.target.files[0]);
    };

    const handleStorySubmit = async () => {
        if (!textContent && !mediaFile) {
            alert("Please add text or media to post a story.");
            return;
        }

        const formData = new FormData();
        formData.append("text_content", textContent);
        formData.append("is_anonymous", isAnonymous);
        formData.append("hidden_message", hiddenMessage);
        formData.append("max_duration", maxDuration);
        formData.append("view_privacy", viewPrivacy);
        formData.append("user_id", usertoken.user.id);
        if (viewPrivacy === "custom") {
            formData.append("allowed_users", JSON.stringify(allowedUsers.filter(user => user.trim() !== "")));
        }
        if (mediaFile) formData.append("media", mediaFile);
        console.log(formData)

        setUploading(true);
        try {
            const response = await axios.post("/api/stories/create", formData);
            socket.emit("new_story", response.data);
            setTextContent("");
            setMediaFile(null);
            setHiddenMessage("");
            setIsAnonymous(false);
            setMaxDuration(24);
            setViewPrivacy("public");
            setAllowedUsers([]);
            fetchStories();
            setShowModal(false);
            setstorymodeltrue(false)
        } catch (error) {
            console.error("Error uploading story:", error);
        }
        setUploading(false);
    };

    useEffect(() => {
        if (!storyuplodRef.current || !storyviewRef.current) return;
    
        const container = document.querySelector(".home-post-box-story-out-side");
        if (!container) return;
    
        const observerOptions = { threshold: 0.1 };
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const targetDiv = entry.target;
    
                    setTimeout(() => {
                        container.scrollTo({ 
                            top: targetDiv.offsetTop - container.offsetTop, // Adjust based on container's position
                            behavior: "smooth"
                        });
                    }, 200); 
                }
            });
        }, observerOptions);
    
        observer.observe(storyuplodRef.current);
        observer.observe(storyviewRef.current);
    
        return () => observer.disconnect();
    }, [storyuplodRef, storyviewRef]);

 

    useEffect(()=>{
        if(storymodeltrue){
            setShowModal(true)
        }
    },[storymodeltrue])




       

    const handleStoryClick = async (storyId,story) => {
        console.log('hle');
         const userStories = stories.filter(s => s.user_id === story.user_id);
         setSelectedStory(userStories); 
        try {
            // Update state optimistically
            setSeenStories((prev) => new Set(prev).add(storyId));

            // Send API request to mark as seen
            await axios.post("/api/stories/mark-seen", { userId : usertoken.user.id, storyId });
        } catch (error) {
            console.error("Error marking story as seen:", error);
        }
    };

    return (
        <div className="home-post-box-story scrollbar">
            <div className="home-post-box-story-out-side">

                <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
                
                ref={storyviewRef} className="home-story-box-story-inside">
                    <ul ref={storyBoxRef} className="home-story-box">
                    

                        {stories.map((story) => (
                            <motion.li key={story.story_id}
                            className={`story-card ${seenStories.has(story.story_id) || story.is_seen ? "seen" : "unseen"}`}
                            // style={{
                            //     transform: `scale(${1 - index * 0.05}) translateX(${index * -10}px)`,
                            //     zIndex: stories.length - index,
                            //   }}
                            
                            onClick={() => handleStoryClick(story.story_id,story)}
                            >
                                
                                {story.media_type === "image" && <img src={story.media_url} loading="lazy" alt="Story" />}
                                {story.media_type === "video" && <video src={story.media_url} loading="lazy"  />}
                                {story.media_type === "audio" && <audio src={story.media_url} loading="lazy"  />}
                                {story.is_anonymous ? <p>Anonymous Story</p> : <p>{story.text_content}</p>}
                                <div className="home-story-box-inside">
                                    <div className="home-story-box-inside-box">

                                        <img src={story.profile_pic} alt="" />
                                        <p>{story.username}</p>
                                    </div>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
                
                {/* <div ref={storyuplodRef} className="home-story-box-post" onClick={() => setShowModal(true)}>
                    <div className="home-story-box-post-inside">
                        <img src={usertoken.user.profile_pic ? usertoken.user.profile_pic : defaultprofilepic} alt="" />
                        <span className="home-story-box-post-plus-icon" >

                            <CircleFadingPlus size="1.3rem" strokeWidth={2} />
                        </span>
                    </div>
                    <p>Add Story</p>
                </div> */}
            </div>


            {(showModal || storymodeltrue) && (
                <StoryModal
                    setstorymodeltrue={setstorymodeltrue}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleStorySubmit={handleStorySubmit}
                    textContent={textContent}
                    setTextContent={setTextContent}
                    handleFileChange={handleFileChange}
                    isAnonymous={isAnonymous}
                    setIsAnonymous={setIsAnonymous}
                    hiddenMessage={hiddenMessage}
                    setHiddenMessage={setHiddenMessage}
                    maxDuration={maxDuration}
                    setMaxDuration={setMaxDuration}
                    viewPrivacy={viewPrivacy}
                    setViewPrivacy={setViewPrivacy}
                    allowedUsers={allowedUsers}
                    setAllowedUsers={setAllowedUsers}
                    uploading={uploading}
                />
            )}
             <AnimatePresence>
            {selectedStory && (<StoryView selectedStory ={selectedStory} setSelectedStory={setSelectedStory}/>)}
            </AnimatePresence>
        </div>
    );
};

export default StorySection;
