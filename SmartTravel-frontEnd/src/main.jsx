import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { TravelApp } from './TravelApp'   



ReactDOM.createRoot(document.getElementById('root')).render(
  
<BrowserRouter>
    <React.StrictMode>
      
      <TravelApp />

    </React.StrictMode>
  </BrowserRouter>

)
