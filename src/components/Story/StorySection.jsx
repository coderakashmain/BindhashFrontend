import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { useSocket } from "../../Context/SocketContext";
import "./StorySection.css";
import "../../pages/Home/Home.css";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import StoryModal from "./StoryModal";

const StorySection = () => {
    const { usertoken } = useContext(UserAuthCheckContext);
    const [stories, setStories] = useState([]);
    const [textContent, setTextContent] = useState("");
    const [mediaFile, setMediaFile] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [hiddenMessage, setHiddenMessage] = useState("");
    const [maxDuration, setMaxDuration] = useState(24);
    const [viewPrivacy, setViewPrivacy] = useState("public");
    const [allowedUsers, setAllowedUsers] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const socket = useSocket();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

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
            setStories(response.data);
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
        } catch (error) {
            console.error("Error uploading story:", error);
        }
        setUploading(false);
    };

    return (
        <div className="home-post-box-story scrollbar">
            <div className="home-post-box-story-out-side">
            <ul className="home-story-box">
                {stories.map((story) => (
                    <li key={story.story_id} className="story-card">
                        {story.media_type === "image" && <img src={story.media_url} alt="Story" />}
                        {story.media_type === "video" && <video src={story.media_url} controls />}
                        {story.media_type === "audio" && <audio src={story.media_url} controls />}
                        {story.is_anonymous ? <p>Anonymous Story</p> : <p>{story.text_content}</p>}
                    </li>
                ))}
            </ul>
            </div>
            <div className="home-story-box-post" onClick={() => setShowModal(true)}>
                <Plus size="3rem" strokeWidth={2} />
                <p>Add story</p>
            </div>
     
                {showModal && (
                    <StoryModal
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
 
        </div>
    );
};

export default StorySection;
