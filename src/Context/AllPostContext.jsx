import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { UserAuthCheckContext } from './UserAuthCheck';

export const AllPostContextData = createContext();

const AllPostContext = ({ children }) => {
    const [allpost, setAllpost] = useState([]);
    const { usertoken } = useContext(UserAuthCheckContext);
    const [isLiked, setIsLiked] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef(null); 
    const [hasMore, setHasMore] = useState(true);


    const fetchPosts = async () => {
        if (loading) return;
        setLoading(true);

        try {
      
            const response = await axios.get(`/api/posts?userId=${usertoken.user.id}&page=${page}&limit=5`);

            if (response.data.length === 0) {
              setHasMore(false);  // ✅ Stop further fetching when no posts are returned
          } else {

            if (response.data && Array.isArray(response.data)) {
                setAllpost((prevPosts) => [...prevPosts, ...response.data]);

         
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
        if (!usertoken || !loaderRef.current || loading) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log("🔄 Loader is visible - Fetching more posts");
                fetchPosts();
            }
        }, { threshold: 1.0 });

        observer.observe(loaderRef.current);

        return () => observer.disconnect(); 
    }, [allpost, usertoken,hasMore]); 

    return (
        <AllPostContextData.Provider value={{ allpost, setAllpost, isLiked, setIsLiked, loading, loaderRef,hasMore }}>
            {children}
        </AllPostContextData.Provider>
    );
};

export default AllPostContext;
