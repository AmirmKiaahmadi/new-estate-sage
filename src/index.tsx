import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { AuthProvider } from 'context/auth'
import { ToastContainer, Zoom } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={routes} />
            <ToastContainer
                position="top-center"
                className="text-left"
                hideProgressBar={true}
                transition={Zoom}
                autoClose={3000}
            />
        </AuthProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
