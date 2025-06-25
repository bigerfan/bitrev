import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/Draggable'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(Flip,useGSAP,Draggable,SplitText)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster/>
  </StrictMode>,
)
