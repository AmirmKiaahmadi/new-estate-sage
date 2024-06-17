import { DownOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { ConfigProvider, Dropdown, Input, MenuProps, Space } from 'antd'
import Logo from 'assets/images/logo/logo.jpg'
import InputSearch from 'components/inputSearch'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { defaultActiveList, defaultCheckedList, items } from './utils'
import PropertyModal from 'components/modals/propertyModal'
import PriceModal from 'components/modals/price'
import ActiveModal from 'components/modals/activeModal'
import SoldModal from 'components/modals/soldModal'
import DeListedModal from 'components/modals/deListedModal'
import { CaretDown, MagnifyingGlass, MapTrifold } from '@phosphor-icons/react'

export default function Header() {
    const [forSale, setForSale] = useState<string>('For Sale')
    const [isOpenPropertyModal, setIsOpenPropertyModal] =
        useState<boolean>(false)
    const [isOpenPriceModal, setIsOpenPriceModal] = useState<boolean>(false)
    const [price, setPrice] = useState<Array<number>>([20, 100])
    const [isActive, setActive] = useState<boolean>(false)
    const [isSold, setIsSold] = useState<boolean>(false)
    const [isDeListed, setIsDelisted] = useState<boolean>(false)
    const [checkedList, setCheckedList] =
        useState<Array<{ label: string; checked: boolean }>>(defaultCheckedList)

    const [selectedActive, setSelectedActive] = useState<number>(0)
    const [selectedSold, setSelectedSold] = useState<number>(0)

    const handleForSaleClick: MenuProps['onClick'] = (e) => {
        setForSale(e.key)
    }
    const forSaleProps = {
        items,
        onClick: handleForSaleClick,
    }
    const handleClearAllStates = () => {
        setForSale('For Sale')
        setPrice([20, 100])
        setCheckedList(defaultCheckedList)
        setSelectedActive(0)
        setSelectedSold(0)
    }
    return (
        <div className=" relative">
            <div className=" grid grid-cols-3 gap-4 py-1 items-center">
                <div className=" col-span-1 flex items-center mx-2 w-full">
                    <h1 className=" text-white font-extrabold text-2xl mx-10">
                        Logo
                    </h1>
                    <Input
                        placeholder="Search Address,Street Name or Listing"
                        prefix={<MagnifyingGlass size={15} />}
                    />
                </div>
                <div className="w-full col-span-2">
                    <div className=" flex items-center w-full  justify-center">
                        <div className=" flex justify-end text-white">
                            <p className="  text-sm flex items-center mx-4 cursor-pointer border-b-2  border-primary  py-1">
                                Watched
                                <CaretDown size={20} className=" ml-2" />
                            </p>
                            <p className=" text-sm mx-4 cursor-pointer  border-b-2  border-primary  py-1">
                                Market Trends
                            </p>
                            <p className=" text-sm mx-4 cursor-pointer  border-b-2  border-primary  py-1">
                                Market Trends
                            </p>
                            <p className=" text-sm mx-4 cursor-pointer  border-b-2  border-primary py-1 ">
                                Home Valuation
                            </p>
                            <p className=" text-sm flex items-center mx-4 cursor-pointer border-b-2  border-primary ">
                                Tools
                                <CaretDown size={20} className=" ml-2" />
                            </p>
                            <p className=" text-sm flex items-center mx-4 cursor-pointer border-b-2 bg-white text-primary px-2  rounded-lg py-1">
                                <MapTrifold size={20} className=" mr-2" />
                                Map Search
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <PropertyModal
                open={isOpenPropertyModal}
                onHide={() => setIsOpenPropertyModal(false)}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
            />
            <PriceModal
                open={isOpenPriceModal}
                onHide={() => setIsOpenPriceModal(false)}
                price={price}
                setPrice={setPrice}
            />
            <ActiveModal
                open={isActive}
                onHide={() => setActive(false)}
                radioList={defaultActiveList}
                setSelectedRadio={setSelectedActive}
                selectedRadio={selectedActive}
            />
            <SoldModal
                open={isSold}
                onHide={() => setIsSold(false)}
                selectedSold={selectedSold}
                setSelectedSold={setSelectedSold}
            />
            <DeListedModal
                open={isDeListed}
                onHide={() => setIsDelisted(false)}
            />
        </div>
    )
}
