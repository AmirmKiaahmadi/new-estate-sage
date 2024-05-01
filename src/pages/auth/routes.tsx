import AuthLayout from 'layout/auth'
import { RouteObject } from 'react-router-dom'
import Login from './login'

export const authRoutes: RouteObject[] = [
    {
        path: 'auth',
        element: <AuthLayout />,
        errorElement: <>error page</>,
        children: [
            {
                index: true,
                path: 'login',
                element: <Login />,
            },
        ],
    },
]
