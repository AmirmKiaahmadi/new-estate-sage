import { DownOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { ConfigProvider, Dropdown, MenuProps, Space } from 'antd'
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
            <div className=" flex justify-between py-1 items-center">
                <div className=" flex items-center mx-2 w-full">
                    <img
                        src={Logo}
                        alt="logo"
                        className=" w-10 h-10 rounded-full"
                    />
                    <h1 className=" text-white font-extrabold text-2xl mx-2">
                        estateSage
                    </h1>
                    <InputSearch
                        name="search"
                        label=""
                        className=" bg-white mx-10"
                        secondaryTitle={<AiOutlineSearch />}
                        placeholder="Search AI"
                    />
                </div>
                <div className=" w-full relative">
                    <div className=" flex items-center w-full  justify-end">
                        <div className=" flex justify-start text-white">
                            <p className=" mx-4 cursor-pointer border-b-2 hover:border-white border-primary pb-1">
                                Home
                            </p>
                            <p className=" mx-4 cursor-pointer  border-b-2 hover:border-white border-primary pb-1">
                                Map Search
                            </p>
                            <p className=" mx-4 cursor-pointer  border-b-2 hover:border-white border-primary pb-1">
                                Market Trends
                            </p>
                        </div>
                        <button className=" border-2 text-white px-3 border-white rounded-md py-1 hover:bg-white hover:text-primary transition-all">
                            Login
                        </button>
                        <button className=" border-2 text-primary px-5 bg-white border-white mx-3 rounded-md py-1  transition-all hover:bg-primary hover:text-white">
                            Join
                        </button>
                    </div>
                </div>
            </div>
            <div className=" bg-white w-full py-1 flex justify-center relative">
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#00b96b',
                            colorBorder: '#00b96b',
                            colorText: '#00b96b',
                        },
                    }}
                >
                    <Space wrap className=" mx-2">
                        <Dropdown.Button
                            menu={forSaleProps}
                            placement="bottom"
                            icon={<DownOutlined />}
                            size="large"
                        >
                            {forSale}
                        </Dropdown.Button>
                    </Space>
                </ConfigProvider>
                <div
                    className=" py-2 rounded-xl px-4 border border-[#00b96b] text-[#00b96b] cursor-pointer "
                    onClick={() => setIsOpenPropertyModal(true)}
                >
                    Select Property Types
                </div>
                <div
                    className=" py-2 rounded-xl px-4 border border-[#00b96b] text-[#00b96b] cursor-pointer mx-2 "
                    onClick={() => setIsOpenPriceModal(true)}
                >
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
                </div>
                <div
                    className=" py-2 rounded-xl px-4 border border-[#00b96b] text-[#00b96b] cursor-pointer "
                    onClick={() => setActive(true)}
                >
                    Active
                </div>
                <div
                    className=" py-2 rounded-xl px-4 border border-[#00b96b] text-[#00b96b] cursor-pointer mx-2 "
                    onClick={() => setIsSold(true)}
                >
                    Sold
                </div>
                <div
                    className=" py-2 rounded-xl px-4 border border-[#00b96b] text-[#00b96b] cursor-pointer mx-2 "
                    onClick={handleClearAllStates}
                >
                    Clear All
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
