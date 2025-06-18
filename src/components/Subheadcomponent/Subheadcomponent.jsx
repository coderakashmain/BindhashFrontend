import { X } from 'lucide-react'
import React from 'react'
import './Subheadcomponent.css'
import Bangbox from '../Bangbox/Bangbox'

const Subheadcomponent = ({headline,onClose,logo = true}) => {
    const style  = {

    }
  return (
       <header
        className="subhead-comp"
        style={style}
          
        >
          <h4>{headline || ''} </h4>
         {logo && ( <Bangbox size={'1.5rem'} click={false} />)}
          <button onClick={ () => {
            onClose() 
          
             
            
            
           }} className="" style={{ margin: 10 }}>
            <X size= "1.6rem"/>
          </button>
        </header>
  )
}

export default Subheadcomponent
