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
import { useLocation, useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();
    const location = useLocation();



  

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

                        <div className="home-post-box-upload" style={{ display: 'block', padding: '0rem 1rem' }} >

                            <div className="home-post-button-box">
                                {location.pathname !== '/createpost' && (   <button onClick={()=>navigate('/createpost')}>Failure Post</button>)}
                             
                                <ImageUploader setMpostbtn={setMpostbtn}  />
                                <input type="file"
                                    ref={videouploadRef}
                                    onChange={handlevideoChangeinput}
                                    accept="video/*"
                                    style={{ display: "none" }}
                                    className=" home-vidoe-post-input"
                                />
                                <button onClick={videobtnclick} className="home-post-button-box-video"><Video size={18} className="home-upload-icon" />Video</button>

                                {/* <button className="home-post-button-box-story" onClick={() => {

                                
                                    setPollcreation(true)
                                }}>
                                    <DiamondPlus size={18} className="home-upload-icon" />Poll</button>
                                {pollcreation && <PollCreate pollcreation={pollcreation} onClose={() => setPollcreation(false)} />} */}
                            </div>

                        </div>

                    </motion.div>
                 
                </motion.div>)}
                {videoselect && <PostEditView setMpostbtn={setMpostbtn} setVideoselect={setVideoselect} setVideopost={setVideopost} setVideoType={setVideoType} postdata={videopost} type={videotype} />}
                </>
   
    )
}

export default PostFunctionComponent
