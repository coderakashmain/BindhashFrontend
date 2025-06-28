import React, { useContext, useState, useRef, useEffect } from "react";
import { Search, PanelRightClose } from 'lucide-react'
import './UserSearch.css'
import { AllUserListContext } from "../../Context/AllUserList";
import defaultlogo from '../../Photo/defaultprofilepic.png'
import gsap from 'gsap'
import Followbtn from "../ProfileStats/Followbtn";
import SuggestedUsers from "../SuggestedUsers/SuggestedUsers";
import { MobileViewContext } from "../../Context/MobileResizeProvider";
import CombineAvatat from "../Avatar/CombineAvatat";
import { useLocation } from "react-router-dom";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { alluser } = useContext(AllUserListContext);
  const suggestionBoxRef = useRef(null);
  const [showsearch, setShowsearch] = useState(false);
  const userdearchoxRef = useRef(null);
  const { isMobile } = useContext(MobileViewContext);
  const debounceRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();


  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current); // clear previous timeout
    }


    if (searchQuery.length > 1) {
      setLoading(true);

      debounceRef.current = setTimeout(() => {
        const filteredUsers = alluser.filter(user =>
          user.username.toLowerCase().includes(searchQuery) && user.visibility !=="anonymous"
        );
        setResults(filteredUsers);
        setShowsearch(true)
        setLoading(false);
      }, 300);
    } else {
      setResults([]);
      setShowsearch(false);
      setLoading(false);

    }

  };

  useEffect(() => {
    if (!suggestionBoxRef.current) {
      console.error("suggestionBoxRef not present")
    }




    if (userdearchoxRef.current && !isMobile) {
      if (showsearch && query.length > 1) {
        gsap.fromTo(
          suggestionBoxRef.current,
          { y: "100%", opacity: 0, width: '0vw' },

          { y: "0%", minWidth: '35vw', opacity: 1, duration: 0.2, ease: "ease-in" }
        );
      } else {
        gsap.to(suggestionBoxRef.current, {
          y: "100%",
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          width: '0',
        });

      }
    }


  }, [results, showsearch]);

  const handleclose = () => {
    setShowsearch(false)
  }

  return (




    <div className="user-searchbox-box" ref={userdearchoxRef}>
      <div className="user-seachbox-div-search">



        <div className="user-suggesion-input-box">

          <button>

            <Search size={20} />
          </button>
          <input type="text" style={{padding : location.pathname === '/search' ? '01rem 0.5rem ' : ''}} placeholder="Search" value={query} onChange={handleSearch} />
          {/* <span>Search</span> */}

        </div>
        <div className={`searchbox-list-search scrollbar ${isMobile ? "mobile-s-p" : ''}`} ref={suggestionBoxRef} >

          {!isMobile && (<PanelRightClose onClick={handleclose} className="search-close-btn" />)}

          <h3 className="search-result-text">Results</h3>
          <ul>
              {loading && <li>Searching...</li>}
            {!loading && results.length > 0 ? (results.map((user) => (
              <li key={user.id} className="user-search-list-item">
                <div className="user-search-list-item-box">
                 
                  <CombineAvatat username = {user.username} profile_pic={user.profile_pic} visibility={user.visibility} size= "2.4rem"/>
                  <div className="user-search-user-name-box">
                    <p style={{fontWeight : 'bold'}}>@ {user.username}</p>
                  </div>
                </div>
           <Followbtn targetUserId={user.id} isFollowingInitial={user.isFollowing} />

              </li>
            ))) : (query.length > 0 && !loading && <li style={{ padding: '0rem 1rem', fontSize: '0.7rem' }}> No results found</li>)}
          </ul>
          <SuggestedUsers />
        </div>
      </div>


    </div>

  );
};

export default UserSearch;
