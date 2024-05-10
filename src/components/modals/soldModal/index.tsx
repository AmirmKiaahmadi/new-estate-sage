import { Modal, Radio, RadioChangeEvent, Space } from 'antd'
import { defaultSoldList } from 'layout/main/header/utils'
interface ISoldModalProps extends IGenericModal {
    selectedSold: number
    setSelectedSold: React.Dispatch<React.SetStateAction<number>>
}
export default function SoldModal({
    open,
    onHide,
    selectedSold,
    setSelectedSold,
}: ISoldModalProps) {
    const onChange = (e: RadioChangeEvent) => {
        setSelectedSold(e.target.value)
    }
    return (
        <Modal
            title="Sold"
            centered
            open={open}
            okText=""
            cancelText=""
            onCancel={onHide}
            footer=""
            width={300}
        >
            <Radio.Group value={selectedSold} onChange={onChange}>
                <Space direction="vertical">
                    {defaultSoldList.map((item, index) => (
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
