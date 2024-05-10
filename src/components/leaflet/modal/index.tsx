import { Modal } from 'antd'
import House from 'assets/images/house/5c261_1.jpg'
import House3 from 'assets/images/house/3.jpg'
import House4 from 'assets/images/house/5.jpg'
import { FaSquareParking } from 'react-icons/fa6'
import { MdBathroom, MdBedroomParent } from 'react-icons/md'
export default function DetailModal({ open, onHide }: IGenericModal) {
    return (
        <Modal
            title="Detail"
            centered
            open={open}
            okText=""
            cancelText=""
            onCancel={onHide}
            footer=""
            width={800}
        >
            <div className=" flex flex-col">
                <div className=" grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <img
                            alt="house"
                            src={House}
                            className=" w-full rounded-lg "
                        />
                    </div>
                    <div className=" h-full p-0">
                        <img
                            alt="house"
                            src={House3}
                            className=" w-full rounded-lg my-1 opacity-25 hover:opacity-100"
                        />
                        <img
                            alt="house"
                            src={House4}
                            className=" w-full rounded-lg opacity-25 hover:opacity-100"
                        />
                    </div>
                </div>
                <div className=" my-4 font-bold">
                    <p className=" text-xl">Unit 3234 - 33 Harbour Sq</p>
                    <p className=" text-xl">
                        Toronto - Waterfront Communities C1
                    </p>
                    <p className=" text-xl">Condo Apt</p>
                </div>
                <div className=" w-full flex justify-between py-3 border-t border-b border-[#a4aab0] items-center">
                    <div className="flex items-center">
                        <FaSquareParking
                            color="#a4aab0"
                            size={40}
                            className=" mx-3"
                        />
                        <span>1 Garage</span>
                    </div>
                    <div className="flex items-center">
                        <MdBathroom
                            color="#a4aab0"
                            size={40}
                            className=" mx-3"
                        />
                        <span>1 Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                        <MdBedroomParent
                            color="#a4aab0"
                            size={40}
                            className=" mx-3"
                        />
                        <span>1 Bedrooms</span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
