import React, { useContext } from 'react'
import { UserAuthCheckContext } from '../../Context/UserAuthCheck'
import {

    SecurityOutlined,

} from "@mui/icons-material"
import { Avatar } from '@mui/material'

const AnonymousAavatar = ({ size }) => {
    const { usertoken } = useContext(UserAuthCheckContext);
    if (!usertoken?.user) return null;


    return (
        <Avatar sx={{
            background: 'var(--linearcolor)',
            width: size,
            height: size,
            fontSize: '1.2rem',

        }}
        slotProps={{
        img: {
            loading: "lazy",
        },
    }}
        >
            {usertoken.user.visibility === 'anonymous' ? <SecurityOutlined /> : null}
        </Avatar>
    )
}

export default AnonymousAavatar
