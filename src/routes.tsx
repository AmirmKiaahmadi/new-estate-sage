import { authRoutes } from 'pages/auth/routes'
import { mapRoutes } from 'pages/map/routes'
import NotFound from 'pages/notFound'
import { Navigate, createBrowserRouter } from 'react-router-dom'

export const routes = createBrowserRouter([
    { path: '/', element: <Navigate replace to="/auth/login" /> },
    { path: '*', element: <NotFound /> },
    ...authRoutes,
    ...mapRoutes,
])
