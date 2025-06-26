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
import ReportPopup from "../Reports/ReportPopup";
import CombineAvatat from "../Avatar/CombineAvatat";
import { useParams } from "react-router-dom";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { SnackbarContext } from "../../Context/SnackbarContext";

const PostModel = ({ postId, onClose }) => {

    const [comments, setComments] = useState([]);
    const { allpost, setAllpost, isLiked, setIsLiked } = useContext(AllPostContextData);
    const { usertoken } = useContext(UserAuthCheckContext);
    const modalRef = useRef(null);
    const [post, setPost] = useState()
    const { postIdSlug } = useParams();
    const modelboxRef = useRef(null);
    const { isMobile } = useContext(MobileViewContext)
    const [report, setReport] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const {setSnackbar} = useContext(SnackbarContext)




    useEffect(() => {
        const fetchAndSetPost = async () => {
            if (postIdSlug) {
                const postIdFromSlug = postIdSlug.split("-")[0];
                try {
                    const res = await axios.get(`/api/posts/single?postId=${postIdFromSlug}`);
                    setPost(res.data);
                } catch (err) {
                    console.error("Error fetching post by slug:", err);
                }
            } else if (postId) {
                const foundPost = allpost.find(post => post.post_id === postId);
                if (foundPost) {
                    setPost(foundPost);
                } else {
                    console.warn("Post not found in allpost[] for ID:", postId);
                }
            }
        };

        fetchAndSetPost();
    }, [postId, postIdSlug]);




    const handleShareClick = (post) => {

        const postId = post.post_id;
        let postPath = `/post/${postId}`;

        if (post.title && post.title.trim() !== "") {
            const titleSlug = post.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
                .substring(0, 60);

            postPath = `/post/${postId}-${titleSlug}`;
        }

        const fullUrl = `${window.location.origin}${postPath}`;




        // Web share API
        if (navigator.share) {
            navigator
                .share({
                    title: post.title || "BindHash Post",
                    text: "Check out this post on BindHash",
                    url: fullUrl,
                })

                .catch((err) => console.error("Share failed:", err));
        } else {
            alert("Link copied! Share it anywhere.");
        }
    };



    if (!post) return null;

    






    const formatTimeAgo = (createdAt) => {
        const date = parseISO(createdAt);

        if (isToday(date)) {

            return formatDistanceToNow(date, { addSuffix: true });
        } else {

            return formatDistanceToNow(date, { addSuffix: true, includeSeconds: false });
        }
    };



    const handleLike = async (postId) => {
        setAllpost((prevPosts) =>
            prevPosts.map((post) => {
                if (post.post_id === postId) {
                    const wasLiked = post.is_liked;
                    const updatedPost = {
                        ...post,
                        like_count: post.like_count + (wasLiked ? -1 : 1),
                        is_liked: !wasLiked,
                    };


                    setPost((prevPost) =>
                        prevPost?.post_id === postId ? updatedPost : prevPost
                    );

                    return updatedPost;
                }
                return post;
            })
        );

        try {
            await axios.post("/api/posts/like", {
                user_id: usertoken.user.id,
                post_id: postId,
            });
        } catch (error) {
            console.error("Error liking post:", error);


            setAllpost((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.post_id === postId) {
                        const wasLiked = !post.is_liked;
                        const rolledBackPost = {
                            ...post,
                            like_count: post.like_count + (wasLiked ? -1 : 1),
                            is_liked: wasLiked,
                        };

                        setPost((prevPost) =>
                            prevPost?.post_id === postId ? rolledBackPost : prevPost
                        );

                        return rolledBackPost;
                    }
                    return post;
                })
            );
        }
    };


    const handleSave = async (postId) => {
        try {

            setAllpost((prevPosts) =>
                prevPosts.map((p) => {
                    if (p.post_id === postId) {
                        const updatedPost = { ...p, is_saved: !p.is_saved };

                    
                        setPost((prevPost) =>
                            prevPost?.post_id === postId ? updatedPost : prevPost
                        );

                        return updatedPost;
                    }
                    return p;
                })
            );


            const response = await axios.post(`/api/posts/save/${postId}`, {
                userId: usertoken.user.id,
            });


            setSnackbar({
                open: true,
                message: response.data.message,
                type: "success",
            });

        } catch (error) {
            console.error("Error saving post:", error);


            setAllpost((prevPosts) =>
                prevPosts.map((p) => {
                    if (p.post_id === postId) {
                        const rolledBackPost = { ...p, is_saved: !p.is_saved };


                        setPost((prevPost) =>
                            prevPost?.post_id === postId ? rolledBackPost : prevPost
                        );

                        return rolledBackPost;
                    }
                    return p;
                })
            );

            setSnackbar({
                open: true,
                message: "Failed to save post!",
                type: "error",
            });
        }
    };




    return (

        <div className="modal-content" ref={modelboxRef}>
            {/* <button className="close-btn" onClick={handleClose}><X size={24} /></button> */}


            <div className="modal-left">
                <div className="modle-left-name-box">
                    <div className="modle-left-name-box-inside">
                        {/* <img src={post.post_user_pic ? post.post_user_pic : defaultprofilepic} alt="Post" /> */}
                        <CombineAvatat username={post.post_username} profile_pic={post.post_user_pic} visibility={post.post_visibility} size='3rem' />
                        <div className="modle-left-name-box-name">
                            <h3>{post.post_username} &nbsp;</h3>

                            <div className="modle-left-name-box-name-type">
                                {post.category && (<Chip
                                    label={post.category}

                                    size="small"
                                    sx={{ backgroundColor: ' var(--light-blue-color)', color: "var(--blue-color)", padding: '0px 7px', fontSize: '12px', fontWeight: 'bold' }}
                                    className=""
                                />)}
                                <p>{formatTimeAgo(post.created_at)}</p>
                            </div>


                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {usertoken.user.id !== post.post_user_id && <Followbtn userId={post.post_user_id} />}
                        <button className="report-btn" onClick={() => {
                            setReport(true);
                            setSelectedId(post.post_user_id)
                        }}><Flag size={20} /></button>
                    </div>

                </div>
                {post.title && (<header style={{ fontSize: '0.99rem', textAlign: "center", fontWeight: '600', color: 'var(--textcolor)' }}>{post.title}</header>)}
                <p className="post-model-contect">{post.content}</p>
                <div className="post-view-box-image">
                    {post.image && <img src={post.image} alt="Post" className="post-image" />}
                </div>


            </div>

            <div className="modal-right">

                <div className="model-right-comment-area">
                    <div className="modal-right-content-function-box">
                        <div className="model-r-c-f-b-l">

                            <span className="likes" style={{ cursor: 'pointer' }} onClick={() => handleLike(post.post_id)}>
                                {post.is_liked ? <FavoriteOutlinedIcon className="liked" size={16} /> : <Heart size={16} />} {post.like_count} Like

                            </span>
                            <span><MessageSquare size={16} />   {post.comments.filter(comment => comment.parent_comment_id === null).length} Comments</span>

                            <span style={{ cursor: 'pointer' }} onClick={() => handleShareClick(post)}><Forward size={16} />Share</span>
                        </div>
                        <div className="model-r-c-f-b-r">

                            <button style={{ cursor: 'pointer' }} className='active' onClick={() => handleSave(post.post_id)}>

                                {post.is_saved ? <BookmarkOutlinedIcon size={20} /> : <BookmarkAddOutlinedIcon size={20} />}
                            </button>
                        </div>

                    </div>



                    <CommentSection post={post} />



                </div>
            </div>
            {report && <ReportPopup reportedId={selectedId} reportingId={usertoken.user.id} onClose={() => {

                setReport(false)
                setSelectedId(null)
            }} />}

        </div>

    );
}

export default PostModel
