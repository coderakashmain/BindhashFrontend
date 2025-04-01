import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserAuthCheckContext } from '../../Context/UserAuthCheck'
import dafaultprofilepic from '../../Photo/defaultprofilepic.png'
import './PostEditView.css'
import PhotoFilter from '../PhotoFilter/PhotoFilter'
import { Crop } from 'lucide-react'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import { MobileViewContext } from '../../Context/MobileResizeProvider'

const PostEditView = ({ postdata,setVideoselect,setMpostbtn, type, setShowCropper, setCroppedImage, setImage, setImageType, setVideopost, setVideoType }) => {
    const { usertoken } = useContext(UserAuthCheckContext);
    const [filterdmedia, setFilteredMedia] = useState('')
    const [mediaURL, setMediaURL] = useState(null);
    const [content, setContent] = useState("");
    const [showtext, setShowtext] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { isMobile } = useContext(MobileViewContext);
    const homevideoRef = useRef(null)



const handlevideoselect = ()=>{
    homevideoRef.current=document.querySelector('.home-vidoe-post-input');

    homevideoRef.current.click();

    console.log(homevideoRef.current)
}
    useEffect(() => {
       
            const objectURL = URL.createObjectURL(postdata);
            setMediaURL(objectURL);



            return () => URL.revokeObjectURL(objectURL);
       
    }, [postdata]);



    const handlePostSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        const formData = new FormData();
        formData.append("user_id", usertoken.user.id);
        formData.append("content", content);
        
        if (filterdmedia && type.startsWith('image')) {
            if (typeof filterdmedia === 'string') {

                const response = await fetch(filterdmedia);
                const blob = await response.blob();
                const file = new File([blob], "filtered_image.jpg", { type: blob.type });
                console.log(file)
                formData.append("media", file);
            } else {
                formData.append("media", filterdmedia);
            }
        }
        if(filterdmedia && type.startsWith('video')){
            formData.append("media", postdata);
            console.log(postdata)
           
        }

        setMpostbtn(false)

        try {
            await axios.post("/api/posts/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setContent("");
            setCroppedImage(null)
            setImage(null)
            setImageType(null)
            setUploading(false);
            setShowCropper(false)
            alert('sucess');
        } catch (err) {
            setUploading(false);
            console.error("Error creating post:", err);
            alert('error');
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}



                className='final-post-p'>
                <div className="final-post-p-box">
                    <div className="final-post-p-divice-one">



                        {isMobile && (<div className="final-post-p-u-d">
                            <div className="final-post-p-u-d-out">

                                <div className="final-post-p-u-d-img">
                                    <img src={usertoken?.user?.profile_pic || dafaultprofilepic} alt="User Profile" />


                                </div>
                                <span>{usertoken?.user?.username || "Unknown User"}</span>
                            </div>

                            <div className="final-post-p-u-d-right">
                                <Crop size="1.7rem" className='active' onClick={() => {
                                    if (type.startsWith("image")) {
                                        setShowCropper(true)
                                        
                                    }
                        
                                    if (type.startsWith("video")) {
                                        handlevideoselect();
                                  

                                    }
                                    
                                }} />
                                <button onClick={handlePostSubmit} className='final-p-s-btn'>
                                    {uploading ? <CircularProgress size="1.4rem" /> : ('Post')}

                                </button>
                            </div>
                        </div>)}
                        <div className="final-post-p-i-v">
                            {/* {type.startsWith("image") && <img src={URL.createObjectURL(postdata)} alt="Cropped" />}
                    {type.startsWith("video") && <video src={postdata} controls />} */}

                            {mediaURL && <PhotoFilter media={mediaURL} type={type} setFilteredMedia={setFilteredMedia} />}
                        </div>
                    </div>
                    <div className="final-post-p-divice-two">
                        {!isMobile && (<div className="final-post-p-u-d">
                            <div className="final-post-p-u-d-out">

                                <div className="final-post-p-u-d-img">
                                    <img src={usertoken?.user?.profile_pic || dafaultprofilepic} alt="User Profile" />


                                </div>
                                <span>{usertoken?.user?.username || "Unknown User"}</span>
                            </div>

                            <div className="final-post-p-u-d-right">
                                <Crop size="1.7rem" className='active' onClick={() => {
                                    if (type.startsWith("image")) {
                                        setShowCropper(true)

                                    }
                                    if (type.startsWith("video")) {
                                        handlevideoselect();
                                  

                                    }
                                }} />
                                <button onClick={handlePostSubmit} className='final-p-s-btn'>
                                    {uploading ? <CircularProgress size="1.4rem" /> : ('Post')}

                                </button>
                            </div>
                        </div>)}


                        <div className="final-p-text-content" style={{ marginTop : isMobile && type.startsWith("video") ?'1rem '  : ''}}>
                            {!showtext ? (<p onClick={() => setShowtext(!showtext)}>Add Text</p>) : (
                                <motion.textarea
                                    initial={{ y: '10%' }}
                                    animate={{ y: '0%' }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    placeholder="Write caption..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            )}

                        </div>
                        <div className="final-p-c-time-btn-box">
                            <button className="discard-btn" onClick={() => {
                                if (type.startsWith("image")) {
                                    setShowCropper(false)
                                    setCroppedImage(null)
                                    setImage(null)
                                    setImageType(null)
                                }else{
                                   
                                    setVideoselect(false)
                                    setVideoType(null)
                                    setVideopost(null)
                                }


                            }}>Discard</button>
                            <button className="post-later-btn">Post Later</button>
                            <button className="schedule-btn">Schedule Post</button>
                        </div>


                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default PostEditView
