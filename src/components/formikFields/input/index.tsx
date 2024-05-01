import InputOutlet from 'components/inputOutlet'
import { Field, FieldProps } from 'formik'
import React from 'react'
import { toEnglishDigits } from 'utilities/helper/toEnglishDigits'
interface TFormikInputProps extends React.HTMLProps<HTMLInputElement> {
    name: string
    label: string
    secondaryTitle?: React.ReactNode
    isIban?: boolean
    isGray?: boolean
}
const FormikInput = ({
    name,
    label,
    secondaryTitle,
    isIban,
    isGray,
    ...props
}: TFormikInputProps) => {
    return (
        <>
            <Field>
                {({ form }: FieldProps) => (
                    <>
                        <InputOutlet
                            secondaryTitle={secondaryTitle}
                            required={props.required}
                            label={label}
                            name={name}
                            type={props?.type}
                            rows={props?.rows}
                            value={form.values[name]}
                            isIban={isIban}
                            onBlur={() => form.setFieldTouched(name, true)}
                            errors={form.errors[name]?.toString()}
                            touched={Boolean(form.touched[name])}
                            placeholder={props.placeholder}
                            isGray={isGray}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const value = toEnglishDigits(e.target.value)
                                form.setFieldValue(name, value)
                            }}
                            {...props}
                        />
                    </>
                )}
            </Field>
        </>
    )
}

export default FormikInput
