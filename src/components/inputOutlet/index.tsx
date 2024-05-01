import React from 'react'
import classNames from 'classnames'
import './inputOutlet.style.scss'
interface IInputOutletProps extends React.HTMLProps<HTMLInputElement> {
    label: string
    secondaryTitle?: React.ReactNode
    required?: boolean
    errors?: string
    name: string
    touched?: boolean
    isIban?: boolean
    isGray?: boolean
}

const InputOutlet = ({
    label,
    required = false,
    errors,
    touched,
    name,
    secondaryTitle,
    isIban,
    isGray,
    ...props
}: IInputOutletProps) => {
    return (
        <div
            className={
                isIban
                    ? 'floating-label-input-iban'
                    : isGray
                      ? 'floating-label-input-gray'
                      : 'floating-label-input'
            }
        >
            <input
                type={props.type}
                id={name}
                name={name}
                {...props}
                className={
                    (touched && errors && !props.disabled ? 'invalid ' : '') +
                    (!touched && !errors && !props.disabled ? 'valid' : '')
                }
            />
            <label
                htmlFor={name}
                className={classNames(
                    ' bg-white',
                    touched && errors && !props.disabled
                        ? ' text-red-1'
                        : isGray
                          ? ' text-gray-2'
                          : 'text-primary'
                )}
            >
                {label}{' '}
                {required && label && <span className="color-red-3">*</span>}
            </label>
            {secondaryTitle && (
                <span className="secondary-title">{secondaryTitle}</span>
            )}
            {isIban && <span className="iban">IR | </span>}
            {touched && errors && !props.disabled && (
                <>
                    <div className="pt-1">
                        <small>
                            <i className="icon-warning"></i> {errors}
                        </small>
                    </div>
                    {!secondaryTitle && (
                        <span className="input-icon invalid">
                            <i className="icon-error-field"></i>
                        </span>
                    )}
                </>
            )}

            {touched && !errors && !props.disabled && !secondaryTitle && (
                <span className="input-icon valid">
                    <i className="icon-success-field"></i>
                </span>
            )}
        </div>
    )
}
export default InputOutlet
