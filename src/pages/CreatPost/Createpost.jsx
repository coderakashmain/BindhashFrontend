import { useContext, useState, useEffect } from "react";
import "./Createpost.css";
import { Helmet } from 'react-helmet'
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';

import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Card,
    CardContent,
    Typography,
    Checkbox,
    FormControlLabel,
    Tooltip,
} from "@mui/material";
import { ImagePlus } from "lucide-react";
import axios from "axios";
import CombineAvatat from '../../components/Avatar/CombineAvatat'

import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { SnackbarContext } from "../../Context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import PostFunctionComponent from "../../components/PostFuctionComponent/PostFunctionComponent";
import { AnimatePresence } from "framer-motion";



export default function CreatePost() {
    const [photo, setPhoto] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const { usertoken } = useContext(UserAuthCheckContext);
    const [loading, setLoading] = useState(false);
    const { setSnackbar } = useContext(SnackbarContext);
    const [mpostbtn, setMpostbtn] = useState(false);
    const navigate = useNavigate();


    const [postData, setPostData] = useState({
        title: "",
        description: "",
        category: ""
    });

    const handlePhotoChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setPhoto(files[0]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value,
        });
    };

    const handlePostSubmit = async () => {

        setLoading(true)

        if (!postData.title || !postData.description || !postData.category) {
            setLoading(false)
            return;
        }

        // const formData = new FormData();
        // formData.append("title", postData.title);
        // formData.append("description", postData.description);
        // formData.append("category", postData.category);
        // formData.append("isAnonymous", isAnonymous);



        try {
            const response = await axios.post("/api/posts/text/createfailpost", {
                title: postData.title,
                description: postData.description,
                category: postData.category,
                isAnonymous: isAnonymous,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Post submitted successfully:", response.data);
            setSnackbar({ open: true, message: 'Post Successfully', type: 'success' })
            navigate('/')
        } catch (error) {
            console.error("Error submitting post:", error);
            setSnackbar({ open: true, message: "Error submitting post", type: 'error' })
        }
        finally {
            setLoading(false)
        }
    };



    return (
        <div className="create-post-container">
            <Helmet>
                <title>Create Post – Share Freely | Bindhash</title>
                <meta
                    name="description"
                    content="Share your story, experience, or failure anonymously or with your identity on Bindhash. Express yourself and connect with others who relate."
                />
            </Helmet>
            <Card className="create-post-card">
                <CardContent>
                    <div className="creat-post-header">
                        <div className="creat-post-header-l">
                            <CombineAvatat username={usertoken.user.username} profile_pic={usertoken.user.profile_pic} visibility={usertoken.user.visibility} size="2.5rem" />
                            <h3>{usertoken.user.username}</h3>

                        </div>
                        <div className="creat-post-header-r">
                            <Tooltip title="Poll post">

                                <AddToPhotosRoundedIcon onClick={() => setMpostbtn(true)} className="create-post-icon active" />
                            </Tooltip>

                        </div>

                    </div>

                    <div className="form-group">

                        <input
                            id="title"
                            placeholder="Title"
                            name="title"
                            value={postData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <textarea

                            sx={{ background: 'var(--backwhitecolor)' }}
                            placeholder="What went wrong today?"

                            rows={4}
                            name="description"
                            value={postData.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <FormControl fullWidth>
                            <InputLabel
                                sx={{
                                    color: '#666',
                                    '&.Mui-focused': {
                                        color: '#2890e1', // focus color
                                    },
                                }}
                            >
                                Category
                            </InputLabel>

                            <Select
                                label="Category"
                                name="category"
                                value={postData.category}
                                onChange={handleInputChange}
                                sx={{
                                    background: 'var(--backwhitecolor)',
                                    borderRadius: '0.3rem',
                                    boxShadow: ' var( --creat-post-shadow)',
                                    outline: 'none',
                                    border: 'none',
                                    color: 'var(--textcolor)',
                                    '& fieldset': {
                                        border: 'none',
                                    },

                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: 'var(--backwhitecolor)',
                                            color: 'var(--blacktextcolor)',
                                            borderRadius: 2,
                                        },
                                    },
                                }}
                            >
                                {[
                                    { value: 'business', label: 'Business' },
                                    { value: 'exams', label: 'Exams' },
                                    { value: 'startup', label: 'Startup' },
                                    { value: 'mentalhealth', label: 'Mental Health' },
                                    { value: 'love', label: 'Love' },
                                    { value: 'fitness', label: 'Fitness' },
                                    { value: 'other', label: 'Other' },
                                ].map((item) => (
                                    <MenuItem
                                        key={item.value}
                                        value={item.value}
                                        sx={{
                                            backgroundColor: 'transparent',
                                            '&:hover': {
                                                backgroundColor: 'var(--lightbackcolor)', // light blue on hover
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: '#cce4ff', // blue when selected
                                                color: '#003366',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </div>



                    {/* <div className="form-group photo-upload">
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<ImagePlus size={20} />}
                            fullWidth
                        >
                            {photo ? photo.name : "Upload Photo"}
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handlePhotoChange}
                            />
                        </Button>
                    </div> */}

                    <div className="form-group stranger-click">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={
                                        usertoken.user.visibility === 'anonymous' ? true : isAnonymous
                                    }
                                    onChange={() => {
                       
                                        if (usertoken.user.visibility !== 'anonymous') {
                                            setIsAnonymous(!isAnonymous);
                                        }
                                    }}
                                    onClick={()=>{

                                        console.log('ruuning')
                                        if(usertoken.user.visibility === 'anonymous'){
                                             setSnackbar({open : true, message : 'Switch to Self mode to Change Visibility!', type : 'warning'})
                                        }
                                    }}
                                   
                                    name="anonymous"
                                    style={{ color: 'var(--blue-color)' }}

                                />
                            }
                            label="Post Anonymously"
                        />
                        <p>( Your photo and name do not show to anyone )</p>
                    </div>

                    <Button
                        className="submit-btn"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handlePostSubmit}
                        disabled={loading}

                    >
                        Post
                    </Button>
                    <AnimatePresence>
                        {mpostbtn && (
                            <PostFunctionComponent widthsize='40rem' mpostbtn={mpostbtn} setMpostbtn={setMpostbtn} />
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}

