import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItemButton
} from "@mui/material"; // <-- Notice ListItemButton is imported
import { ArrowRightLeft, Search } from "lucide-react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import './Newaccount.css';
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import defaultprofilepic from '../../Photo/defaultprofilepic.png';


const Newaccount = ({ setShowsearch, showsearch }) => {
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const { usertoken } = useContext(UserAuthCheckContext);
  const navigate = useNavigate();
  const location = useLocation();


  const fetchAccounts = async () => {
    try {
      const res = await axios.get(`/api/auth/accounts?email=${usertoken.user.email}`);
      setAccounts(res.data);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    }
  };

  useEffect(() => {
    if (showsearch) {
      setOpen(true);
      fetchAccounts();
      setShowsearch(false);
    }
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
    fetchAccounts();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccountSwitch = (account) => {
    navigate('/login', { state: { email: account.email } });
    handleClose();
  };






  const searchclick = () => {
    sessionStorage.setItem('autoClickFind', 'true');
    navigate('/chat')
  }



  return (
    <div className="new-user-container">
      <h2 className="user-list-user">
        <strong style={{textWrap : 'nowrap',color : "var(--blacktextcolor)"}}>@ {usertoken.user.username}</strong>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          {location.pathname.startsWith('/chat')  && (
            <IconButton style={{ cursor: 'pointer' }}  onClick={searchclick}>
              <Search size={22} color="var(--textcolor)" />
            </IconButton>
          )}
          <IconButton onClick={handleClickOpen}>
            <ArrowRightLeft size={22}  color="var(--blacktextcolor)"/>
          </IconButton>
        </div>
      </h2>


      <Dialog open={open} onClose={handleClose} >
        <DialogTitle style={{background: 'var(--backwhitecolor)' ,color : 'var(--blacktextcolor)'}}>Switch Account</DialogTitle>
        <List sx={{ minWidth: "20rem", padding: 1 ,color : 'var(--blacktextcolor)'}} style={{background: 'var(--backwhitecolor)'}}>
          {/* Add new account */}
          <ListItemButton onClick={() => navigate('/login')}>
            <ListItemAvatar>
              <Avatar>
                <AddCircleOutlineIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add New Account" />
          </ListItemButton>

          {/* List of accounts */}

          {accounts.map((account, index) => (
            <ListItemButton key={index} onClick={() => handleAccountSwitch(account)}>
              <ListItemAvatar>
                <Avatar src={account.profile_pic} alt={account.username} />
              </ListItemAvatar>
              <ListItemText primary={account.username} />
            </ListItemButton>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default Newaccount;
