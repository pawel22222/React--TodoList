import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import './index.css'

import ThemeProvider from './context/ThemeContext'
import DataContext from './context/DataContext'

ReactDOM.render(
  <ThemeProvider>
    <DataContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </DataContext>
  </ThemeProvider>,
  document.getElementById('root'),
)
