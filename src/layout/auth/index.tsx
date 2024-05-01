import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
export default function AuthLayout() {
    const { pathname } = useLocation()
    return (
        <div className="sm:w-full relative bg-primary ">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-100%' }}
                transition={{ duration: 0.2 }}
                className="w-100 vh-100"
            >
                <div className="  h-screen w-screen flex justify-center items-center">
                    <Outlet />
                </div>
            </motion.div>
        </div>
    )
}
