import React, { useContext, useState } from "react";
import axios from "axios";
import {
    MoreVertical, Edit, Trash2, Share2, Bookmark,
    Flag, Link2, EyeOff, Ellipsis
} from "lucide-react";
import { Menu, MenuItem, IconButton, Divider, Snackbar, Alert } from "@mui/material"; // MUI Dropdown
import { UserAuthCheckContext } from '../../Context/UserAuthCheck'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ReportPopup from "../Reports/ReportPopup";
import { AllPostContextData } from "../../Context/AllPostContext";
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';


const PostOptions = ({
    postId, userId, pollId, onPostUpdate, post_user_id, allpost,setDeleting
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
    const open = Boolean(anchorEl);
    const { usertoken } = useContext(UserAuthCheckContext);
    const [report, setReport] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { setAllpost } = useContext(AllPostContextData);


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
        
        } catch (error) {
            console.error("Error editing post:", error);
            setSnackbar({ open: true, message: "Failed to update post!", type: "error" });
        }
        handleClose();
    };


    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        setDeleting(true);

        try {
            await axios.delete(`/api/posts/delete/${postId}/${usertoken.user.id}`);
            setAllpost((prevPosts) => prevPosts.filter((post) => post.post_id !== postId));

            setSnackbar({ open: true, message: "Post deleted successfully!", type: "success" });
            
        } catch (error) {
            console.error("Error deleting post:", error);
            setSnackbar({ open: true, message: "Failed to delete post!", type: "error" });
        }finally{
            setDeleting(false)
        }
        handleClose();
    };


    const handleSave = async () => {
        try {
            setAllpost((prevPosts) =>
                prevPosts.map((p) =>
                    p.post_id === postId ? { ...p, is_saved: !p.is_saved } : p
                )
            );

         const response =    await axios.post(`/api/posts/save/${postId}`, { userId });
            setSnackbar({ open: true, message: response.data.message, type: "success" });
        } catch (error) {
            console.error("Error saving post:", error);
            setSnackbar({ open: true, message: "Failed to save post!", type: "error" });
            setAllpost((prevPosts) =>
        prevPosts.map((p) =>
          p.post_id === postId ? { ...p, is_saved: !p.is_saved } : p
        )
      );
        }
        handleClose();
    };


    const handleReport = async () => {
        setReport(true);
        setSelectedId(post_user_id)
        handleClose();
    };


    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
        setSnackbar({ open: true, message: "Link copied to clipboard!", type: "success" });
        handleClose();
    };


    const handleHide = () => {
        setSnackbar({ open: true, message: "Post hidden!", type: "success" });
        handleClose();
    };


    return (
        <>

            <IconButton onClick={handleClick}>

                <Ellipsis color="var(--textcolor)" size={25} />
            </IconButton>


            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
                sx: { padding: "0.5rem 0", minWidth: "10rem" }
            }}
                PaperProps={{
                    sx: {
                        padding: "0.2rem",

                        minWidth: "12rem",
                        backgroundColor: "var(--backwhitecolor)",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                }}>
                {/* Edit Post */}
                {/* {usertoken.user.id === userId && (<MenuItem onClick={handleEdit}>
                    <EditNoteRoundedIcon size={18} style={{ marginRight: 8 }} /> Edit Post
                </MenuItem>)} */}


                {/* Delete Post */}
                {usertoken.user.id === userId && (<MenuItem onClick={handleDelete} sx={{color :'var(--textcolor)'}}> 
                    <DeleteForeverRoundedIcon size={18} style={{ marginRight: 8, color: "red" }} /> Delete Post
                </MenuItem>)}


                {usertoken.user.id === userId && <Divider   sx={{background :'var(--lightbackhovercolor)'}} />}



                {/* Save Post */}
                {usertoken.user.id !== userId && <MenuItem onClick={handleSave} sx={{color :'var(--textcolor)'}}>
              {allpost.is_saved ? (
                <>
                <BookmarkOutlinedIcon size={18} style={{ marginRight: 8 }}/> Unsaved
                </>

              ): (  <> 
                    <BookmarkAddOutlinedIcon size={18} style={{ marginRight: 8 }}  /> Save Post
                
                </>)}
                </MenuItem>}


                {usertoken.user.id !== userId && <Divider sx={{background :'var(--lightbackhovercolor)'}} />}

                {/* Copy Link */}
                <MenuItem onClick={handleCopyLink} sx={{color :'var(--textcolor)'}}>
                    <Link2 size={18} style={{ marginRight: 8 }} /> Copy Link
                </MenuItem>

                {/* Report Post */}
                {/* <MenuItem onClick={handleReport}>
                    <OutlinedFlagOutlinedIcon size={18} style={{ marginRight: 8, color: "orange" }} /> Report Post
                </MenuItem> */}


                {/* Hide Post */}

                {/* <MenuItem onClick={handleHide}>
                    <EyeOff size={18} style={{ marginRight: 8 }} /> Hide Post
                </MenuItem> */}
            </Menu>
            {/* Snackbar for Notifications */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ open: false })}>
                <Alert severity={snackbar.type}>{snackbar.message}</Alert>
            </Snackbar>
            {report && <ReportPopup reportedId={selectedId} reportingId={usertoken.user.id} sx={{color :'var(--textcolor)'}} onClose={() => {

                setReport(false)
                setSelectedId(null)
            }} />}
        </>
    );
};

export default PostOptions;
