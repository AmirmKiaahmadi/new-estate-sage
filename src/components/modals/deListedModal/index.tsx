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
        label: 'Last 180 Days',
        value: 180,
    },
    {
        label: 'Last 360 Days',
        value: 360,
    },
    {
        label: 'Year 2024',
        value: 2024,
    },
    {
        label: 'Year 2023',
        value: 2023,
    },
    {
        label: 'Year 2022',
        value: 2022,
    },
    {
        label: 'Year 2021',
        value: 2021,
    },
    {
        label: 'Year 2020',
        value: 2020,
    },
    {
        label: 'Year 2019',
        value: 2019,
    },
    {
        label: 'Year 2018',
        value: 2018,
    },
]

export default function DeListedModal({ open, onHide }: IGenericModal) {
    const [selectedRadio, setSelectedRadio] = useState<number>(0)
    const [radioList, setRadioList] =
        useState<{ label: string; value: number }[]>(defaultRadioList)
    const onChange = (e: RadioChangeEvent) => {
        setSelectedRadio(e.target.value)
    }
    return (
        <Modal
            title="De-Listed"
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
