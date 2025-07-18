import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  Button, IconButton, TextField, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography
} from '@mui/material';
import { MessageSquarePlus } from 'lucide-react'; // a nice icon
import './DefaultChatPage.css';
import CloseIcon from '@mui/icons-material/Close';
import { FollowersFollowingContext } from '../../Context/FollowersFollowing';
import { useNavigate } from 'react-router-dom';
import CombineAvatat from '../../components/Avatar/CombineAvatat';


const DefaultChatPage = () => {
  const { followersList, followingList, fetchFollowers, fetchFollowing } = useContext(FollowersFollowingContext);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  const handleClickOpen = () => {
    fetchFollowers();
    fetchFollowing();
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    setSearchQuery('');
  };


  const shouldAutoClick = sessionStorage.getItem('autoClickFind');
  useEffect(() => {

    if (shouldAutoClick === 'true') {

      fetchFollowers();
      fetchFollowing();
      setOpen(true);
      sessionStorage.removeItem('autoClickFind');
    }

  }, [shouldAutoClick]);



  const filteredFollowings = followingList?.filter(user =>
    (user?.fullname || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user?.username || '').toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredFollowers = followersList?.filter(user =>
    (user?.fullname || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user?.username || '').toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];


  const gotochat = (u) => {


    navigate(`/chat/${u.id}/${u.username}`);    
  }
  return (
    <div className="default-chat-page">
      <div className="default-chat-content">
        <div className="chat-icon-wrapper">
          <MessageSquarePlus size={64} strokeWidth={1.5} />
        </div>
        <h2>Start your first conversation!</h2>
        <p className="default-chat-subtext">
          Find someone interesting? Say hello and break the ice.
        </p>
        <Button
          variant="contained"
          className='default-chat-button'
          onClick={handleClickOpen}
          sx={{
            borderRadius: '50px',
            paddingX: 3,
            background: 'var(--linearcolor)',
            paddingY: 1,
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#1c6bad' }
          }}
        >
          Find Friends
        </Button>

        <Dialog open={open} onClose={handleClose} style={{ background: '--var(backwhitecolor)' }} fullWidth maxWidth="sm">
          <DialogTitle sx={{ m: 0, p: 2 }} style={{ background: 'var(--backwhitecolor)', color: 'var(--blacktextcolor)' }}>
            Search Friends
            <IconButton

              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers style={{ background: 'var(--backwhitecolor)', color: 'var(--blacktextcolor)' }} >
            <TextField
              fullWidth
              placeholder="Search by name or username..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                mb: 2,
                input: {
                  border: ' var(--border-color)',
                  color: 'var(--blacktextcolor)',
                  '::placeholder': {
                    color: 'var(--lighttextcolor)',
                    opacity: 1,
                  },
                },

              }}
              style={{ color: 'var(--lighttextcolor)' }}

            />

            {/* Following Users */}
            <Typography variant="h6" sx={{ mb: 1 }}>Following</Typography>
            <List>
              {filteredFollowings.length > 0 ? (
                filteredFollowings.map((user) => (
                  <ListItem key={`following-${user.id}`} button
                    onClick={() => gotochat(user)} style={{cursor : 'pointer'}} >
                    <ListItemAvatar>
                      {/* <Avatar src={user.profile_pic}  alt={user.username}/> */}
                      <CombineAvatat usernmae ={user.username} profile_pic={user.profile_pic} visibility={user.visibility} size='3rem'/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.fullname}
                      secondary={`@${user.username}`}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: 'var(--blacktextcolor)',
                        },
                        '& .MuiListItemText-secondary': {
                          color: 'var(--lighttextcolor)', 
                        },
                      }}

                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" style={{ color: 'var(--lighttextcolor)' }}>No matching following users.</Typography>
              )}
            </List>

            {/* Followers Users */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Followers</Typography>
            <List>
              {filteredFollowers.length > 0 ? (
                filteredFollowers.map((user) => (
                  <ListItem key={`follower-${user.id}`} button onClick={()=>gotochat(user)} style={{cursor : 'pointer'}}>
                    <ListItemAvatar>
                      {/* <Avatar src={user.profile_pic} /> */}
                       <CombineAvatat usernmae ={user.username} profile_pic={user.profile_pic} visibility={user.visibility} size='3rem'/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.fullname}
                      secondary={`@${user.username}`}
                        sx={{
                        '& .MuiListItemText-primary': {
                          color: 'var(--blacktextcolor)',
                        },
                        '& .MuiListItemText-secondary': {
                          color: 'var(--lighttextcolor)', 
                        },
                      }}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" style={{ color: 'var(--lighttextcolor)' }}>No matching followers.</Typography>
              )}
            </List>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DefaultChatPage;
