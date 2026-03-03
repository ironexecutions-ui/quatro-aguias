import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="212810619282-t5pg1o5ibl85cnbpjkoqrkh2enbqqk4a.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)