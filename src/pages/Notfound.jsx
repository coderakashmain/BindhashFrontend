import React from 'react';
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Bangbox from '../components/Bangbox/Bangbox';
import Logo from '../components/Bangbox/Logo'
 
const Notfound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        height: '100vh',
        width: '100vw',
        background: 'var(--webbackcolor)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <Helmet>
        <title>404 – Page Not Found | Bindhash</title>
        <meta
          name="description"
          content="Oops! The page you're looking for doesn’t exist. You can return to the home page or explore rooms and stories on Bindhash."
        />
      </Helmet>

      <aside style={{display : 'flex', flexDirection : 'row', flexWrap : 'nowrap', position : 'absolute', top : '2rem', left : '2rem'}}>
      <Logo size='5rem'/>
        {/* <Bangbox size ="3rem" click={true}/> */}
      </aside>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          fontSize: '10rem',
          fontWeight: 'bold',
          // color: '#222',
          margin: 0,
        }}
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ fontSize: '2rem', color: 'var(--textcolor)', margin: '1rem 0' }}
      >
        Oops! Page not found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ maxWidth: '400px', color: '#777', marginBottom: '2rem' }}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() =>  window.location.href = '/'}
        style={{
          padding: '0.8rem 1.5rem',
          background: 'var(--logolinearcolor)',
          color: 'white',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        Go to Homepage
      </motion.button>
    </motion.div>
  );
};

export default Notfound;
