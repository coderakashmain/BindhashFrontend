import { useState } from "react";
import "./Createpost.css";
import { Helmet } from 'react-helmet'
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
} from "@mui/material";
import { ImagePlus } from "lucide-react";
import axios from "axios";

export default function CreatePost() {
    const [photo, setPhoto] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [postData, setPostData] = useState({
        title: "",
        description: "",
        category: "",
        lesson: "",
        feeling: "",
        advice: "",
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
        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("description", postData.description);
        formData.append("category", postData.category);
        formData.append("lesson", postData.lesson);
        formData.append("feeling", postData.feeling);
        formData.append("advice", postData.advice);
        formData.append("isAnonymous", isAnonymous);

        if (photo) {
            formData.append("photo", photo);
        }

        try {
            const response = await axios.post("/api/createfailpost", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Post submitted successfully:", response.data);
        } catch (error) {
            console.error("Error submitting post:", error);
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
                    <Typography variant="h5" align="center" gutterBottom>
                        Share Your Failure
                    </Typography>

                    <div className="form-group">
                        <TextField
                            fullWidth
                            label="Title (short)"
                            variant="outlined"
                            name="title"
                            value={postData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            fullWidth
                            label="What went wrong today?"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="description"
                            value={postData.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                name="category"
                                value={postData.category}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="business">Business</MenuItem>
                                <MenuItem value="exams">Exams</MenuItem>
                                <MenuItem value="startup">Startup</MenuItem>
                                <MenuItem value="mentalhealth">Mental Health</MenuItem>
                                <MenuItem value="love">Love</MenuItem>
                                <MenuItem value="fitness">Fitness</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="form-group">
                        <TextField
                            fullWidth
                            label="What did you learn?"
                            multiline
                            rows={3}
                            variant="outlined"
                            name="lesson"
                            value={postData.lesson}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            fullWidth
                            label="How are you feeling?"
                            variant="outlined"
                            name="feeling"
                            value={postData.feeling}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            fullWidth
                            label="Lesson Learned (optional)"
                            multiline
                            rows={2}
                            variant="outlined"
                            name="advice"
                            value={postData.advice}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group photo-upload">
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
                    </div>

                    <div className="form-group stranger-click">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isAnonymous}
                                    onChange={() => setIsAnonymous(!isAnonymous)}
                                    name="anonymous"
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
                    >
                        Post
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
