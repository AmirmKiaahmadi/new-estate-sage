import { motion } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import { useEffect } from 'react'

export default function MainLayout() {
    const { pathname } = useLocation()
    const status = localStorage.getItem('status')
    const navigate = useNavigate()
    useEffect(() => {
        if (!status) {
            localStorage.clear()
            navigate('/auth/login')
        }
    }, [status])
    return (
        <div className="sm:w-full relative ">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-100%' }}
                transition={{ duration: 0.2 }}
                className="w-100 vh-100"
            >
                <div className="  h-screen w-screen flex  items-center flex-col relative">
                    <div className=" flex-none bg-primary w-full py-2 ">
                        <Header />
                    </div>

                    <Outlet />
                </div>
            </motion.div>
        </div>
    )
}
