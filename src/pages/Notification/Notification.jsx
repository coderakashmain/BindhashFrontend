import React from 'react'
import "./Notification.css"
import { motion, AnimatePresence } from 'framer-motion'
const Notification = ({ isOpen }) => {
    return (
        <AnimatePresence>

            <motion.section
                animate={{ x: isOpen ? "0%" : '100%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                id='notification'>

                <header>Notification</header>

            </motion.section>
        </AnimatePresence>
    )
}

export default Notification
