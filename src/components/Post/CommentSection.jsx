import React, { useState, useContext, useRef, useEffect } from "react";
import { Heart, Send, Pipette , MessageCircle , ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import './CommentSection.css'
import { AllPostContextData } from "../../Context/AllPostContext";
import defaultprofilephoto from '../../Photo/defaultprofilepic.png'
import { formatDistanceToNow, isToday, parseISO } from "date-fns";
import { useSocket } from "../../Context/SocketContext";


const CommentSection = ({ post}) => {
    const { usertoken } = useContext(UserAuthCheckContext);
    const {setAllpost,allpost} = useContext(AllPostContextData);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [replyingTo, setReplyingTo] = useState(null); // Stores comment ID when replying
    const [expandedReplies, setExpandedReplies] = useState({}); // Track which replies are expanded
    const commentInputRef = useRef(null); // Reference to the input field
    const socket = useSocket();

    if (!usertoken) return null;
   

    useEffect(()=>{
        if (post && post.comments) {
            const pinnedComments = post.comments.filter(c => c.comment_pinned);
            const unpinnedComments = post.comments.filter(c => !c.comment_pinned);
            setComments([...pinnedComments, ...unpinnedComments.reverse()]);
        }
    },[post])

    
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
                    ? { ...comment, replies: [...(comment.replies || []), newComment] } 
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
                prev.map(c => (c.comment_id === comment_id ? { ...c, comment_likes: new_likes } : c))
        );
    });
    
    socket.on("comment_pinned", ({ comment_id ,pinned }) => {
        
            setComments((prev) => {
                return prev.map(c =>
                    c.comment_id === comment_id ?{ ...c, comment_pinned: pinned } : c
                ).sort((a, b) => b.comment_pinned - a.comment_pinned);
            });
           
        });


        return () => {
            socket.off("new_comment");
            socket.off("comment_liked");
            socket.off("comment_pinned");
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
    
    const handlePinComment = async (commentId ,isPinned) => {
  
        if (post.post_user_id !== usertoken.user.id) return;

        try {
         await axios.post("/api/posts/comments/pin", {
                user_id: usertoken.user.id,
                post_id: post.post_id,
                comment_id: commentId,
                   pin: !isPinned, 
            });
            socket.emit("pin_comment", { comment_id: commentId, pinned: !isPinned});// Notify server
            setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.comment_id === commentId
                    ? { ...comment, comment_pinned:!isPinned } 
                    : comment
            )
            );
         
        } catch (error) {
            console.error("Error pinning comment:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post("/api/posts/comment", {
                user_id: usertoken.user.id,
                post_id: post.post_id,
                comment: newComment,
                parent_comment_id: replyingTo 
            });


            const newCommentData = {
                ...response.data, 
                commenter_username: usertoken.user.username,  // Add username from logged-in user
                commenter_pic: usertoken.user.profile_pic,  // Add profile pic from logged-in user
                comment_created_at: new Date().toISOString(), // Add current timestamp
            };
    

            socket.emit("new_comment", newCommentData); 
           
            
            setNewComment("");
            setReplyingTo(null);
        } catch (error) {
            console.error("Error adding comment:", error);
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
    console.log(comments)


    return  (
        <div className="commentsectoin-modal-right">
            <h3>Comments</h3>
            <ul>
                {comments.map((c) => (
                    <li key={c.comment_id} className={`comment-item ${c.comment_pinned ? "📌 Pinned" : ""}`}>
                        <img src={c.commenter_pic ? c.commenter_pic : defaultprofilephoto} alt="Profile" className="comment-profile-pic" />

                        <div className="comment-content">
                            <div className="comment-header">
                                <strong>{c.commenter_username} <span>{c.comment_pinned ? "Pinned" : ""}</span></strong>
                                <span className="comment-date">{c.comment_created_at && formatTimeAgo(c.comment_created_at)}</span>
                            </div>
                            <p className="comment-sec-text ">{c.comment_text}</p>
                            <div className="comment-actions">
                                <Heart size={16} color={c.comment_likes > 0 ? "red" : "gray"} onClick={() => handleLikeComment(c.comment_id)} />
                                <span>{c.comment_likes || 0}</span>
                                <MessageCircle size={16} onClick={() => handleReply(c.comment_id)} />
                                {post.post_user_id === usertoken.user.id && <Pipette size={16} onClick={() => handlePinComment(c.comment_id,c.comment_pinned)} />}
                            </div>

                            {/* Replies Section */}
                            {c.replies?.length > 0 && (
                                <div className="replies-section">
                                    <button onClick={() => toggleReplies(c.comment_id)} className="view-replies-btn">
                                        {expandedReplies[c.comment_id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        {expandedReplies[c.comment_id] ? "Hide Replies" : `View Replies (${c.replies.length})`}
                                    </button>

                                    {expandedReplies[c.comment_id] && (
                                        <ul className="replies-list">
                                            {c.replies.map(reply => (
                                                <li key={reply.comment_id} className="reply-item">
                                                    <img src={reply.commenter_pic ? reply.commenter_pic : defaultprofilephoto} alt="Profile" className="comment-profile-pic" />
                                                    <div className="comment-content">
                                                        <div className="comment-header">
                                                            <strong>{reply.commenter_username}</strong>
                                                            <span className="comment-date">{reply.comment_created_at && formatTimeAgo(reply.comment_created_at)}</span>
                                                        </div>
                                                        <p className="comment-sec-text">{reply.comment_text}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Comment Input */}
            <div className="comment-input">
                {replyingTo && <span>Replying to {comments.find(c => c.comment_id === replyingTo)?.commenter_username}</span>}
                <input ref={commentInputRef} type="text" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button onClick={handleCommentSubmit}><Send size={20} /></button>
            </div>
        </div>
    );
};

export default CommentSection;
