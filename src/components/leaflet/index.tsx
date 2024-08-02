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
import { Icon, LatLng, divIcon } from 'leaflet'
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
    CaretLeft,
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
import useGetListings from './hooks/useGetListings'
import moment from 'moment'
import SelectedListings from './selectedListings'
import useGetPlaces from './hooks/useGetPlaces'
import LoadingBar from 'react-top-loading-bar'
import useSetListingPropertyType from './hooks/useSetListingPropertyType'
import WatchedArea from './filters/whatchedArea'

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
        openHouse: string[]
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
    const [center , setCenter] = useState<[number , number]>([1,2])
    const [isOpenWatchedArea , setIsOpenWhatchedArea] = useState<boolean>(false)

    const [selectedMarker, setSelectedMarker] = useState<any | undefined>()

    const legalIcon = new Icon({
        iconUrl: LocationIcon,
        iconSize: [35, 35],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    })
  
    const [chat, setChat] = useState<any>([])
    const [search, setSearch] = useState<string>('')
    const [realData, setRealData] = useState<any[]>([])
    const {places} = useGetPlaces()
    const [listingMarkers , setListingMarkers] = useState<any[]>([])
    const [listings , setListings] = useState<any>()

    const { isLoadingListings} = useGetListings(setListingMarkers , setListings)
    const [selectedListings , setSelectedListings] = useState<any[]>([])
    const [isOpenSummeryModal , setIsOpenSummeryModal] = useState(false)


    const { mutateDetail } = useGetDiscriptions(setRealData)
    const { mutate } = useGetAiService(
        mutateDetail,
        setAIData,
        setChat,
        chat,
        search,
        setOpenChatAi,
        setRealData
    )
    // const { mutateFeatures } = useGetFeatures(mutateDetail, setAIData)
    const {mutatePropertyType} = useSetListingPropertyType(setListingMarkers , setListings)

    const [filters, setFilters] = useState<IFilters>(initialFilters)
    const navigate = useNavigate()


    useEffect(() => {
        mutatePropertyType(filters)
    }, [filters])

    const handleFindMarkerDetail = (value: any) => {
        const findMarkerDetail = listings?.listings.find(
            (item: any) =>
                Number(item.map.latitude) === Number(value.lat) &&
                Number(item.map.longitude) === Number(value.lng)
        )
        if (findMarkerDetail) {
            setSelectedMarker(findMarkerDetail)
        }
    }

    const calculateCenter = (coordinates : any) => {
        if (coordinates.length === 0) return [43.65107, -79.347015];
    
        const latSum = coordinates.reduce((acc : any, coord : any) => acc + coord[0], 0);
        const lngSum = coordinates.reduce((acc  : any, coord : any) => acc + coord[1], 0);
    
        const latCenter = latSum / coordinates.length;
        const lngCenter = lngSum / coordinates.length;

        return [latCenter, lngCenter];
    };

    useEffect(() => {
        if(listingMarkers){
            const newCenter= calculateCenter(listingMarkers)
            //@ts-ignore
            setCenter(newCenter)
        }
    } , [listingMarkers])



console.log("selectedMarker" , selectedMarker)

    return (
        <>
        {isLoadingListings && 
        <LoadingBar color="#0095a2" progress={isLoadingListings ? 60 : 100}
        height={3}
         />
        }
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
                            setSelectedListings = {setSelectedListings}
                            setIsOpenWhatchedArea = {setIsOpenWhatchedArea}
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
                    <div className=" w-[25%]  p-2 relative shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] border-l border-[#CCCBC8]">
                        <div className='  overflow-y-scroll h-full'>
                        <MoreFilters
                            setFilters={setFilters}
                            filters={filters}
                            setIsOpenActiveFilter={setIsOpenMoreFilters}
                        />
                        </div>
                       
                        <div className=' absolute right-3 top-3 z-10000 rounded-full cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white text-[#595653]'
                   onClick = {() => setIsOpenMoreFilters(false) }
                   ><CaretLeft size={26} /></div>
                     </div>
                  
                )}
                {selectedListings && selectedListings.length > 0 && (
                    <div className=" relative  w-[25%]  p-2 shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] border-l border-[#CCCBC8] ">
                        <div className='  overflow-y-scroll h-full'>
                        <SelectedListings data={selectedListings} setIsOpenSummeryModal = {setIsOpenSummeryModal} setSelectedMarker = {setSelectedMarker} />
                        </div>
                    
                   <div className=' absolute right-3 top-3 z-10000 rounded-full cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white text-[#595653]'
                   onClick = {() => setSelectedListings([]) }> 
                       <CaretLeft size={26} />
                   </div>
                     </div>
                )}
                {isOpenWatchedArea && (
                    <div className=" relative  w-[25%]  p-2 shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] border-l border-[#CCCBC8] ">
                        <div className='  overflow-y-scroll h-full'>
                       <WatchedArea setIsOpenSummeryModal = {setIsOpenSummeryModal} setSelectedMarker = {setSelectedMarker} />
                        </div>
                    
                   <div className=' absolute right-3 top-3 z-10000 rounded-full cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white text-[#595653]'
                   onClick = {() => setIsOpenWhatchedArea(false) }> 
                       <CaretLeft size={26} />
                   </div>
                     </div>
                )}
                <MapContainer
                    key={center.toString()} 
                    center={center}
                    zoom={7}
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
                    {listingMarkers.length > 0 && (
                        <MarkerClusterGroup
                        
                            chunkedLoading
                            showCoverageOnHover={false}
                            onClick={(e: any) => {
                                
                                if (e.layer.getAllChildMarkers().length > 1) {
                                   setSelectedMarker(undefined)
                                    const newChildrens  : any[] = []
                                    e.layer
                                        .getAllChildMarkers()
                                        .map((item: any) => {
                                            const findListings = listings.listings.find((item2 : any) => Number(item2.map.latitude) === Number( item._latlng.lat) && Number(item2.map.longitude) === item._latlng.lng )
                                           if(findListings){
                                            newChildrens.push(findListings)
                                           }
                                           
                                        })  
                                       
                                  setOpenChatAi(undefined)
                                  setIsOpenPropertyFilter(false)
                                  setIsOpenPriceFilter(false)
                                  setSelectedListings(newChildrens)
                                }
                            }}
                        >
                            {listingMarkers &&
                                listingMarkers.map((address: any, index: any) => (
                                    <Marker
                                    key={index}
                                    position={[address[0], address[1]]}
                                    eventHandlers={{
                                        click: (e) => {
                                            setSelectedListings([]);
                                            handleFindMarkerDetail(e.latlng);
                                        },
                                    }}
                                    icon={divIcon({
                                        className: 'custom-icon',
                                        html: `<div style="background-color: white; color:#4B8179;  text-align: center; padding: 1px;border-radius:10% / 25%;border : 2px solid #4B8179">$ ${ Math.floor(Number(listings?.listings.find((item:any) => 
                                            Number(item.map.latitude) === address[0] && 
                                            Number(item.map.longitude) === address[1]
                                            )?.originalPrice)).toLocaleString() || "N/A" }</div>`,
                                        iconSize: [80, 35],
                                    })}
                                    >
                                        {selectedMarker && (
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
                                                            width: 400,
                                                        }}
                                                        className=" relative"
                                                        bodyStyle={{
                                                            padding: '15px',
                                                        }}
                                                    >
                                                        {/* <a
                                                            target="_blank"
                                                            href={`${window.location.pathname}/detail/${selectedMarker?.images[0]}/${selectedMarker.map.latitude}/${selectedMarker.map.longitude}`}
                                                            className=" rounded-lg cursor-pointer"
                                                           
                                                        > */}
                                                            <div className='grid grid-cols-3 gap-2' onClick = {() => setIsOpenSummeryModal(true)}>
                                                            <img
                                                                src={`https://cdn.repliers.io/${selectedMarker?.images[0]}?class=small`}
                                                                alt="example"
                                                                className=" col-span-1"
                                                                style={{
                                                                    height : "100%",
                                                                    borderRadius : "10px"
                                                                }}
                                                            />
                                                            <div className=' col-span-2'>

                                                            <div className="flex justify-between text-sm items-center my-2">
                                                              
                                                                    <p className=" bg-[#E5F0A6] rounded-xl py-1 px-2 mr-1 text-[#7C951B]">
                                                                        {
                                                                            selectedMarker.type
                                                                        }
                                                                    </p>
                                                                    <p className=" mx-1 text-[#7F7C77]">
                                                                        {moment(new Date(selectedMarker.listDate)).format('YYYY-MM-DD')}
                                                                    </p>
                                                              
                                                                
                                                            </div>
                                                            <div className=" my-1 flex text-xs">
                                                                <MapPin
                                                                    size={18}
                                                                    className=" text-[#595653]"
                                                                />
                                                                <span className=" text-[#273A38]">
                                                                    {selectedMarker
                                                                        .address
                                                                        .city +
                                                                        ',' +
                                                                        selectedMarker
                                                                            .address
                                                                            .district +
                                                                        ',' +
                                                                        selectedMarker
                                                                            .address
                                                                            .majorIntersection}
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
                                                                </div>
                                                                <div className=" flex justify-between">
                                                                    
                                                                    <div className="flex text-xs">
                                                                        <Bed
                                                                            size={
                                                                                18
                                                                            }
                                                                            className=" text-[#595653]"
                                                                        />
                                                                        <span className=" mx-1 text-[#595653]">
                                                                            {
                                                                                selectedMarker.numRooms
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex text-xs">
                                                                        <Bathtub
                                                                            size={
                                                                                18
                                                                            }
                                                                            className=" text-[#595653]"
                                                                        />
                                                                        <span className=" mx-1 text-[#595653]">
                                                                            2
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex text-xs">
                                                                        <Car
                                                                            size={
                                                                                18
                                                                            }
                                                                            className=" text-[#595653]"
                                                                        />
                                                                        <span className=" mx-1 text-[#595653]">
                                                                            2
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>




                                                            </div>
                                                            </div>
                                                            
                                                           
                                                        {/* </a> */}
                                                    </Card>
                                                </div>
                                            </Popup>
                                        )}
                                       
                                    </Marker>
                                ))}
                        </MarkerClusterGroup>
                    )}











{listingMarkers.length > 0 && (
                        <MarkerClusterGroup
                        
                            chunkedLoading
                            showCoverageOnHover={false}
                            onClick={(e: any) => {
                                
                                if (e.layer.getAllChildMarkers().length > 1) {
                                   setSelectedMarker(undefined)
                                    const newChildrens  : any[] = []
                                    e.layer
                                        .getAllChildMarkers()
                                        .map((item: any) => {
                                            const findListings = listings.listings.find((item2 : any) => Number(item2.map.latitude) === Number( item._latlng.lat) && Number(item2.map.longitude) === item._latlng.lng )
                                           if(findListings){
                                            newChildrens.push(findListings)
                                           }
                                           
                                        })  
                                       
                                  setOpenChatAi(undefined)
                                  setIsOpenPropertyFilter(false)
                                  setIsOpenPriceFilter(false)
                                  setSelectedListings(newChildrens)
                                }
                            }}
                        >
                            {listingMarkers &&
                                listingMarkers.map((address: any, index: any) => (
                                    <Marker
                                    key={index}
                                    position={[address[0], address[1]]}
                                    eventHandlers={{
                                        click: (e) => {
                                            setSelectedListings([]);
                                            handleFindMarkerDetail(e.latlng);
                                        },
                                    }}
                                    icon={divIcon({
                                        className: 'custom-icon',
                                        html: `<div style="background-color: white; color:#4B8179;  text-align: center; padding: 5px;border-radius:10% / 25%;border : 2px solid #4B8179">$ ${ Math.floor(Number(listings?.listings.find((item:any) => 
                                            Number(item.map.latitude) === address[0] && 
                                            Number(item.map.longitude) === address[1]
                                            )?.originalPrice)).toLocaleString() || "N/A" }</div>`,
                                        iconSize: [80, 35],
                                    })}
                                    >
                                        {selectedMarker && (
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
                                                            width: 400,
                                                        }}
                                                        className=" relative"
                                                        bodyStyle={{
                                                            padding: '15px',
                                                        }}
                                                    >
                                                        {/* <a
                                                            target="_blank"
                                                            href={`${window.location.pathname}/detail/${selectedMarker?.images[0]}/${selectedMarker.map.latitude}/${selectedMarker.map.longitude}`}
                                                            className=" rounded-lg cursor-pointer"
                                                           
                                                        > */}
                                                            <div className='grid grid-cols-3 gap-2 relative' onClick = {() => setIsOpenSummeryModal(true)}>
                                                            <img
                                                                src={`https://cdn.repliers.io/${selectedMarker?.images[0]}?class=small`}
                                                                alt="example"
                                                                className=" col-span-1"
                                                                style={{
                                                                    height : "100%",
                                                                    borderRadius : "10px"
                                                                }}
                                                            />
                                                             <p className=" bg-[#E5F0A6] rounded-xl py-0.5 px-3 text-xs opacity-75 mr-1 text-[#7C951B] absolute top-0 left-1">
                                                                        {
                                                                            `${selectedMarker.type} - ${selectedMarker.details.propertyType}`
                                                                        }
                                                                        
                                                                    </p>
                                                            <div className=' col-span-2'>

                                                            <div className="flex justify-between text-sm items-center  -mt-2">
                                                              
                                                                   
                                                                    <p className=" mx-1 text-[#7F7C77]">
                                                                        {moment(new Date(selectedMarker.listDate)).format('YYYY-MM-DD')}
                                                                    </p>

                                                                    <p className=" mx-1 text-[#7F7C77]">
                                                                        {selectedMarker.mlsNumber}
                                                                    </p>
                                                              
                                                                
                                                            </div>
                                                            
                                                           
                                                            <div className=" my-1 flex text-xs">
                                                                <MapPin
                                                                    size={18}
                                                                    className=" text-[#595653]"
                                                                />
                                                                <span className=" text-[#273A38]">
                                                                    {selectedMarker
                                                                        .address
                                                                        .streetNumber +
                                                                        ' ' +
                                                                        selectedMarker
                                                                            .address
                                                                            .streetName +
                                                                        ' ' +
                                                                        selectedMarker
                                                                            .address
                                                                            .streetSuffix + ", " + selectedMarker.address.city}
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
                                                                </div>
                                                                <div className=" flex justify-between">
                                                                <div className="flex text-xs mx-2">
                                                                        <Bed
                                                                            size={
                                                                                18
                                                                            }
                                                                            className=" text-[#595653]"
                                                                        />
                                                                        <span className=" mx-1 text-[#595653]">
                                                                            {
                                                                                selectedMarker.details.numBedrooms
                                                                            }
                                                                            {
                                                                                selectedMarker.details.numbBedroomsPlus && ` + ${selectedMarker.details.numbBedroomsPlus}`
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex text-xs mx-2">
                                                                        <Bathtub
                                                                            size={
                                                                                18
                                                                            }
                                                                            className=" text-[#595653]"
                                                                        />
                                                                        <span className=" mx-1 text-[#595653]">
                                                                        {
                                                                                selectedMarker.details.numBathrooms
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    
                                                                    <div className="flex text-xs mx-2">
                                                                        <Car
                                                                            size={
                                                                                18
                                                                            }
                                                                            className=" text-[#595653]"
                                                                        />
                                                                        <span className=" mx-1 text-[#595653]">
                                                                            {Number(selectedMarker.details.numGarageSpaces)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>




                                                            </div>
                                                            </div>
                                                            
                                                           
                                                        {/* </a> */}
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
                open={isOpenSummeryModal && selectedMarker}
                onHide={() => setIsOpenSummeryModal(false)}
                data = {selectedMarker}
                
            />
        </>
    )
}

export default Map
