import * as Yup from 'yup'
export const Schema = Yup.object().shape({
    email: Yup.string().email().required('email is required'),
    password: Yup.string().required('password is required'),
})
