import React, { useContext, useState } from "react";
import axios from "axios";
import {
    MoreVertical, Edit, Trash2, Share2, Bookmark,
    Flag, Link2, EyeOff
} from "lucide-react";
import { Menu, MenuItem, IconButton, Divider, Snackbar, Alert } from "@mui/material"; // MUI Dropdown
import  {UserAuthCheckContext} from '../../Context/UserAuthCheck'   

const PostOptions = ({
    postId, userId, pollId, onPostUpdate
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
    const open = Boolean(anchorEl);
    const {usertoken} = useContext(UserAuthCheckContext)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = async () => {
        const newContent = prompt("Enter new content:");
        if (!newContent) return;

        try {
            await axios.put(`/api/postfuntion/edit/${postId}`, { content: newContent });
            setSnackbar({ open: true, message: "Post updated successfully!", type: "success" });
            onPostUpdate(); // Refresh post data
        } catch (error) {
            console.error("Error editing post:", error);
            setSnackbar({ open: true, message: "Failed to update post!", type: "error" });
        }
        handleClose();
    };


    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await axios.delete(`/api/postfuntion/delete/${postId}`);
            setSnackbar({ open: true, message: "Post deleted successfully!", type: "success" });
            onPostUpdate(); // Refresh posts
        } catch (error) {
            console.error("Error deleting post:", error);
            setSnackbar({ open: true, message: "Failed to delete post!", type: "error" });
        }
        handleClose();
    };

    // ✅ Save Post
    const handleSave = async () => {
        try {
            await axios.post(`/api/postfuntion/save/${postId}`, { userId });
            setSnackbar({ open: true, message: "Post saved!", type: "success" });
        } catch (error) {
            console.error("Error saving post:", error);
            setSnackbar({ open: true, message: "Failed to save post!", type: "error" });
        }
        handleClose();
    };

    // ✅ Report Post
    const handleReport = async () => {
        const reason = prompt("Enter the reason for reporting:");
        if (!reason) return;

        try {
            await axios.post(`/api/postfuntion/report/${postId}`, { userId, reason });
            setSnackbar({ open: true, message: "Post reported!", type: "success" });
        } catch (error) {
            console.error("Error reporting post:", error);
            setSnackbar({ open: true, message: "Failed to report post!", type: "error" });
        }
        handleClose();
    };

    // ✅ Copy Link
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
        setSnackbar({ open: true, message: "Link copied to clipboard!", type: "success" });
        handleClose();
    };

    // ✅ Hide Post (Dummy functionality)
    const handleHide = () => {
        setSnackbar({ open: true, message: "Post hidden!", type: "success" });
        handleClose();
    };


    return (
        <>

            <IconButton onClick={handleClick}>
                <MoreVertical size={18} />
            </IconButton>


            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
                sx: { padding: "0.5rem 0", minWidth: "10rem" }
            }}
                PaperProps={{
                    sx: {
                        padding: "0.2rem",

                        minWidth: "12rem",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                }}>
                {/* Edit Post */}
           {usertoken.user.id === userId && (     <MenuItem onClick={handleEdit}>
                    <Edit size={18} style={{ marginRight: 8 }} /> Edit Post
                </MenuItem>)}


                {/* Delete Post */}
               { usertoken.user.id === userId &&  ( <MenuItem onClick={handleDelete}>
                    <Trash2 size={18} style={{ marginRight: 8, color: "red" }} /> Delete Post
                </MenuItem>)}


                <Divider />

                {/* Share Post */}
                <MenuItem >
                    <Share2 size={18} style={{ marginRight: 8 }} /> Share Post
                </MenuItem>

                {/* Save Post */}
                <MenuItem onClick={handleSave}>
                    <Bookmark size={18} style={{ marginRight: 8 }} /> Save Post
                </MenuItem>


                <Divider />

                {/* Copy Link */}
                <MenuItem onClick={handleCopyLink}>
                    <Link2 size={18} style={{ marginRight: 8 }} /> Copy Link
                </MenuItem>

                {/* Report Post */}
                <MenuItem onClick={handleReport}>
                    <Flag size={18} style={{ marginRight: 8, color: "orange" }} /> Report Post
                </MenuItem>


                {/* Hide Post */}

                <MenuItem onClick={handleHide}>
                    <EyeOff size={18} style={{ marginRight: 8 }} /> Hide Post
                </MenuItem>
            </Menu>
            {/* Snackbar for Notifications */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ open: false })}>
                <Alert severity={snackbar.type}>{snackbar.message}</Alert>
            </Snackbar>
        </>
    );
};

export default PostOptions;
