import React from 'react'
import logo from '../../Photo/BindhashLogo.png'

const Logo = ({size = '5rem'}) => {
  return (
 
      <picture style={{ userSelect : 'none'}}>
        <img src={logo} style={{ height : size ,width : size }} alt="Binghash" />
      </picture>
   
  )
}

export default Logo
