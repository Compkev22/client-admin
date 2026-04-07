import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import '../styles/index.css'
import App from './App.jsx'

// Eliminamos la importación de ThemeProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>
)