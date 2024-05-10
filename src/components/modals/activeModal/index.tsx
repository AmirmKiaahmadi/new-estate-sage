import { Modal, Radio, RadioChangeEvent, Space } from 'antd'
import React, { useState } from 'react'

interface IActiveModalProps extends IGenericModal {
    radioList: {
        label: string
        value: number
    }[]
    setSelectedRadio: React.Dispatch<React.SetStateAction<number>>
    selectedRadio: number
}

export default function ActiveModal({
    open,
    onHide,
    radioList,
    setSelectedRadio,
    selectedRadio,
}: IActiveModalProps) {
    const onChange = (e: RadioChangeEvent) => {
        setSelectedRadio(e.target.value)
    }
    return (
        <Modal
            title="Active"
            centered
            open={open}
            okText=""
            cancelText=""
            onCancel={onHide}
            footer=""
            width={300}
        >
            <Radio.Group value={selectedRadio} onChange={onChange}>
                <Space direction="vertical">
                    {radioList.map((item, index) => (
                        <Radio value={item.value} key={index}>
                            {item.label}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
            <div className=" flex justify-between">
                <button
                    className=" border border-primary rounded-md text-primary w-full mx-1 py-2 mt-4"
                    onClick={onHide}
                >
                    Cancel
                </button>
                <button
                    className=" w-full mx-1 bg-primary rounded-md text-white py-2 mt-4"
                    onClick={onHide}
                >
                    Apply
                </button>
            </div>
        </Modal>
    )
}
