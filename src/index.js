import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals'
import App from './App'
import './index.css'

import ThemeProvider from './context/ThemeContext'

ReactDOM.render(
    <ThemeProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ThemeProvider>,
    document.getElementById('root'),
)

reportWebVitals()
