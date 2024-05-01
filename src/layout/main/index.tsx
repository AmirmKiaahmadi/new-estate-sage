import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './header'
import Footer from './footer'

export default function MainLayout() {
    const { pathname } = useLocation()
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
                <div className="  h-screen w-screen flex justify-center items-center flex-col">
                    <div className=" flex-none bg-primary w-full shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
                        <Header />
                    </div>
                    <Outlet />
                    <div className=" flex-none bg-primary w-full">
                        <Footer />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
