import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { X, Flag, Heart, Send, MessagesSquare, MessageSquare, Scale, Forward } from "lucide-react";
import { AllPostContextData } from "../../Context/AllPostContext";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import gsap from "gsap";
import './PostModel.css'
import defaultprofilepic from '../../Photo/defaultprofilepic.png'
import { formatDistanceToNow, isToday, parseISO } from "date-fns";
import CommentSection from "./CommentSection";
import { MobileViewContext } from "../../Context/MobileResizeProvider";
import { Chip } from "@mui/material";
import { motion } from "framer-motion";
import Followbtn from "../ProfileStats/Followbtn";


const PostModel = ({ postId, onClose }) => {

    const [comments, setComments] = useState([]);
    const { allpost, setAllpost, isLiked, setIsLiked } = useContext(AllPostContextData);
    const { usertoken } = useContext(UserAuthCheckContext);
    const modalRef = useRef(null);
    const modelboxRef = useRef(null);
    const { isMobile } = useContext(MobileViewContext)


    const post = allpost.find(post => post.post_id === postId);
    if (!post) return null;

    const handlelike = async () => {
        try {
            const response = await axios.post("/api/posts/like", {
                user_id: usertoken.user.id,
                post_id: postId,
            });

            setAllpost((prevPosts) =>
                prevPosts.map((post) =>
                    post.post_id === postId
                        ? { ...post, like_count: post.like_count + response.data.change }
                        : post
                )
            );


            setIsLiked((prevLiked) => ({
                ...prevLiked,
                [postId]: response.data.liked, // Store liked status as true/false
            }));

        } catch (error) {
            console.error("Error liking post:", error);
        }
    };






    const formatTimeAgo = (createdAt) => {
        const date = parseISO(createdAt);

        if (isToday(date)) {

            return formatDistanceToNow(date, { addSuffix: true });
        } else {

            return formatDistanceToNow(date, { addSuffix: true, includeSeconds: false });
        }
    };


    // console.log("this is post ",post);
    // console.log("this is allpost ",allpost);

    return (

        <div className="modal-content" ref={modelboxRef}>
            {/* <button className="close-btn" onClick={handleClose}><X size={24} /></button> */}


            <div className="modal-left">
                <div className="modle-left-name-box">
                    <div className="modle-left-name-box-inside">
                        <img src={post.post_user_pic ? post.post_user_pic : defaultprofilepic} alt="Post" />
                        <div className="modle-left-name-box-name">
                            <h3>{post.post_username} &nbsp;</h3>

                            <div className="modle-left-name-box-name-type">
                                <Chip
                                    label="Student"
                             
                                    size="small"
                                    sx={{ backgroundColor : ' var(--light-blue-color)',       color : "var(--blue-color)"  ,padding: '0px 7px', fontSize: '12px', fontWeight: 'bold' }}
                                    className=""
                                />
                                 <p>{formatTimeAgo(post.created_at)}</p>
                            </div>


                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Followbtn targetUserId={post.post_user_id} />
                    <button className="report-btn"><Flag size={24} /></button>
                    </div>

                </div>
                <p className="post-model-contect">{post.content}</p>
                <div className="post-view-box-image">
                    {post.image && <img src={post.image} alt="Post" className="post-image" />}
                </div>


            </div>

            <div className="modal-right">

                <div className="model-right-comment-area">
                    <div className="modal-right-content-function-box">
                        {console.log("Post is",post)}
                        <span className="likes"><Heart size={16} onClick={handlelike} className={isLiked[post.post_id] ? "liked" : ""} /> {post.like_count} Likes</span>
                        <span><MessageSquare size={16} />   {post.comments.filter(comment =>  comment.parent_comment_id === null  ).length} Comments</span>

                        <span><Forward size = {16} />Share</span>
                    </div>



                    <CommentSection post={post} />



                </div>
            </div>

        </div>

    );
}

export default PostModel
