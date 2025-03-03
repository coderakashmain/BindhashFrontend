import React from 'react'
import { createContext } from 'react'

export const ProfilePostContext= createContext();



const ProfilePostContext = ({children}) => {
  return (
    <ProfilePostContext.Provider>
        {children}
    </ProfilePostContext.Provider>
  )
}

export default ProfilePostContext
