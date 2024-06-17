import { Form, Formik } from 'formik'
import StateSageLogo from 'assets/images/logo/logo.jpg'
import FormikInput from 'components/formikFields/input'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import GoogleIcon from 'assets/images/login/Fill.svg'
import * as Yup from 'yup'
import style from 'layout/auth/auth.module.scss'
export const Schema = Yup.object().shape({
    email: Yup.string().email().required('email is required'),
})

export default function ForgotPassword() {
    const navigate = useNavigate()
    return (
        <Formik
            validationSchema={Schema}
            initialValues={{ email: '' }}
            onSubmit={async (values) => {
                toast.success('we send you recovery email')
                navigate('/auth/login')
            }}
        >
            {({ values, touched, errors, setFieldValue }) => (
                <Form className=" flex justify-start ml-28 items-center m-auto w-screen  ">
                    <div className="bg-white  p-6 rounded-2xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] pb-40">
                        <div className=" flex w-full items-center">
                            <div className=" bg-[#F7F7F7] p-8 rounded-md mr-6">
                                <p className=" font-bold">Logo</p>
                            </div>
                            <div>
                                <h3 className=" text-primary text-2xl font-bold">
                                    Forgot your password?
                                </h3>
                                <p className=" text-[#6B6863]">
                                    No worries, we'll send you reset instruction
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

                        <button
                            type="submit"
                            className=" bg-primary hover:bg-white rounded-lg w-full py-2 text-white hover:text-primary border-2 border-primary hover:transition-all"
                        >
                            Send Email
                        </button>
                        <p
                            className=" text-primary text-sm my-3 cursor-pointer"
                            onClick={() => navigate('/auth/login')}
                        >
                            Back to Login
                        </p>
                    </div>
                    <div></div>
                    <div></div>
                </Form>
            )}
        </Formik>
    )
}
