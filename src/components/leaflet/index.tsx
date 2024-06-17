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
    const navigate = useNavigate()
    const legalIcon = new Icon({
        iconUrl: LocationIcon,
        iconSize: [35, 35],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    })
    const query = 'show me apartment with 2 room'
    const { mutate } = useGetAiService()

    useEffect(() => {
        mutate(query)
    }, [])

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
                        <Filters setOpenChatAi={setOpenChatAi} />
                    </div>
                )}
                {openChatAi && (
                    <div className=" h-full w-[25%]  p-2 relative shadow-[21px 7px 35px -3px rgba(0,0,0,0.48)] border-l border-[#CCCBC8] overflow-y-scroll ">
                        <AiChatFilters />
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
                        {addressPoints.map((address, index) => (
                            <Marker
                                key={index}
                                position={[address[0], address[1]]}
                                title={address[2]}
                                icon={legalIcon}
                            >
                                <Popup>
                                    <div
                                        style={popupContent}
                                        className=" cursor-pointer"
                                        onClick={() => setOpenDetail(true)}
                                    >
                                        <Card
                                            hoverable
                                            style={{
                                                width: 500,
                                            }}
                                            className=" relative"
                                            bodyStyle={{ padding: '15px' }}
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
                                                    <span>Detached</span>
                                                    <div className="flex items-center mt-2">
                                                        <FaLocationDot
                                                            color="#009579"
                                                            size={15}
                                                        />

                                                        <span className=" text-sm mx-1 ">
                                                            Toronto -
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
                        ))}
                    </MarkerClusterGroup>
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
