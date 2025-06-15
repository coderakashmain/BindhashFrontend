import React, { useContext, useEffect, useRef, useState } from 'react'
import Time from '../Time/Time'
import Followbtn from '../ProfileStats/Followbtn'
import PollView from '../Poll/PollView'
import defaultprofilephoto from '../../Photo/defaultprofilepic.png'
import { ThumbsUp, MessageCircle, Share2, ScanEye, Album, Heart, Forward, MessageSquare } from 'lucide-react'
import PostModel from './PostModel'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { UserAuthCheckContext } from '../../Context/UserAuthCheck'
import PostOptions from '../PostOptions/PostOptions'
import VideoPost from '../../pages/Home/VideoPost'
import axios from 'axios'
import { AllPostContextData } from '../../Context/AllPostContext'
import { AnimatePresence, motion } from 'framer-motion'
import BottomSheet from '../BottomSheet/BottomSheet'

const PostContent = ({ feed }) => {
  const [imgloaded, setImgLoaded] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { usertoken } = useContext(UserAuthCheckContext)
  const { setIsLiked, loading, loaderRef, fetchPosts, hasMore, isLiked, setAllpost, allpost } = useContext(AllPostContextData)
  const [isExpanded, setIsExpanded] = useState(false);
   const [showSheet, setshowSheet] = useState(false);
   const [feeddata, setFeedData] = useState([]);

  useEffect(() => {
    if (loaderRef.current) {
      fetchPosts();
    }

  }, [loaderRef.current])


  const handleLike = async (postId) => {

    if (!usertoken) {
      navigate('/login')
    } else {
      try {
        const response = await axios.post("/api/posts/like", {
          user_id: usertoken.user.id,
          post_id: postId,
        });

        setAllpost((prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === postId
              ? { ...post, like_count: post.like_count + response.data.change }
              : post
          )
        );

        // ✅ Store liked status for UI toggle
        setIsLiked((prevLiked) => ({
          ...prevLiked,
          [postId]: response.data.liked, // Store liked status as true/false
        }));

      } catch (error) {
        console.error("Error liking post:", error);
      }
    }

  };




  const placeholderimg = (image) => {
    const placeholder = image.replace("/upload/", "/upload/w_1000,h_1000,c_fill,e_blur:200/");


    return placeholder
  }

  

  return (
    <>
      {feed.map((allpost) => (
        allpost.type === "post" ? (
          <div key={`post-${allpost.post_id}`} className="post"
            

          >
    

            <div className="post-header">
              <div className="post-header-user">
                <img
                  src={allpost.post_user_pic ? allpost.post_user_pic : defaultprofilephoto}
                  alt="Profile"
                  className="profile-pic"

                />
                <div className="post-header-username-box">
                  <h3>{allpost.post_username}</h3>
                  {<Time posttime={allpost.created_at} />}

                </div>
              </div>
              <div className="post-header-edit">

                
                <PostOptions  userId={allpost.post_user_id} postId={allpost.post_id} pollId={allpost.poll_id} />
              </div>

            </div>
            <div className={`home-post-contnt-box-out ${allpost.image ? 'post-head-content-box-true' : 'post-head-content-box-false'}`}>
              {allpost.content && (<p className="home-post-contnt">{allpost.content}</p>)}

            </div>


            <>
              <div className="post-head-img-box">

                {allpost.image && allpost.media_type === 'image' ? (<>
                  <img
                    src={placeholderimg(allpost.image)}
                    loading='lazy'
                    alt="Post"
                    className={`post-image ${imgloaded ? "hidden" : "visible"}`}
                  />


                  <img
                    src={allpost.image}

                    loading="lazy"
                    alt="Post"
                    className={`post-image ${imgloaded ? "visible" : "blurred"}`}
                    onLoad={() => setImgLoaded(true)}

                  />

                </>) : (allpost.media_type === "video" &&

                  <VideoPost postId={allpost.post_id} />
                )}
              </div>


            </>






            <div className="post-actions">
              <div className="post-action-left">

                <button
                  onClick={() => handleLike(allpost.post_id)}
                  className={isLiked[allpost.post_id] ? "liked" : ""}
                >

                  <Heart size={20} color={isLiked[allpost.post_id] ? "#007BFF" : "var(--textcolor)"} /> {allpost.like_count} Like
                </button>
                <button>

                  <MessageSquare size={20}   onClick={() =>{
                    setshowSheet(true);

                    // console.log(allpost)
                    setSelectedPostId(allpost.post_id)
                  }
                  } 
                  
                    
                    />
                  {allpost.comments.filter(comment =>  comment.parent_comment_id === null).length} Comments
                </button>

                <button><Forward size={20} /> Share</button>
              </div>
              <div className="post-action-right">
                {/* <button>     <ScanEye size={20} /></button> */}

                <button>

                  <Album size={20} />Save
                </button>
              </div>

            </div>



          </div>
        ) : (
          <PollView key={`poll-${allpost.poll_id}`} pollId={allpost.poll_id} />
        )
      ))}




    <div ref={loaderRef} className="loader" style={{ marginBottom: '4rem' }}>
        {loading && hasMore && allpost.length > 0 && (
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <CircularProgress color="black" />
          </Box>
        )}

      </div>

       <AnimatePresence>  

        <BottomSheet isOpen={showSheet}  onClose={() => setshowSheet(false)}>
                   {selectedPostId &&( <PostModel postId={selectedPostId}/> )}
        </BottomSheet>

      </AnimatePresence>
    </>
  )
}

export default PostContent
