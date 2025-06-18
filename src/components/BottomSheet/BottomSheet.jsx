import { motion, useMotionValue, useSpring ,AnimatePresence} from "framer-motion";
import { useContext, useEffect, useState } from "react";
import './BottomSheet.css';
import PostContent from "../Post/PostContent";
import PostModel from "../Post/PostModel";
import Bangbox from "../Bangbox/Bangbox";
import { MobileViewContext } from "../../Context/MobileResizeProvider";

const BottomSheet = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const {isMobile} = useContext(MobileViewContext)



  useEffect(() => {
    if (isOpen) {
    setTimeout(() => setIsVisible(true), 100);
   
    } else {

      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;




  return (
    <>
   
      <AnimatePresence> 
     
      <motion.div
      className="bottom-sheet"
      initial ={ !isMobile ? {y : '100%'} : {x : '-100%', scale : 0.8}}
       animate={!isMobile ? {y : '0%'}:{x : isOpen ? 0  : '-100%' , scale : 1}}
       exit={!isMobile ? {y : '100%'} : {x : '-100%' , scale : 0.8}}
       transition={{duration : 0.3}}


      >





        <header
          className="bottom-sheet-header"

        >
          <h4>Post</h4>
          <Bangbox size={'1.5rem'} click={true} />
          <button onClick={() => {
            onClose()




          }} className="" style={{ margin: 10 ,cursor : 'pointer'}}>
            Back
          </button>
        </header>


        {/* Content */}
        <div
          style={{
            overflowY: "auto",
            scrollbarWidth: 'none',
            height: "calc(100% - 50px)",
          }}
        >


          {children}
        </div>
      </motion.div>
      </AnimatePresence>
    </>
  );
};

export default BottomSheet;
