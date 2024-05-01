import { Modal, Slider } from 'antd'
import React from 'react'
interface IpriceModalProps extends IGenericModal {
    price: number[]
    setPrice: React.Dispatch<React.SetStateAction<number[]>>
}
export default function PriceModal({
    open,
    onHide,
    price,
    setPrice,
}: IpriceModalProps) {
    console.log('price', price)
    return (
        <Modal
            title="Price"
            centered
            open={open}
            okText=""
            cancelText=""
            onCancel={onHide}
            footer=""
            width={500}
        >
            <div className=" flex flex-col">
                <h1 className=" text-2xl">
                    $
                    {price[0] < 1000
                        ? `${price[0]}`
                        : price[0] < 1000000
                          ? `${price[0] / 1000}K`
                          : `${price[0] / 1000000}M`}{' '}
                    - $
                    {price[1] < 1000
                        ? `${price[1]}`
                        : price[1] < 1000000
                          ? `${price[1] / 1000}K`
                          : `${price[1] / 1000000}M`}
                </h1>
                <Slider
                    range
                    step={100}
                    defaultValue={[20, 100]}
                    max={6000000}
                    onChange={setPrice}
                />
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
            </div>
        </Modal>
    )
}
