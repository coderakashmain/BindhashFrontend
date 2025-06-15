import React, { useState, useContext, useRef, useEffect } from "react";
import { Heart, Send, Pipette, MessageCircle, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import './CommentSection.css'
import { AllPostContextData } from "../../Context/AllPostContext";
import defaultprofilephoto from '../../Photo/defaultprofilepic.png'
import { formatDistanceToNow, isToday, parseISO } from "date-fns";
import { useSocket } from "../../Context/SocketContext";
import { AnimatePresence, motion } from "framer-motion";
import PushPinIcon from '@mui/icons-material/PushPin';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { SnackbarContext } from "../../Context/SnackbarContext";
import CommmentSkeleton from "../../components/Fallback/CommentSkeleton";

const CommentSection = ({ post }) => {
    const { usertoken } = useContext(UserAuthCheckContext);
    const { setAllpost, allpost } = useContext(AllPostContextData);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [replyingTo, setReplyingTo] = useState(null); // Stores comment ID when replying
    const [expandedReplies, setExpandedReplies] = useState({}); // Track which replies are expanded
    const commentInputRef = useRef(null); // Reference to the input field
    const socket = useSocket();
    const [activecommnet, setActiveComment] = useState(false);
    const [loading, setLoading] = useState(false);
        const [sendcommentload, setSendCommentLoad] = useState(false);

    const { setSnackbar } = useContext(SnackbarContext);

    if (!usertoken || !post.post_id) return null;


    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);

            const localKey = `comments_post_${post.post_id}`;
            const cached = JSON.parse(localStorage.getItem(localKey));

            if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
                try {

                    setComments(cached.data);
                    setLoading(false);
                } catch {
                    localStorage.removeItem(localKey); // corrupted cache
                }
            }

            try {
                const response = await axios.get(`/api/posts/comments/fetch?post_id=${post.post_id}`);


          


                if (response.data.length > 0) {
                    const pinnedComments = response.data.filter(c => c.pinned);
                    const unpinnedComments = response.data.filter(c => !c.pinned);
                    const finalData = [...pinnedComments, ...unpinnedComments.reverse()];
                    setComments(finalData);
                    localStorage.setItem(localKey, JSON.stringify({
                        timestamp: Date.now(),
                        data: finalData,
                    }));
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchComments();

        // Cleanup function to reset comments when post changes
        return () => {
            setComments([]);
            setReplyingTo(null);
            setExpandedReplies({});
        };

    }, [])


    useEffect(() => {

    }, [])


    useEffect(() => {

        if (!socket) return;



        socket.on("new_comment", (newComment) => {


            if (newComment.post_id === post.post_id) {
                if (newComment.post_id === post.post_id) {
                    setComments(prevComments => {
                        if (newComment.parent_comment_id) {
                            // It's a reply, find its parent comment and nest it inside
                            return prevComments.map(comment =>
                                comment.comment_id === newComment.parent_comment_id
                                    ? { ...comment, replies: [newComment, ...(comment.replies || [])] }
                                    : comment
                            );
                        } else {
                            // It's a top-level comment, add it normally
                            return [newComment, ...prevComments];
                        }
                    });
                }
            }
        });
        socket.on("comment_liked", ({ comment_id, new_likes }) => {

            setComments((prev) =>
                prev.map(c => (c.comment_id === comment_id ? { ...c, likes: new_likes } : c))
            );
        });

        socket.on("pinned", ({ comment_id, pinned }) => {

            setComments((prev) => {
                return prev.map(c =>
                    c.comment_id === comment_id ? { ...c, pinned: pinned } : c
                ).sort((a, b) => b.pinned - a.pinned);
            });

        });


        return () => {
            socket.off("new_comment");
            socket.off("comment_liked");
            socket.off("pinned");
        };
    }, [socket]);

    const handleLikeComment = async (commentId) => {

        try {
            await axios.post("/api/posts/comments/like", {
                user_id: usertoken.user.id,
                comment_id: commentId,
            });
            socket.emit("like_comment", { comment_id: commentId });  // Notify server
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };


    const handleReply = (commentId) => {
        setReplyingTo(commentId);
        commentInputRef.current?.focus();
    };

    const toggleReplies = (commentId) => {
        setExpandedReplies(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const handlePinComment = async (commentId, isPinned) => {

        if (post.post_user_id !== usertoken.user.id) return;

        try {
            await axios.post("/api/posts/comments/pin", {
                user_id: usertoken.user.id,
                post_id: post.post_id,
                comment_id: commentId,
                pin: !isPinned,
            });
            socket.emit("pin_comment", { comment_id: commentId, pinned: !isPinned });// Notify server
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.comment_id === commentId
                        ? { ...comment, pinned: !isPinned }
                        : comment
                )
            );

        } catch (error) {
            console.error("Error pinning comment:", error);
        }
    };



    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;
        setSendCommentLoad(true);

        try {
            const response = await axios.post("/api/posts/comment/insert", {
                user_id: usertoken.user.id,
                post_id: post.post_id,
                comment: newComment,
                parent_comment_id: replyingTo
            });


            const newCommentData = {
                ...response.data,
                commenter_username: usertoken.user.username,  // Add username from logged-in user
                commenter_pic: usertoken.user.profile_pic,  // Add profile pic from logged-in user
                // created_at: new Date().toISOString(), 
            };


            setSnackbar({open : true, message : "Comment added successfully", type : "success"});
            socket.emit("new_comment", newCommentData);
            setActiveComment(false);
            setNewComment("");
            setReplyingTo(null);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
        finally{
            setSendCommentLoad(false)
        }
    };

    useEffect(() => {
        if (activecommnet && commentInputRef.current) {
            commentInputRef.current.focus();
        }
    }, [activecommnet]);


    const formatTimeAgo = (createdAt) => {
        const date = parseISO(createdAt);

        if (isToday(date)) {

            return formatDistanceToNow(date, { addSuffix: true });
        } else {

            return formatDistanceToNow(date, { addSuffix: true, includeSeconds: false });
        }
    };

    if (loading) return <CommmentSkeleton />


   
    return (
        <div className="commentsectoin-modal-right">
            <h3>Comments
                {/* <p></p> */}
            </h3>

            {comments.length === 0 && !loading && (<div style={{
                flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.1rem',
                paddingTop: '7rem'
            }}>No Comments </div>)}

            {comments.length > 0 && (<ul className="scrollbar">
                {comments
                    .filter(c => c.commenter_username)
                    .map((c) => (
                        <li key={c.comment_id} className={`comment-item ${c.pinned ? "Pinned" : ""}`}>
                            <aside className="comment-profile-box">
                                <div className="comment-profile-box-l">
                                    <img src={c.commenter_pic ? c.commenter_pic : defaultprofilephoto} alt="Profile" className="comment-profile-pic" />
                                    <div className="comment-header">
                                        <strong>{c.commenter_username} <span>{c.pinned ? "Pinned" : ""}</span></strong>
                                        <span className="comment-date">{c.created_at && formatTimeAgo(c.created_at)}</span>
                                    </div>
                                </div>
                                <div className="comment-profile-box-r">
                                    {post.post_user_id === usertoken.user.id && <PushPinIcon sx={{ fontSize: "01.1rem" }} onClick={() => handlePinComment(c.comment_id, c.pinned)} />}
                                    {c.commenter_id !== usertoken.user.id && (<p>Report</p>)}
                                </div>

                            </aside>

                            <div className="comment-content">

                                <p className="comment-sec-text ">{c.comment}</p>
                                <div className="comment-actions">
                                    <div className="comment-action-box" style={{ color: c.likes > 0 ? "var(--blue-color)" : "" }} onClick={() => handleLikeComment(c.comment_id)}>
                                        <MoodIcon sx={{ size: '0.3rem' }} />
                                        {/* <Heart size={16} /> */}
                                        <span>{c.likes || 0}</span>
                                    </div>
                                    {/* <div className="comment-action-box">
                                        <SentimentVeryDissatisfiedIcon />
                                        
                                        <span>{c.likes || 0}</span>
                                    </div> */}
                                    |
                                    <p style={{ color: c.replies?.length > 0 && 'var(--blue-color)' }} onClick={() => {

                                        if (c.replies?.length > 0) {
                                            toggleReplies(c.comment_id)
                                        }
                                    }} >{c.replies?.length > 0 ? c.replies.length : 0} replies </p>

                                    ৹
                                    <strong style={{ color: 'var(--blue-color)' }} onClick={() => {

                                        handleReply(c.comment_id)
                                        setActiveComment(true);
                                    }} >Reply</strong>

                                    {c.replies?.length > 0 && (expandedReplies[c.comment_id] ? <ChevronUp size={16} onClick={() => toggleReplies(c.comment_id)} /> : '')}

                                </div>

                                {/* Replies Section */}
                                {c.replies?.length > 0 && (
                                    <div className="replies-section">
                                        {/* <button className="view-replies-btn">
                                           
                                            {expandedReplies[c.comment_id] ? "Hide Replies" : `View Replies (${c.replies.length})`}
                                        </button> */}

                                        {expandedReplies[c.comment_id] && (
                                            <ul className="replies-list">
                                                {c.replies.map(reply => (

                                                    <li key={reply.comment_id} className="reply-item">

                                                        <div className="reply-item-header">
                                                            <img src={reply.commenter_pic ? reply.commenter_pic : defaultprofilephoto} alt="Profile" className="comment-profile-pic" />
                                                            <div className="comment-replies-content">
                                                                <div className="comment-header">
                                                                    <strong>{reply.commenter_username}</strong>
                                                                    <span className="comment-date">{reply.created_at && formatTimeAgo(reply.created_at)}</span>
                                                                </div>
                                                                {reply.comment_id !== usertoken.user.id && (<p>Report</p>)}
                                                            </div>
                                                        </div>
                                                        <p style={{ marginLeft: '0.4rem' }} className="comment-sec-text">{reply.comment}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
            </ul>)}

            {/* Comment Input */}


            {/* Floating Comment Button */}
            <AnimatePresence>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{

                        bottom: activecommnet ? '0%' : "3%",
                        right: activecommnet ? '0%' : "3%",
                        scale: activecommnet ? 25 : 1, opacity: 1,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => {

                        if (!activecommnet) {
                            setReplyingTo(null);
                            setActiveComment(true)
                        }
                    }}
                    transition={{
                        default: { type: "spring", stiffness: 200, damping: 25 },
                        borderRadius: { delay: 0, duration: 2 },
                    }} className="floating-comment">

                    {!activecommnet && (<motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className=""

                    > <MessageSquare size={20} /></motion.button>)}
                </motion.div>

                <AnimatePresence>
                    {activecommnet && (<motion.div initial={{ opacity: 0, y: "100%", background: 'transparent' }}
                        animate={{ opacity: 1, zIndex: 10, y: 0 }} exit={{ opacity: 0, y: "20%" }}

                        transition={{ duration: 0.2 }}
                        className="comment-input">
                        {replyingTo ? (<span>Replying to {comments.find(c => c.comment_id === replyingTo)?.commenter_username}</span>)
                            : (<span>Comment to {post.post_username}'s post</span>)
                        }
                        <input ref={commentInputRef} type="text" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />

                        <button style={{opacity : sendcommentload ? 0.7 : 1}}  disabled={sendcommentload} onClick={handleCommentSubmit}>
                            Send<Send size={20}  />
                            
                            </button>
                        <button onClick={() => setActiveComment(false)}>Cancle</button>
                    </motion.div>)}
                </AnimatePresence>
            </AnimatePresence>

        </div>
    );
};

export default CommentSection;
