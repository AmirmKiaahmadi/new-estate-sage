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
import { Icon, LatLng } from 'leaflet'
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
import { initialFilters } from 'utilities/helper/const'

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
        bathrooms: string
        kitchen: string
        garage: string
        parkingType: string[]
        basement: string[]
        openHouse: string
        listingType: string[]
        squareFootage: number[]
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

    const [selectedMarker , setSelectedMarker] = useState<any | undefined>()
    const navigate = useNavigate()
    const legalIcon = new Icon({
        iconUrl: LocationIcon,
        iconSize: [35, 35],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    })
    const [chat, setChat] = useState<any>([])
    const [search, setSearch] = useState<string>('')
    const { mutateDetail, realData } = useGetDiscriptions()
    const { mutate } = useGetAiService(
        mutateDetail,
        setAIData,
        setChat,
        chat,
        search,
        setOpenChatAi
    )
    const { mutateFeatures } = useGetFeatures(mutateDetail, setAIData)

    const [filters, setFilters] = useState<IFilters>(initialFilters)

    useEffect(() => {
        mutateFeatures(filters)
    }, [filters])

    const handleFindMarkerDetail = (value : any) => {
        const findMarkerDetail = realData.find((item : any)  => item.latitude === value.lat && item.longitude === value.lng)
        if(findMarkerDetail){
            setSelectedMarker(findMarkerDetail)
        }
    }


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
                            setChat={setChat}
                            chat={chat}
                            setSearch={setSearch}
                            search={search}

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
                            // onClick={(e: any) => {
                            //     console.log("e" , e)
                            //     if (e.layer.getAllChildMarkers().length > 3) {
                            //         const newChildrens: Array<
                            //             [number, number, string]
                            //         > = []
                            //         e.layer
                            //             .getAllChildMarkers()
                            //             .map((item: any) => {
                            //                 newChildrens.push([
                            //                     item._latlng.lat,
                            //                     item._latlng.lng,
                            //                     item.options.title,
                            //                 ])
                            //             })
                            //         setChildrens(newChildrens)
                            //         setIsOpenSidebar(true)
                            //     }
                            // }}
                        >
                            {AIData &&
                                AIData.map((address: any, index: any) => (
                                    <Marker
                                        key={index}
                                        position={[
                                            address.latitude,
                                            address.longitude,
                                        ]}
                                        title="point"
                                        icon={legalIcon}
                                       

                                            eventHandlers={{
                                                click: (e) => {
                                                  handleFindMarkerDetail(e.latlng)
                                                },
                                              }}
                                    >
                                        {selectedMarker && (
                                            <Popup >
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
                                                        width: 400,
                                                    }}
                                                    className=" relative"
                                                    bodyStyle={{
                                                        padding: '15px',
                                                    }}
                                                >
                                                   <div className=" p-1 rounded-lg border border-[#CCCBC8] cursor-pointer">
                        <img
                            src={`https://cdn.repliers.io/IMG-${selectedMarker.mlsNumber}_1.jpg?class=small`}
                            alt="example"
                            className=" w-full h-[150px]"
                        />
                        <div className="flex justify-between text-sm items-center my-2">
                            <div className=" flex items-center">
                                <p className=" bg-[#E5F0A6] rounded-xl py-1 px-2 mr-1 text-[#7C951B]">
                                    {selectedMarker.type}
                                </p>
                                <p className=" mx-1 text-[#7F7C77]">
                                    2023.01.23
                                </p>
                            </div>
                            <div className=" flex text-[#595653]">
                                <ShareNetwork size={20} className=" mx-1" />
                                <BookmarkSimple size={20} className=" mx-1" />
                            </div>
                        </div>
                        <div className=" my-1 flex text-xs">
                            <MapPin size={18} className=" text-[#595653]" />
                            <span className=" text-[#273A38]">
                                2 jones Avenue, Norfolk, Simcoe...
                            </span>
                        </div>
                        <div className=" flex justify-between text-sm items-center">
                            <div className="flex items-center">
                                <p className=" text-red-1">
                                    $
                                    {Number(
                                        selectedMarker.originalPrice
                                    ).toLocaleString()}
                                </p>
                                {/* <p className="text-[#BBBAB6] text-xs mx-2 line-through">
                                  {item.originalPrice}
                                </p> */}
                            </div>
                            <div className=" flex justify-between">
                                <div className="flex text-xs">
                                    <Bathtub
                                        size={18}
                                        className=" text-[#595653]"
                                    />
                                    <span className=" mx-1 text-[#595653]">
                                        2
                                    </span>
                                </div>
                                <div className="flex text-xs">
                                    <Bed
                                        size={18}
                                        className=" text-[#595653]"
                                    />
                                    <span className=" mx-1 text-[#595653]">
                                        {selectedMarker.numRooms}
                                    </span>
                                </div>
                                <div className="flex text-xs">
                                    <Car
                                        size={18}
                                        className=" text-[#595653]"
                                    />
                                    <span className=" mx-1 text-[#595653]">
                                        2
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                                                </Card>
                                            </div>
                                        </Popup>
                                        )}
                                    </Marker>
                                ))}
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
