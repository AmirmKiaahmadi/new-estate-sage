import { RouteObject } from 'react-router-dom'
import SignUp from '.'
import SignUpLayout from 'layout/signUp'
import ForgotPassword from '../forgotPassword'

export const signupRoutes: RouteObject[] = [
    {
        path: 'auth',
        element: <SignUpLayout />,
        errorElement: <>error page</>,
        children: [
            {
                index: true,
                path: 'signUp',
                element: <SignUp />,
            },
            {
                index: true,
                path: 'forgotPassword',
                element: <ForgotPassword />,
            },
        ],
    },
]
