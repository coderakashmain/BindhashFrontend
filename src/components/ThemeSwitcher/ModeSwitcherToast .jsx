import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { User, Ghost } from "lucide-react";
import axios from "axios";
import './ModeSwitcherToast .css';
import { SnackbarContext } from '../../Context/SnackbarContext';
import { useSocket } from "../../Context/SocketContext";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { useLocation } from "react-router-dom";

const ModeSwitcherToast = ({ mode ,loadingmode}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();
  const { setSnackbar } = useContext(SnackbarContext);
  const { usertoken ,setSocketChangge,socketChange} = useContext(UserAuthCheckContext);
  const location = useLocation()

  useEffect(() => {
    if (!mode || !['anonymous', 'self'].includes(mode) ||loadingmode) return;
    // if (usertoken?.user?.visibility === mode) return;

    setVisible(true);
    setLoading(true);

    const changeVisibility = async () => {
      try {
        const response = await axios.post('/api/auth/modeswitcher', { mode });

      
          const { userId, mode: updatedMode } = response.data;
          socket.emit('modeChange', { userId, mode: updatedMode });

          setSocketChangge(!socketChange)        
          setSnackbar({ type: 'success', message: `Switched to ${updatedMode} mode` });
          
        
      } catch (error) {
        console.error("Mode switch error:", error);
        setSnackbar({ type: 'error', message: 'Failed to switch mode' });
      } finally {
        setLoading(false);
        setTimeout(() => setVisible(false), 2000);
      }
    };

    changeVisibility();
  }, [mode]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="mode-toast"
          initial={{ opacity: 0}}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {mode === "anonymous" ? (
            <div className="anon-icon-box">
              <Ghost className="anon-icon anonymous-icon" />
              <span>Switched to Anonymous Mode</span>
            </div>
          ) : (
            <div className="anon-icon-box self-box">
              <User className="anon-icon self-icon" />
              <span>Switched to Self Mode</span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModeSwitcherToast;