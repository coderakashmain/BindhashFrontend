import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import './BottomSheet.css'; 
import PostContent from "../Post/PostContent";
import PostModel from "../Post/PostModel";
import Bangbox from "../Bangbox/Bangbox";

const BottomSheet = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  // X motion value instead of Y
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 400;
  const hiddenX = -screenWidth; // start fully left
  
  const visibleX = 0;

  const x = useMotionValue(hiddenX);
  const scale = useMotionValue(0.8); // start with smaller scale
  const xSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const scaleSpring = useSpring(scale, { stiffness: 400, damping: 40 });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        x.set(visibleX);
        scale.set(1);
      });
    } else {
      x.set(hiddenX);
      scale.set(0.9);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      
      {/* <motion.div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "white",
          zIndex: 9,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      /> */}

      {/* Side Panel */}
      <motion.div
        style={{
          x: xSpring,
          scale: scaleSpring,
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          padding: "0px 0px",
          background: "var(--backwhitecolor)",
          zIndex: 10,
          boxShadow: "4px 0 20px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      // transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >




        {/* Drag Handle (optional) */}
        <header
        className="bottom-sheet-header"
          
        >
          <h4>Post</h4>
          <Bangbox size={'1.5rem'} click={true} />
          <button onClick={ () => {
            onClose() 
          
             
            
            
           }} className="" style={{ margin: 10 }}>
            Back
          </button>
        </header>


        {/* Content */}
        <div
          style={{
            overflowY: "auto",
            scrollbarWidth : 'none',
            height: "calc(100% - 50px)",
          }}
        >

          
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default BottomSheet;
