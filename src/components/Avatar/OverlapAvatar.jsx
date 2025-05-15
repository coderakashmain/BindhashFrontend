import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));




export default function OverlapAvatar({username,profile_pic,secondusername,secondprofile_pic,size}) {



  return (
    <Stack direction="row" spacing={2}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar alt={secondusername} src={secondprofile_pic} />
        }
      >
        <Avatar alt={username} src={profile_pic}  />
      </Badge>
    </Stack>
  );
}
