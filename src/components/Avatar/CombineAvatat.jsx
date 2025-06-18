import { Avatar } from '@mui/material'
import React from 'react'
import {

    SecurityOutlined,

} from "@mui/icons-material"

const CombineAvatat = ({username,profile_pic,visibility ,size = "1.5rem"}) => {

  return (

    <Avatar src={profile_pic || null } alt={username} slotProps={{
        img: {
            loading: "lazy",
        },
    }} sx={{height : size, width : size , background : visibility === 'anonymous' ? 'var(--linearcolor)' : 'var(--linearcolor)'}} >
        {visibility === 'anonymous' ? <SecurityOutlined/> : null }
    </Avatar>
  
  )
}

export default CombineAvatat
