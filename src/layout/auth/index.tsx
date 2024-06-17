import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import style from './auth.module.scss'
import classNames from 'classnames'
export default function AuthLayout() {
    const { pathname } = useLocation()
    return (
        <div
            className={classNames(
                'relative  h-screen w-screen ',
                style['login-bg']
            )}
        >
            <motion.div
                key={pathname}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-100%' }}
                transition={{ duration: 0.2 }}
                className=" h-screen w-screen"
            >
                <div className="  h-screen w-screen flex justify-between items-center">
                    <Outlet />
                </div>
            </motion.div>
        </div>
    )
}
