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
import InertiaPlugin from 'gsap/InertiaPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(Flip,useGSAP,Draggable,SplitText,InertiaPlugin,ScrollToPlugin)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster/>
  </StrictMode>,
)
