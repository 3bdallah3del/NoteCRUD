import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import  postSlice  from './Components/redux/postsSlice.jsx'
// import { postSlice } from './Components/redux/postsSlice.jsx'

export const store = configureStore({
  reducer: {
    post:postSlice
  },
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
