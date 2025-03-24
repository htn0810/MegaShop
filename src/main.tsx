import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import { ThemeProvider } from '@/providers/ThemeProvider'
import App from '@/App'
import { Toaster } from '@/components/ui/sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <App />
        <Toaster position='top-right' expand={false} richColors closeButton />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
