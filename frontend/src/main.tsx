import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import userSlice from './redux/slices/userSlice.ts'
import { Provider } from 'react-redux';


const myStore=configureStore({reducer:combineSlices(userSlice)})

createRoot(document.getElementById('root')!).render(
  <Provider store={myStore}>
  <StrictMode>
    <BrowserRouter>
    <App></App>
    </BrowserRouter>
  </StrictMode>
  </Provider>

  
)
