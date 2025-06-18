import React, { useContext } from 'react'
import './FloatingBackbtn.css'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';


const FloatingBackbtn = () => {
    const navigate = useNavigate();



    return (
        <Tooltip title='Back'>
            <div className='floating-back-btn active' onClick={() => navigate(-1)}>
                <KeyboardReturnRoundedIcon />
            </div >
        </Tooltip>
    )
}

export default FloatingBackbtn
