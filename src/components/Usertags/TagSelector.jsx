import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import './TagSelector.css'
import CircularProgress from '@mui/material/CircularProgress';
import { motion, AnimatePresence } from 'framer-motion'
import Subheadcomponent from "../Subheadcomponent/Subheadcomponent";

const TagSelector = ({ userId }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags] = useState([
    "#Coder",
    "#Photography",
    "#Gaming",
    "#Travel",
    "#Music",
    "#Sports",
    "#Foodie",
    "#Tech",
    "#Fashion",
    "#Nature",
    "#Movies",
    "#Art",
    "#Fitness",
    "#Health",
    "#Design",
    "#Business",
    "#Entrepreneur",
    "#Science",
    "#Lifestyle",
    "#Books",
    "#Education",
    "#Animals",
    "#Technology",
    "#Comedy",
    "#DIY"
  ]);
  const [loading, setLoading] = useState(true);
  const { usertoken } = useState(UserAuthCheckContext);
  const [showTagSelection, setShowTagSelection] = useState(false);
  const [tagloading, setTagloading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`/api/users/tags?user_id=${userId}`);
        setSelectedTags(response.data);

      } catch (error) {
        console.error("Error fetching tags:", error);
      }
      setLoading(false);
    };
    fetchTags();
  }, [userId]);

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const saveTags = async () => {
    setTagloading(true)
    try {
      await axios.post("/api/users/tags", { user_id: userId, tags: selectedTags });
      setShowTagSelection(false)
      setTagloading(false)
    } catch (error) {
      console.error("Error saving tags:", error);
      setTagloading(false)
    }
  };
  if (loading) return <p>Loading..</p>
  return (
    <div className="user-tags-container">

      <>
        {/* Selected Tags Display */}
        <div className="selected-tags">
          {selectedTags.length === 0 ? (
            <>
            </>
          ) : (
            selectedTags.map((tag, i) => <span key={i} className="tag selected">{tag}</span>)
          )}
          <button onClick={() => setShowTagSelection(true)} className="add-tags-btn">
            + Add Tags
          </button>
        </div>

        {/* Tag Selection Modal */}
        <AnimatePresence>
          {showTagSelection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="tag-selection-modal-back">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="tag-selection-modal">
                  <Subheadcomponent headline="Select Your Interests" logo = {false} onClose={()=>setShowTagSelection(false)}/>
                <div className="tag-selection">
                  {allTags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => handleTagClick(tag)}
                      className={`tag-option ${selectedTags.includes(tag) ? "active" : ""}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <button disabled={tagloading} style={{ opacity: tagloading ? '0.5' : '1' }} onClick={saveTags} className="save-btn">
                  Save

                </button>
                <button onClick={() => setShowTagSelection(false)} className="cancel-btn">Cancel</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>

    </div>
  );
};

export default TagSelector;