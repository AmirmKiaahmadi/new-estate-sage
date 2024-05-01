import { Modal } from 'antd'
import { useState } from 'react'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

const defaultCheckedList: Array<{ label: string; checked: boolean }> = [
    { label: 'Detached', checked: false },
    { label: 'Semi-Detached', checked: false },
    { label: 'Freehold-Townhouse', checked: false },
    { label: 'Condo Townhouse', checked: false },
    { label: 'Condo Apt', checked: false },
    { label: 'Link', checked: false },
    { label: 'Multiplex', checked: false },
    { label: 'Vacant Land', checked: false },
    { label: 'Other', checked: false },
]

export default function PropertyModal({ open, onHide }: IGenericModal) {
    const [checkedList, setCheckedList] =
        useState<Array<{ label: string; checked: boolean }>>(defaultCheckedList)

    const handleOnChange = (name: string | undefined) => {
        const newCheckedList: Array<{ label: string; checked: boolean }> = []
        checkedList.map((item) =>
            item.label === name
                ? newCheckedList.push({
                      label: item.label,
                      checked: !item.checked,
                  })
                : newCheckedList.push(item)
        )
        setCheckedList(newCheckedList)
    }

    return (
        <Modal
            title="Select Property Types"
            centered
            open={open}
            okText=""
            cancelText=""
            onCancel={onHide}
            footer=""
            width={300}
        >
            <div className=" flex flex-col">
                {checkedList.map((item, index) => (
                    <Checkbox
                        onChange={(e) => handleOnChange(e.target.name)}
                        name={item.label}
                        checked={item.checked}
                        className=" my-1"
                        key={index}
                    >
                        {item.label}
                    </Checkbox>
                ))}
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
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    )
}
