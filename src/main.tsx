import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './services/store.js'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <Router>
    <App />
    </Router>
    </Provider>
  </StrictMode>
)
