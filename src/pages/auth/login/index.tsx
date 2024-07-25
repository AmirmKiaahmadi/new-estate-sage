import { Form, Formik } from 'formik'
import StateSageLogo from 'assets/images/logo/logo.jpg'
import FormikInput from 'components/formikFields/input'
import { Schema } from './utils'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import GoogleIcon from 'assets/images/login/Fill.svg'

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
                    localStorage.setItem(
                        'status',
                        JSON.stringify({ login: true })
                    )
                } else {
                    toast.error('email or password is incurrect')
                }
            }}
        >
            {({ values, touched, errors, setFieldValue }) => (
                <Form className=" flex justify-start ml-28 items-center m-auto w-screen  ">
                    <div className="bg-white  p-6 rounded-2xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                        <div className=" flex w-full items-center">
                            <div className=" bg-[#F7F7F7] p-8 rounded-md mr-6">
                                <p className=" font-bold">Logo</p>
                            </div>
                            <div>
                                <h3 className=" text-primary text-2xl font-bold">
                                    Login
                                </h3>
                                <p className=" text-[#6B6863]">
                                    It's nice to see you again :)
                                </p>
                            </div>
                        </div>

                        <div className="my-6 text-sm font-normal">
                            <p>
                                <span className=" text-[#F04438]">*</span> Email
                                Address
                            </p>
                            <Input
                                placeholder="name@company.com"
                                name="email"
                                className="text-sm font-normal"
                                size="large"
                                onChange={(e) =>
                                    setFieldValue('email', e.target.value)
                                }
                            />
                            {errors.email && touched.email && (
                                <p className=" text-xs text-red-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className=" my-6 text-sm font-normal">
                            <p>
                                <span className=" text-[#F04438]">*</span>{' '}
                                Password
                            </p>
                            <Input.Password
                                placeholder="input password"
                                size="large"
                                type="primary"
                                name="password"
                                onChange={(e) =>
                                    setFieldValue('password', e.target.value)
                                }
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                            />
                            {errors.password && touched.password && (
                                <p className="  text-xs text-red-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className=" w-full flex justify-between my-4">
                            <Checkbox onChange={() => console.log('salam')}>
                                Remember me
                            </Checkbox>
                            <p
                                className=" text-primary text-sm cursor-pointer"
                                onClick={() => navigate('/auth/forgotPassword')}
                            >
                                Forgot password?
                            </p>
                        </div>
                        <button
                            type="submit"
                            className=" bg-primary hover:bg-white rounded-lg w-full py-2 text-white hover:text-primary border-2 border-primary hover:transition-all"
                        >
                            Login
                        </button>
                        <div className=" flex justify-center w-full items-center my-3">
                            <hr className=" w-full text-[#8C8983]" />
                            <p className=" mx-3 text-[#8C8983]">Or</p>
                            <hr className=" w-full text-[#8C8983]" />
                        </div>
                        <button className=" bg-white rounded-lg w-full py-2 text-primary border border-primary flex justify-center items-center">
                            <img
                                src={GoogleIcon}
                                alt="google"
                                className=" mx-1"
                            />
                            <span>Continue With Google</span>
                        </button>

                        <p className=" text-center text-sm text-[#8C8983] mt-3">
                            Don't have an account yet?{' '}
                            <span
                                className=" text-primary cursor-pointer"
                                onClick={() => navigate('/auth/signUp')}
                            >
                                Sign up
                            </span>
                        </p>
                    </div>
                    <div></div>
                    <div></div>
                </Form>
            )}
        </Formik>
    )
}
