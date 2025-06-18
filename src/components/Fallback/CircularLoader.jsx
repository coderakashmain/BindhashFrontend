import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const CircularLoader = () => {
  return (
     <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: 100 })}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
  )
}

export default CircularLoader


