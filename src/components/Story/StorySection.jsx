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

const StorySection = ({ storymodeltrue, setstorymodeltrue }) => {
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
        if (storymodeltrue) {
            setShowModal(true)
        }
    }, [storymodeltrue])





    const uniqueUsers = stories.reduce((acc, story) => {
    
  
        if (!acc.some(item => item.user_id === story.user_id)) {
            acc.push(story);
        }
        return acc;
    }, selectedStory ? [selectedStory[0]] : []);



    const userStory = uniqueUsers.find(story => story.user_id === usertoken.user.id);
    const filteredStories = uniqueUsers.filter(story => story.user_id !== usertoken.user.id);

    // Add user's story or an "empty story slot" at the beginning
    const finalStories = [
        userStory || { user_id: usertoken.user.id, is_fake: true, profile_pic: usertoken.user.profile_pic, username: usertoken.user.username },
        ...filteredStories
    ];

     
    return (
        <div className="home-post-box-story scrollbar">


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}

                ref={storyviewRef} className="home-story-scroll-box">
                <ul ref={storyBoxRef} className="home-story-ul">


                    {finalStories
                        .sort((a, b) => (seenStories.has(a.story_id) || a.is_seen ? 1 : -1))
                        .map((story, index) => {
                            const isSeen = seenStories.has(story.story_id) || story.is_seen;

                            return (
                                <motion.li key={story.story_id || `user-${story.user_id}`}
                                    className={`story-card`}
                                    layout 

                                    onClick={async () => {

                                        


                                        const userStories = stories.filter(s => s.user_id === story.user_id);
                                        setSelectedStory(userStories);

                                        // Mark story as seen dynamically
                                        try {
                                            await axios.post("/api/stories/mark-seen", { userId: usertoken.user.id, storyId: story.story_id });

                                            // Update frontend state
                                            setStories(prevStories =>
                                                prevStories.map(s =>
                                                    s.story_id === story.story_id ? { ...s, is_seen: 1 } : s
                                                )
                                            );
                                        } catch (error) {
                                            console.error("Error marking story as seen:", error);
                                        }
                                    }}
                                >


                                    <motion.div

                                        className={`story-card-item ${isSeen ? "seen" : "unseen"}`}
                                        style={{
                                         outline :   ( story.user_id === usertoken.user.id) && story.is_fake ? 'none' : ''
                                        }}
                                    >

                                        <img src={story.profile_pic ? story.profile_pic : defaultprofilepic} alt="" 
                                        
                                            onClick={ ()=> {    
                                                if (story.user_id === usertoken.user.id) {
                                                    if (story.is_fake) {  
                                                        setShowModal(true);
                                                    } else {
                                                        console.log(story.is_fake)                  
                                                        setSelectedStory(stories.filter(s => s.user_id === usertoken.user.id));
                                                    }
                                                    return;
                                                }

                                            }}
                                        />
                                        {usertoken.user.id === story.user_id ? ( <motion.span
                                                      initial={{ scale: 1 }}
                                                      animate={{ scale: [1, 1.05, 1] }} // Bouncing animation
                                                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                                                      className="home-story-box-post-plus-icon" 
                                                      onClick={(event) => {
                                                        event.stopPropagation(); // Prevents triggering the <img> click event
                                                        setShowModal(true);
                                                    }}
                                                      >
                                                        
                                                      <CircleFadingPlus size="1.3rem" strokeWidth={2} />
                                                    </motion.span>) : ('')}
                                    </motion.div>
                                    <p>{story.username}</p>





                                </motion.li>
                            )
                        })}
                </ul>
            </motion.div>





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
                {selectedStory && (<StoryView selectedStory={selectedStory} setSelectedStory={setSelectedStory} />)}
            </AnimatePresence>
        </div>
    );
};

export default StorySection;
