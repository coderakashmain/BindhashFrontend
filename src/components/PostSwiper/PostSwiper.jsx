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
import CombineAvatat from "../Avatar/CombineAvatat";
import axios from "axios";
import { UserPostListDataContext } from "../../Context/UserPostListContext";
import PostContent from "../Post/PostContent";
const PostSwiper = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { allpost } = useContext(AllPostContextData);
  const { usertoken } = useContext(UserAuthCheckContext);
  
  const {userpost,setUserpost} = useContext(UserPostListDataContext)












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

            {userpost.length > 0 ? 
              (
                // <PostContent allpost={userpost} setAllpost={setUserpost} moreload={false}/>
                'Update Soon'
           
              )
            : (
              <>
                <h2> All Posts</h2>
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
