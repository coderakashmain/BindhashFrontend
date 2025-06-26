import React, { useContext } from 'react'
import PostModel from '../components/Post/PostModel'
import { MobileViewContext } from '../Context/MobileResizeProvider'

const SharePostRouter = () => {
    const {isMobile}= useContext(MobileViewContext);

    return (
        <section style={{ width: '100%', height: '100%', overflowY: 'scroll', display: 'flex', justifyContent: 'center', }}>
            <div style={{ width :isMobile ? '100% ': '40rem',background : 'white'}}>

                <PostModel />
            </div>
        </section>
    )
}

export default SharePostRouter
