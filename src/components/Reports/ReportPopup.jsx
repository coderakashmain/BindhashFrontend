import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import './ReportPopup.css';
import axios from 'axios';
import { UserAuthCheckContext } from '../../Context/UserAuthCheck';
import { SnackbarContext } from '../../Context/SnackbarContext';


export default function ReportPopup({ reportedId, reportingId, onClose, onSubmit }) {
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const {usertoken} = useContext(UserAuthCheckContext);
  const {setSnackbar}  = useContext(SnackbarContext);
  const [loading,setLoading] = useState(false);







  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post('/api/reports/subrandomchat', { userId: reportingId, reportedId: reportedId, reason, comment });

      setSnackbar({open : true ,message : response.data.message, type : 'success'})

      onClose()

    } catch (err) {
       
    }finally{
    setLoading(false);
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rpt-overlay"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        className="rpt-popup"
      >
        <h2  style={{position : 'relative'}} className="rpt-title">Report User

          
        </h2>
        <p className="rpt-subtext">Reporting user ID: <span>{reportedId}</span></p>

        <label className="rpt-label">Reason</label>
        <select
          value={reason}
          onChange={e => setReason(e.target.value)}
          className="rpt-select"
        >
          <option value="">Select a reason</option>
          <option value="spam">Spam</option>
          <option value="abuse">Abusive Behavior</option>
          <option value="harassment">Harassment</option>
          <option value="inappropriate">Inappropriate Content</option>
        </select>

        <label className="rpt-label">Additional Comments</label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="rpt-textarea"
          placeholder="Describe the issue (optional)..."
        />

        <div className="rpt-actions">
          <button onClick={onClose} className="rpt-btn rpt-cancel">Cancel</button>
          <button onClick={handleSubmit} disabled={!reason} className="rpt-btn rpt-submit">Submit</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
