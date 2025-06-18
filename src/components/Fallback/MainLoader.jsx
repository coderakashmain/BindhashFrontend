import React from 'react'
import './MainLoader.css'
import BindhashLogo from '../../Photo/BindhashLogo.png'

const MainLoader = () => {
  return (
    <div className='main-loader'>

      <picture>
        <img src={BindhashLogo} alt="Bindhash" />
      </picture>
    </div>
  )
}

export default MainLoader
