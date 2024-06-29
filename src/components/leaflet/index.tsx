import MarkerClusterGroup from 'react-leaflet-cluster'
import {
    FeatureGroup,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    ZoomControl,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { addressPoints } from './utils'
import { Icon } from 'leaflet'
import LocationIcon from 'assets/images/map/location.png'
import { popupContent, popupHead, popupText, okText } from './popUp/style'
import House from 'assets/images/house/5c261_1.jpg'
import { useNavigate } from 'react-router-dom'
import { Card } from 'antd'
import { FaSquareParking } from 'react-icons/fa6'
import { MdBathroom } from 'react-icons/md'
import { MdBedroomParent } from 'react-icons/md'
import { FaLocationDot } from 'react-icons/fa6'
import Control from 'react-leaflet-custom-control'
import { MdLightMode } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { MdDarkMode } from 'react-icons/md'
import classNames from 'classnames'
import { IoMdCloseCircle } from 'react-icons/io'
import DetailModal from './modal'
import Filters from './filters'
import {
    Bathtub,
    Bed,
    BookmarkSimple,
    Car,
    MapPin,
    ShareNetwork,
    Stack,
    StackSimple,
} from '@phosphor-icons/react'
import HouseExample from 'assets/images/map/house.png'
import AiChatFilters from './aiChatFilters'
import { EditControl } from 'react-leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import useGetAiService from './hooks/useGetAiServicde'
import useGetDiscriptions from './hooks/useGetDiscriptions'
import PropertyAiFilters from './filters/property'
import PriceFilter from './filters/price'
import ActiveFilters from './filters/active'
import MoreFilters from './filters/more'
import useGetFeatures from './hooks/useGetFeatures'

export interface IFilters {
    properties: string[]
    price: number[]
    active: string
    conditions: string
    leaseAndSale: string
    more: {
        keywords: string[]
        fee: number[]
        bedrooms: string
    }
}

const Map = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true)
    const [openDetail, setOpenDetail] = useState<boolean>(false)
    const [childrens, setChildrens] = useState<Array<any> | undefined>(
        undefined
    )
    const [openChatAi, setOpenChatAi] = useState<
        Array<[number, number, string]> | undefined
    >(undefined)
    const [isOpenPropertyFilter, setIsOpenPropertyFilter] =
        useState<boolean>(false)
    const [isOpenPriceFilter, setIsOpenPriceFilter] = useState<boolean>(false)
    const [isOpenActiveFilter, setIsOpenActiveFilter] = useState<boolean>(false)
    const [isOpenMoreFilters, setIsOpenMoreFilters] = useState<boolean>(false)
    const [AIData, setAIData] = useState<any>([])
    const navigate = useNavigate()
    const legalIcon = new Icon({
        iconUrl: LocationIcon,
        iconSize: [35, 35],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    })
    const { mutateDetail, realData } = useGetDiscriptions()
    const { mutate } = useGetAiService(mutateDetail, setAIData)
    const { mutateFeatures } = useGetFeatures(mutateDetail, setAIData)

    const [filters, setFilters] = useState<IFilters>({
        properties: [],
        price: [0, 4000000],
        active: 'All date listing',
        conditions: 'active',
        leaseAndSale: 'for lease',
        more: {
            keywords: [],
            fee: [],
            bedrooms: '',
        },
    })

    useEffect(() => {
        mutateFeatures(filters)
    }, [filters])

    return (
        <>
            <div
                className={classNames(
                    ' w-screen h-screen relative ',
                    isOpenSidebar ? 'flex overflow-hidden' : ''
                )}
            >
                {isOpenSidebar && (
                    <div className=" h-full w-[20%]  p-4 relative shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] ">
                        <Filters
                            setOpenChatAi={setOpenChatAi}
                            mutate={mutate}
                            setAIData={setAIData}
                            setIsOpenPropertyFilter={setIsOpenPropertyFilter}
                            isOpenPropertyFilter={isOpenPropertyFilter}
                            setIsOpenPriceFilter={setIsOpenPriceFilter}
                            isOpenPriceFilter={isOpenPriceFilter}
                            setIsOpenActiveFilter={setIsOpenActiveFilter}
                            filters={filters}
                            setFilters={setFilters}
                            setIsOpenMoreFilters={setIsOpenMoreFilters}
                        />
                    </div>
                )}
                {openChatAi && (
                    <div className=" h-full w-[25%]  p-2 relative shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] border-l border-[#CCCBC8] overflow-y-scroll ">
                        <AiChatFilters
                            AIData={realData}
                            firstData={AIData}
                            setIsOpenPropertyFilter={setIsOpenPropertyFilter}
                        />
                    </div>
                )}
                {isOpenPropertyFilter && (
                    <div className=" h-full w-[25%]  p-2 relative shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] border-l border-[#CCCBC8] overflow-y-scroll ">
                        <PropertyAiFilters
                            setFilters={setFilters}
                            filters={filters}
                            setIsOpenPropertyFilter={setIsOpenPropertyFilter}
                        />
                    </div>
                )}
                {isOpenPriceFilter && (
                    <div className=" h-full w-[25%]  p-2 relative shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] border-l border-[#CCCBC8] overflow-y-scroll ">
                        <PriceFilter
                            setFilters={setFilters}
                            filters={filters}
                            setIsOpenPriceFilter={setIsOpenPriceFilter}
                        />
                    </div>
                )}
                {isOpenActiveFilter && (
                    <div className=" h-full w-[25%]  p-2 relative shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] border-l border-[#CCCBC8] overflow-y-scroll ">
                        <ActiveFilters
                            setIsOpenActiveFilter={setIsOpenActiveFilter}
                            setFilters={setFilters}
                            filters={filters}
                        />
                    </div>
                )}
                {isOpenMoreFilters && (
                    <div className=" h-full w-[25%]  p-2 relative shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] border-l border-[#CCCBC8] overflow-y-scroll ">
                        <MoreFilters
                            setFilters={setFilters}
                            filters={filters}
                        />
                    </div>
                )}
                <MapContainer
                    center={[43.65107, -79.347015]}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{
                        height: '100%',
                        width: isOpenSidebar ? '80%' : '100%',
                        position: 'relative',
                        zIndex: 2,
                    }}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={
                            !isVisible
                                ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                : 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
                        }
                    />
                    <FeatureGroup>
                        <EditControl
                            position="topright"
                            draw={{
                                polyline: false,
                                circle: false,
                                rectangle: false,
                                marker: false,
                                circlemarker: false,
                            }}
                        />
                    </FeatureGroup>
                    <ZoomControl position="bottomright" />
                    <Control prepend position="bottomright">
                        <div
                            className="  bg-white rounded-full p-2.5  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] cursor-pointer -mb-2"
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            {isVisible ? (
                                <Stack size={20} />
                            ) : (
                                <StackSimple size={20} />
                            )}
                        </div>
                    </Control>
                    {AIData.length > 0 && (
                        <MarkerClusterGroup
                            chunkedLoading
                            showCoverageOnHover={false}
                            onClick={(e: any) => {
                                if (e.layer.getAllChildMarkers().length > 3) {
                                    const newChildrens: Array<
                                        [number, number, string]
                                    > = []
                                    e.layer
                                        .getAllChildMarkers()
                                        .map((item: any) => {
                                            newChildrens.push([
                                                item._latlng.lat,
                                                item._latlng.lng,
                                                item.options.title,
                                            ])
                                        })
                                    setChildrens(newChildrens)
                                    setIsOpenSidebar(true)
                                }
                            }}
                        >
                            {AIData &&
                                JSON.parse(AIData).map(
                                    (address: any, index: any) => (
                                        <Marker
                                            key={index}
                                            position={[
                                                address.latitude,
                                                address.longitude,
                                            ]}
                                            title="point"
                                            icon={legalIcon}
                                        >
                                            <Popup>
                                                <div
                                                    style={popupContent}
                                                    className=" cursor-pointer"
                                                    onClick={() =>
                                                        setOpenDetail(true)
                                                    }
                                                >
                                                    <Card
                                                        hoverable
                                                        style={{
                                                            width: 500,
                                                        }}
                                                        className=" relative"
                                                        bodyStyle={{
                                                            padding: '15px',
                                                        }}
                                                    >
                                                        <div className=" flex justify-between ">
                                                            <div className=" w-1/2 relative  ">
                                                                <img
                                                                    alt="example"
                                                                    src={House}
                                                                    className=" rounded-md"
                                                                />
                                                                <span className=" absolute bottom-2 left-2 bg-white rounded-full py-1 px-5 text-primary text-xs text-center">
                                                                    For Sale
                                                                </span>
                                                            </div>
                                                            <div className=" w-2/3 text-left p-2 text-lg  h-full relative -mt-8 ">
                                                                <span className=" text-xs absolute top-6 -right-2 px-3 py-1 rounded-full bg-primary text-white text-center">
                                                                    8 days ago
                                                                </span>
                                                                <p className=" pt-5">
                                                                    Listed :{' '}
                                                                    <span className=" text-primary">
                                                                        ${' '}
                                                                        {Number(
                                                                            579000
                                                                        ).toLocaleString()}
                                                                    </span>
                                                                </p>
                                                                <span>
                                                                    Detached
                                                                </span>
                                                                <div className="flex items-center mt-2">
                                                                    <FaLocationDot
                                                                        color="#009579"
                                                                        size={
                                                                            15
                                                                        }
                                                                    />

                                                                    <span className=" text-sm mx-1 ">
                                                                        Toronto
                                                                        -
                                                                        Church-Yonge
                                                                        Corridor
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className=" flex items-center justify-center absolute bottom-3  right-2">
                                                                <FaSquareParking
                                                                    color="#009579"
                                                                    size={30}
                                                                    className=" mx-3"
                                                                />
                                                                <span>1</span>
                                                                <MdBathroom
                                                                    color="#009579"
                                                                    size={30}
                                                                    className=" mx-3"
                                                                />
                                                                <span>2</span>
                                                                <MdBedroomParent
                                                                    color="#009579"
                                                                    size={30}
                                                                    className=" mx-3"
                                                                />
                                                                <span>2</span>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )
                                )}
                        </MarkerClusterGroup>
                    )}
                </MapContainer>
            </div>
            <DetailModal
                open={openDetail}
                onHide={() => setOpenDetail(false)}
            />
        </>
    )
}

export default Map
