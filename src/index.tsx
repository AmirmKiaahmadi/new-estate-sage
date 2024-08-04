import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { AuthProvider } from 'context/auth'
import { ToastContainer, Zoom } from 'react-toastify'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import 'react-chat-elements/dist/main.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-photo-view/dist/react-photo-view.css';
import {  store } from 'store'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            retry: true,  
        },
        queries: {
            refetchOnWindowFocus: true,
            retry: true,
            cacheTime : Infinity
        },
    },

})
root.render(
    <React.StrictMode>
        <Provider store={store}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
        </Provider>
        
    </React.StrictMode>
)
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
