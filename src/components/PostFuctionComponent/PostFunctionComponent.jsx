import React, { useState, useEffect, useRef, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageUploader from '../Post/ImageUploader';
import PostEditView from '../Post/PostEditView';
import '../../pages/Home/Home.css'
import PollCreate from '../Poll/PollCreate';
import { Video, CircleFadingPlus, DiamondPlus } from 'lucide-react'
import StorySection from '../Story/StorySection';
import { MobileViewContext } from '../../Context/MobileResizeProvider';
import { UserAuthCheckContext } from '../../Context/UserAuthCheck';
import axios from 'axios';


const PostFunctionComponent = ({ mpostbtn, setMpostbtn ,widthsize }) => {
    const [content, setContent] = useState("");
    const [videopost, setVideopost] = useState(null);
    const videouploadRef = useRef();
    const [videotype, setVideoType] = useState(null);
    const [pollcreation, setPollcreation] = useState(false);
    const [storymodeltrue, setstorymodeltrue] = useState(false)
    const [videoselect, setVideoselect] = useState(false);
    const {isMobile} = useContext(MobileViewContext)
    const {usertoken} = useContext(UserAuthCheckContext);



    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        setMpostbtn(false)
    
        try {
          await axios.post("/api/posts/text/create", {user_id : usertoken.user.id,content});
    
          alert('sucess');
          setContent('')
        } catch (err) {
          console.error("Error creating post:", err);
          alert('error');
        }
      };
    const handlecontendChange = (e) => {
        const contentValue = e.target.value;
        setContent(contentValue);

    }


    const videobtnclick = () => {

        if (videouploadRef.current) {
          
            videouploadRef.current.click();
        
        }

    };

    
    const handlevideoChangeinput = (event) => {
        
        
        const file = event.target.files[0];
        console.log(file)

        setVideopost(file);
        setVideoType(file.type);
        setVideoselect(true)
 
   


    }
    const hanldestorymodel = () => {
        setstorymodeltrue(true)

    }
 
    return (

            <>
           
            {mpostbtn && (

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: mpostbtn ? 1 : 0 }}
                    exit={{ backdropFilter: "blur(0px)" }}
                    
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                   
                    onClick={() => setMpostbtn(false)}

                    className='mobile-upload-s'>
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: mpostbtn ? "0" : "100%" }}
                        exit={{ y: "100%" }}
                        style={{width : !isMobile && widthsize ? widthsize : '100%'}}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        onClick={(event) => event.stopPropagation()}
                        className="mobile-upload-s-i">

                        <StorySection storymodeltrue={storymodeltrue} setstorymodeltrue={setstorymodeltrue} />
                        <div className="home-post-box-upload" style={{ display: 'block', padding: '0rem 1rem' }} >

                            <form onSubmit={handlePostSubmit} className="home-post-type-box">
                                <input type="text" name="post" placeholder="Write a post" value={content} onChange={handlecontendChange} />
                                <button className="button" type="submit">Post</button>
                             
                            </form>

                            <div className="home-post-button-box">
                                <ImageUploader setMpostbtn={setMpostbtn}  />
                                <input type="file"
                                    ref={videouploadRef}
                                    onChange={handlevideoChangeinput}
                                    accept="video/*"
                                    style={{ display: "none" }}
                                    className=" home-vidoe-post-input"
                                />
                                <button onClick={videobtnclick} className="home-post-button-box-video"><Video size={18} className="home-upload-icon" />Video</button>

                                <button onClick={hanldestorymodel} className="home-post-button-box-story"><CircleFadingPlus size={18} className="home-upload-icon" />Story</button>
                                <button className="home-post-button-box-story" onClick={() => {

                                    // setMpostbtn(false)
                                    setPollcreation(true)
                                }}>
                                    <DiamondPlus size={18} className="home-upload-icon" />Poll</button>
                                {pollcreation && <PollCreate pollcreation={pollcreation} onClose={() => setPollcreation(false)} />}
                            </div>

                        </div>

                    </motion.div>
                 
                </motion.div>)}
                {videoselect && <PostEditView setMpostbtn={setMpostbtn} setVideoselect={setVideoselect} setVideopost={setVideopost} setVideoType={setVideoType} postdata={videopost} type={videotype} />}
                </>
   
    )
}

export default PostFunctionComponent
