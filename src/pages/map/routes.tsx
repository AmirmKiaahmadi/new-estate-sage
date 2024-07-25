import Map from 'components/leaflet'
import MainLayout from 'layout/main'
import { RouteObject } from 'react-router-dom'
import Detail from './detail'

export const mapRoutes: RouteObject[] = [
    {
        path: 'map',
        element: <MainLayout />,
        errorElement: <>error page</>,
        children: [
            {
                index: true,
                path: '',
                element: <Map />,
            },
            {
                index: false,
                path: 'detail/:mlsNumber/:latitude/:longitude',
                element: <Detail />,
            },
        ],
    },
]
