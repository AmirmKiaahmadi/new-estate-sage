import { Modal, Radio, RadioChangeEvent, Space } from 'antd'
import React, { useState } from 'react'

const defaultRadioList: { label: string; value: number }[] = [
    {
        label: 'Last 1 Days',
        value: 1,
    },
    {
        label: 'Last 3 Days',
        value: 3,
    },
    {
        label: 'Last 7 Days',
        value: 7,
    },
    {
        label: 'Last 30 Days',
        value: 30,
    },
    {
        label: 'Last 90 Days',
        value: 90,
    },
    {
        label: 'More than 15 days',
        value: 150,
    },
    {
        label: 'More than 30 days',
        value: 300,
    },
    {
        label: 'More than 60 days',
        value: 600,
    },
    {
        label: 'More than 90 days',
        value: 900,
    },
]

export default function ActiveModal({ open, onHide }: IGenericModal) {
    const [selectedRadio, setSelectedRadio] = useState<number>(0)
    const [radioList, setRadioList] =
        useState<{ label: string; value: number }[]>(defaultRadioList)
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
