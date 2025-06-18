import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { User, Heart, Bookmark } from "lucide-react";
import "./PostSwiper.css"; // Import CSS
import { AllPostContextData } from "../../Context/AllPostContext";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";

const PostSwiper = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {allpost} = useContext(AllPostContextData);
  const { usertoken } = useContext(UserAuthCheckContext);
  const[userpost,setUserpost] = useState([])

  useEffect(() => {
    if (allpost.length > 0 && usertoken?.user?.id) {
      const userPosts = allpost.filter((post) => post.post_user_id === usertoken.user.id);
      setUserpost(userPosts);
    }
  }, [allpost, usertoken]);
  





  

  return (
    <div className="post-swiper-container">
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <div className={`tab ${activeTab === 0 ? "active" : ""}`} onClick={() => setActiveTab(0)}>
          <User size={20} /> <span>All </span>
        </div>
        <div className={`tab ${activeTab === 1 ? "active" : ""}`} onClick={() => setActiveTab(1)}>
          <Heart size={20} /> <span>Liked </span>
        </div>
        <div className={`tab ${activeTab === 2 ? "active" : ""}`} onClick={() => setActiveTab(2)}>
          <Bookmark size={20} /> <span>Saved </span>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        className="swiper-container"
        pagination={{ clickable: true }}
      >
        {/* All Posts */}
        <SwiperSlide>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="post-content"
          > 
          
          { userpost.length > 0 ? userpost.map((post) => (
        
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="post-content"
              >
                <div className="post-header">
                  <img src={post.post_user_pic} alt={post.post_username} className="profile-pic" />
                  <h3>{post.post_username}</h3>
                </div>
                <p className="post-text">{post.content}</p>
                <div className="post-stats">
                  <span>❤️ {post.like_count}</span>
                  <span>💬 {post.comments?.length || 0}</span>
                </div>
              </motion.div>
         
          )) : (
            <>
            <h2>📢 All Posts</h2>
            <p>Here are all your posts.</p>
            </>
          )}
    

            
          </motion.div>
        </SwiperSlide>

        {/* Liked Posts */}
        <SwiperSlide>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="post-content"
          >
            <h2>❤️ Liked Posts</h2>
            <p>Posts that you have liked.</p>
          </motion.div>
        </SwiperSlide>

        {/* Saved Posts */}
        <SwiperSlide>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="post-content"
          >
            <h2>Saved Posts</h2>
            <p>Posts that you have saved.</p>
          </motion.div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PostSwiper;
