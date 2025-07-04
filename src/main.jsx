import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './Font/Fonts.css'
import { HelmetProvider } from 'react-helmet-async'


const helmetContext = {};

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/firebase-messaging-sw.js')
//     .then(reg => {
//       console.log('Service Worker registered:', reg);
//     });
// }



createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <HelmetProvider context={helmetContext}>
    <App />
  </HelmetProvider>
  // </StrictMode>,
)
