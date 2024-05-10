import { Form, Formik } from 'formik'
import StateSageLogo from 'assets/images/logo/logo.jpg'
import FormikInput from 'components/formikFields/input'
import { Schema } from './utils'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    return (
        <Formik
            validationSchema={Schema}
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values) => {
                if (
                    values.email === 'amirmkiaahmadi@gmail.com' &&
                    values.password === '123456'
                ) {
                    toast.success('Login Successfully')
                    navigate('/map')
                } else {
                    toast.error('email or password is incurrect')
                }
            }}
        >
            <Form className=" flex justify-center items-center m-auto w-screen  ">
                <div className="bg-white md:w-1/4 lg:w-1/4 sm:w-full xs:w-full p-6 rounded-2xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                    <img
                        src={StateSageLogo}
                        alt="logo"
                        className=" mx-auto w-[100px] h-[100px]"
                    />
                    <p className=" font-bold text-2xl text-center">
                        Welcome Back :)
                    </p>
                    <div className="my-6 text-sm font-normal">
                        <FormikInput
                            type="email"
                            label="email"
                            name="email"
                            className="text-sm font-normal"
                        />
                    </div>
                    <div className=" my-6 text-sm font-normal">
                        <FormikInput
                            type="password"
                            label="password"
                            name="password"
                            className="text-sm font-normal"
                        />
                    </div>
                    <button className=" bg-primary hover:bg-white rounded-lg w-full py-3 text-white hover:text-primary border-2 border-primary hover:transition-all">
                        Login
                    </button>
                </div>
            </Form>
        </Formik>
    )
}
