import React, { createContext, useEffect, useState } from 'react'

export const MobileViewContext = createContext();

const MobileResizeProvider = ({children}) => {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

      useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth < 640);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);


  return (
    <MobileViewContext.Provider value={{isMobile}}>
      {children}
    </MobileViewContext.Provider>
  )
}

export default MobileResizeProvider
