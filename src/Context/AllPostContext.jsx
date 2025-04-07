import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { UserAuthCheckContext } from './UserAuthCheck';
import { useNavigate } from 'react-router-dom';

export const AllPostContextData = createContext();

const AllPostContext = ({ children }) => {
    const [allpost, setAllpost] = useState([]);
    const { usertoken } = useContext(UserAuthCheckContext);
    const [isLiked, setIsLiked] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef(null); 
    const [hasMore, setHasMore] = useState(true);
    const [totalUserPost, setTotalUserPost] = useState(0);
    const navigate = useNavigate()


    const fetchPosts = async () => {
        if (loading) return;
        setLoading(true);

        try {
      
            const response = await axios.get(`/api/posts?userId=${usertoken.user.id}&page=${page}&limit=5`);

            if (response.data.length === 0) {
              setHasMore(false);  
          } else {

            if (response.data && Array.isArray(response.data)) {
                setAllpost((prev) => {
                    // Merge and remove duplicates based on post_id or poll_id
                    const combined = [...prev, ...response.data];
                    
                    const uniquePosts = Array.from(new Map(
                      combined.map(item => [
                        item.post_id ? `post-${item.post_id}` : `poll-${item.poll_id}`, 
                        item
                      ])
                    ).values());
              
                    return uniquePosts;
                  });

         
                const likesState = {};
                response.data.forEach((post) => {
                    likesState[post.post_id] = post.is_liked || false;
                });
                setIsLiked((prev) => ({ ...prev, ...likesState }));

                setPage((prevPage) => prevPage + 1);  
            }
          }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        setLoading(false);
    };


    useEffect(() => {
        if (usertoken && usertoken.user && usertoken.user.id) {
            setAllpost([]);  // Clear old posts
            setPage(1);      // Reset page
            setHasMore(true); // Reset hasMore
            fetchPosts(true); // Initial load
        }
    }, [usertoken]);



    useEffect(() => {
        if (allpost.length > 0) {
            const userPosts = allpost.filter(post => post.post_user_id === usertoken.user.id);
            const postCount = userPosts.length > 0 ? userPosts[0].post_count : 0;
            setTotalUserPost(postCount);
        } else {
            setTotalUserPost(0);
        }
    }, [allpost, usertoken]); 



    useEffect(() => {
        if (!usertoken || !loaderRef.current || loading) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchPosts();
            }
        }, { threshold: 1.0 });

        observer.observe(loaderRef.current);

        return () => observer.disconnect(); 
    }, [allpost, usertoken,hasMore]); 

    return (
        <AllPostContextData.Provider value={{ allpost, setAllpost, isLiked, setIsLiked, loading, loaderRef,hasMore,totalUserPost }}>
            {children}
        </AllPostContextData.Provider>
    );
};

export default AllPostContext;
