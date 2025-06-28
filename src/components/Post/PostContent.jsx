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
import CombineAvatat from '../Avatar/CombineAvatat'
import TruncatedText from '../TextReducer/TruncatedText'
import { Chip } from '@mui/material'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { SnackbarContext } from '../../Context/SnackbarContext'
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';


const PostContent = ({loading, loaderRef, fetchPosts, hasMore, setAllpost, allpost, moreload = true }) => {
  const [imgloaded, setImgLoaded] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { usertoken } = useContext(UserAuthCheckContext)
  const [showSheet, setshowSheet] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext)
  const [deleting,setDeleting] = useState(false);

  useEffect(() => {
    if (loaderRef.current) {
      fetchPosts();
    }

  }, [loaderRef.current])



  



const handleLike = async (postId) => {



  setAllpost((prevPosts) =>
    prevPosts.map((post) => {
      if (post.post_id === postId) {
        const wasLiked = post.is_liked;
    
        return {
          ...post,
          like_count: post.like_count + (wasLiked ? -1 : 1),
          is_liked: !wasLiked,
        };
      }
      return post;
    })
  );

  try {
    // Actual server request
    await axios.post("/api/posts/like", {
      user_id: usertoken.user.id,
      post_id: postId,
    });
  } catch (error) {
    console.error("Error liking post:", error);

    // Rollback on failure
    setAllpost((prevPosts) =>
      prevPosts.map((post) => {
        if (post.post_id === postId) {
          const wasLiked = post.is_liked;
          return {
            ...post,
            like_count: post.like_count + (wasLiked ? -1 : 1),
            is_liked: !wasLiked,
          };
        }
        return post;
      })
    );
  }
};





  const placeholderimg = (image) => {
    const placeholder = image.replace("/upload/", "/upload/w_1000,h_1000,c_fill,e_blur:200/");


    return placeholder
  }

  const handleShareClick = (post) => {
    console.log(post)
    const postId = post.post_id;
    let postPath = `/post/${postId}`;

    if (post.title && post.title.trim() !== "") {
      const titleSlug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .substring(0, 60);

      postPath = `/post/${postId}-${titleSlug}`;
    }

    const fullUrl = `${window.location.origin}${postPath}`;

    // Copy to clipboard
    navigator.clipboard.writeText(fullUrl).then(() => {
      console.log("Link copied:", fullUrl);
    });

    // Web share API
    if (navigator.share) {
      navigator
        .share({
          title: post.title || "BindHash Post",
          text: "Check out this post on BindHash",
          url: fullUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((err) => console.error("Share failed:", err));
    } else {
      alert("Link copied! Share it anywhere.");
    }
  };

  const handleSave = async (postId) => {
    try {
      setAllpost((prevPosts) =>
        prevPosts.map((p) =>
          p.post_id === postId ? { ...p, is_saved: !p.is_saved } : p
        )
      );

      const response = await axios.post(`/api/posts/save/${postId}`, { userId: usertoken.user.id });
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

  };



  return (
    <>
      {allpost.map((allpost) => (
        allpost.type === "post" ? (
          <motion.div key={`post-${allpost.post_id}`} className="post"
          initial ={{y : 30, opacity : 0}}
          animate ={{y : 0, opacity : 1}}
          exit ={{y : 30, opacity : 0}}
          transition={{duration : 0.2}}


          >
            

            <div className="post-header">
              <div className="post-header-user">

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                  <CombineAvatat username={allpost.post_username} profile_pic={allpost.post_user_pic} size='2.7rem' visibility={allpost.post_visibility} />
                </div>
                <div className="post-header-username-box">
                  <h3>{allpost.post_username}</h3>
                  <div className="post-header-catetory-box">
                    {allpost.category && (<Chip
                      label={allpost.category}

                      size="small"
                      sx={{ backgroundColor: ' var(--light-blue-color)', color: "red", padding: '0px 7px', fontSize: '12px', fontWeight: 'bold' }}
                      className="post-chip"
                    />)}

                    {<Time posttime={allpost.created_at} />}
                  </div>

                </div>
              </div>
              <div className="post-header-edit">


                <PostOptions setDeleting={setDeleting} allpost={allpost} userId={allpost.post_user_id} post_user_id={allpost.post_user_id} postId={allpost.post_id} pollId={allpost.poll_id} />
              </div>

            </div>
            <div className={`home-post-contnt-box-out ${allpost.image ? 'post-head-content-box-true' : 'post-head-content-box-false'}`}>
              {allpost.title && (<header style={{ fontSize: '0.99rem', textAlign: "center", fontWeight: '600', color: 'var(--textcolor)' }}>{allpost.title}</header>)}
              {allpost.content && (<aside className="home-post-contnt"> <TruncatedText text={allpost.content} limit={500} /></aside>)}

            </div>


            <>
              <div className={`post-head-img-box ${allpost.image &&'post-media-present'}`}>

                {allpost.image && allpost.media_type === 'image' ? (<>
                  
                  {/* <img
                    src={placeholderimg(allpost.image)}
                    loading='lazy'
                    alt="Post"
                    className={`post-image ${imgloaded ? "hidden" : "visible"}`}
                  /> */}


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
                  className={allpost.is_liked ? "liked " : ""}

                >

                  {/* <Heart size={20} color={allpost.is_liked ? "#007BFF" : "var(--textcolor)"} /> {allpost.like_count} Like */}
                   {allpost.is_liked ? <FavoriteOutlinedIcon sx={{color : "#007BFF"}}  size={16}  />  : <Heart size={20}   />} {allpost.like_count} Like
                </button>
                <button onClick={() => {
                  setshowSheet(true);


                  setSelectedPostId(allpost.post_id)
                }
                }
                  className='active'
                >

                  <MessageSquare size={20}

                  />
                  {allpost.comments.filter(comment => comment.parent_comment_id === null).length} Comments
                </button>

                <button className='active' onClick={() => handleShareClick(allpost)}><Forward size={20} /> Share</button>
              </div>
              <div className="post-action-right">


                <button className='active' onClick={() => handleSave(allpost.post_id)}>

                  {allpost.is_saved ? <BookmarkOutlinedIcon size={20} /> : <BookmarkAddOutlinedIcon size={20} />}
                </button>
              </div>

            </div>



          </motion.div>
        ) : (
          <PollView key={`poll-${allpost.poll_id}`} pollId={allpost.poll_id} />
        )
      ))}



      {moreload && (
        <div ref={loaderRef} className="loader" style={{ marginBottom: '4rem' }}>
          {loading && hasMore && allpost.length > 0 && (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <CircularProgress color="black" />
              
            </Box>
          )}

        </div>)}

      <AnimatePresence>

        <BottomSheet isOpen={showSheet} onClose={() => setshowSheet(false)}>
          {selectedPostId && (<PostModel postId={selectedPostId} />)}
        </BottomSheet>

      </AnimatePresence>
    </>
  )
}

export default PostContent
