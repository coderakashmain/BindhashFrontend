import React, { useEffect } from 'react'
import './MainLoader.css'
import BindhashLogo from '../../Photo/BindhashLogo.png'

const MainLoader = () => {
    useEffect(() => {
    const blockRightClick = (e) => e.preventDefault();
    const loader = document.querySelector('.main-loader');
    loader.addEventListener('contextmenu', blockRightClick);

    return () => loader.removeEventListener('contextmenu', blockRightClick);
  }, []);

  return (
    <div className='main-loader'>

      <picture>
        <img src={BindhashLogo} alt="Bindhash" />
      </picture>
    </div>
  )
}

export default MainLoader
