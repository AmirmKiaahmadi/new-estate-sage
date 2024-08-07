import MarkerClusterGroup from 'react-leaflet-cluster'
import {
    FeatureGroup,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    ZoomControl,
    useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { addressPoints } from './utils'
import { Icon, LatLng, divIcon } from 'leaflet'
import LocationIcon from 'assets/images/map/location.png'
import { popupContent, popupHead, popupText, okText } from './popUp/style'
import House from 'assets/images/house/5c261_1.jpg'
import { useNavigate } from 'react-router-dom'
import { Card, Spin } from 'antd'
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
import { formatPrice } from 'utilities/helper/formatPrice'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import useGetClusters from './hooks/useGetClusters'
import useGetSmallerListings from './hooks/useGetSmallerListings'
import "./style.css"
import useGetSearch from './hooks/useGetSearch'

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
    const [allMarkers, setAllMarkers] = useState<any[]>([]);
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
    const [center , setCenter] = useState<[number , number]>([43.65107, -79.347015])
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
    const [drawnPolygons, setDrawnPolygons] = useState([]);
    const [currentViewPolygon, setCurrentViewPolygon] = useState<any>([
        [
            [
                -79.44591700119429,
                43.57069055225934
            ],
            [
                -79.25743280929976,
                43.57069055225934
            ],
            [
                -79.25743280929976,
                43.736623487867654
            ],
            [
                -79.44591700119429,
                43.736623487867654
            ],
            [
                -79.44591700119429,
                43.57069055225934
            ]
        ]
    ]);
    const [listingMarkers , setListingMarkers] = useState<any[]>([])
    const [listings , setListings] = useState<any>()
    const [isDraw , setIsDraw] = useState(false)
    const searchMlsNumber = useSelector((state : RootState)  => state.sideBarControler.mlsNumber)
    const {clusters , refetchCluster} = useGetClusters(setListingMarkers , currentViewPolygon , setListings)
    const { isLoadingListings, lastData} = useGetListings(setListingMarkers , setListings , listings , currentViewPolygon , isDraw , searchMlsNumber , setAllMarkers , refetchCluster)
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
    const {mutatePropertyType} = useSetListingPropertyType(setListingMarkers , setListings)

    const [filters, setFilters] = useState<IFilters>(initialFilters)
    const navigate = useNavigate()

    const handleFindMarkerDetail = (value: any) => {
        const findMarkerDetail = listings?.find(
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
        if(listingMarkers && !isDraw && !searchMlsNumber && openChatAi ){
            const newCenter= calculateCenter(listingMarkers)
            //@ts-ignore
            setCenter(newCenter)
        }
    } , [listingMarkers])
    

    const MapEvents = () => {
        const map = useMap();

        useEffect(() => {
            if(!isDraw && !searchMlsNumber){
                const handleViewChange = (e: any) => {
                    const bounds = map.getBounds();
                    const southwest = bounds.getSouthWest();
                    const northeast = bounds.getNorthEast();
                    
    
                    const polygon = [
                        [
                            [ southwest.lng , southwest.lat],
                            [ northeast.lng , southwest.lat],
                            [ northeast.lng , northeast.lat],
                            [ southwest.lng , northeast.lat],
                        [ southwest.lng , southwest.lat], 
                    ],
                    ];
    
                    setCurrentViewPolygon(polygon);
                };
    
                map.on('moveend', handleViewChange);
                return () => {
                    map.off('moveend', handleViewChange);
                };
            }
            
        }, [map]);

        return null;
    };

    const handlePolygonCreated = (e: any) => {
        const coords = e.layer.getLatLngs();
        
        const newpol: any[] = coords[0].map((item: any) => [item.lng, item.lat]);
        //@ts-ignore
        setDrawnPolygons((prevDrawnPolygons) => {
            const updatedPolygons = prevDrawnPolygons.length > 0 ? [...prevDrawnPolygons, newpol] : [newpol];
            setCurrentViewPolygon(updatedPolygons);
            return updatedPolygons;
        });
    };
    const { mutateSimilar , isLoadingSimilar } = useGetSmallerListings(setSelectedListings)
    const {mutateSearch} = useGetSearch(setListingMarkers)
    useEffect(() => {
        if(searchMlsNumber){
            mutateSearch(searchMlsNumber)
        }else{
            refetchCluster()
        }
    } , [searchMlsNumber])
    return (
        <>
        {isLoadingListings && 
        <LoadingBar color="#0095a2" progress={isLoadingListings ? 60 : 100}
        height={5}
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
                            mutatePropertyType = {mutatePropertyType}
                            
                        />
                    </div>
                )}
                {isOpenPriceFilter && (
                    <div className=" h-full w-[25%]  p-2 relative shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] border-l border-[#CCCBC8] overflow-y-scroll ">
                        <PriceFilter
                            setFilters={setFilters}
                            filters={filters}
                            setIsOpenPriceFilter={setIsOpenPriceFilter}
                            mutatePropertyType = {mutatePropertyType}
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
                            mutatePropertyType = {mutatePropertyType}
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
                    zoom={6}
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
                            onCreated={handlePolygonCreated}
                            onDrawStart={() => setIsDraw(true)} 
                            onDeleted={() => {
                               
                                setIsDraw(false)
                                setDrawnPolygons([])
                            }}
                            onDeleteStart={() => {
                                setCenter([43.65107, -79.347015])
                                setIsDraw(false)
                                setDrawnPolygons([])
                            }}
                           
                            
                            
                        />
                    </FeatureGroup>
                    <ZoomControl position="bottomright" />
                    <MapEvents />
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
                                
                                // if (e.layer.getAllChildMarkers().length > 1) {
                                //    setSelectedMarker(undefined)
                                //     const newChildrens  : any[] = []
                                //     e.layer
                                //         .getAllChildMarkers()
                                //         .map((item: any) => {
                                //             const findListings = listings.find((item2 : any) => Number(item2.map.latitude) === Number( item._latlng.lat) && Number(item2.map.longitude) === item._latlng.lng )
                                //            if(findListings){
                                //             newChildrens.push(findListings)
                                //            }
                                           
                                //         })  
                                       
                                //   setOpenChatAi(undefined)
                                //   setIsOpenPropertyFilter(false)
                                //   setIsOpenPriceFilter(false)
                                //   setSelectedListings(newChildrens)
                                // }
                            }}
                        >
                            {listingMarkers &&
                                listingMarkers.map((address: any, index: any) => {
                                        return (
                                            <Marker
                                    key={index}
                                    position={[address[0], address[1]]}
                                    eventHandlers={{
                                        click: (e) => {
                                          if(address[2] !== '571'){
                                            setSelectedListings([]);
                                            setSelectedMarker(undefined)
                                            mutateSimilar({lat : address[0] , lng : address[1]})
                                          }else{
                                              setSelectedMarker(listings)
                                              setSelectedListings([]);
                                            //   handleFindMarkerDetail(e.latlng);
                                          }
                                        },
                                    }}
                                    icon={divIcon({
                                        className: 'custom-icon',
                                       html: address[2] === '571'
      ? `<div style="background-color: white; color:#4B8179; text-align: center; padding: 3px; border-radius:10% / 25%; border: 2px solid #4B8179;">${formatPrice(listings.listPrice) || "N/A"}</div>`
      : `<div style="background-color: white; text-align: center; padding: 10px 0; border : 2px solid #4B8179; color:#4B8179 ;border-radius:100%; box-shadow: 0 4px 8px rgba(51, 67, 42, 0.6);display:flex; justify-content: center;align-items:center">${isLoadingSimilar ? '<div class="custom-spinner"></div>' : address[2]}</div>`,
    iconSize: address[2] === '571' ? [80, 80] : [40, 40],
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
                                                                            `${selectedMarker.type}`
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
                                                            <div className=''>
                                                            <hr className=' w-full text-[#EBEAE9]' />
                                                                <span className=' bg-[#4B8179] py-1 px-2 rounded-full text-xs text-white mt-2 '>{selectedMarker.details.propertyType}</span>
                                                            </div>
                                                            
                                                            </div>
                                                            </div>
                                                            
                                                           
                                                    
                                                    </Card>
                                                </div>
                                            </Popup>
                                        )}
                                       
                                    </Marker>
                                        )
                                    
                                })}
                        </MarkerClusterGroup>
                    )}








                    
                </MapContainer>
            </div>
            {
                selectedMarker && 
                <DetailModal
                open={isOpenSummeryModal && selectedMarker}
                onHide={() => setIsOpenSummeryModal(false)}
                selectedMarker = {selectedMarker}
                
            />
            }
           
        </>
    )
}

export default Map
