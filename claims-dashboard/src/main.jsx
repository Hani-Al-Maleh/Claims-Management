import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProviderWrapper } from "./ThemeContext";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderWrapper>
    <App />
  </ThemeProviderWrapper>
  </StrictMode>,
)
