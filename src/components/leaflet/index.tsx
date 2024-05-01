import MarkerClusterGroup from 'react-leaflet-cluster'
import {
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
const Map = () => {
    const navigate = useNavigate()
    const legalIcon = new Icon({
        iconUrl: LocationIcon,
        iconSize: [35, 35],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    })
    return (
        <MapContainer
            center={[43.65107, -79.347015]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />
            <MarkerClusterGroup chunkedLoading>
                {addressPoints.map((address, index) => (
                    <Marker
                        key={index}
                        position={[address[0], address[1]]}
                        title={address[2]}
                        icon={legalIcon}
                    >
                        <Popup className="request-popup">
                            <div
                                style={popupContent}
                                className=" cursor-pointer"
                                onClick={() => navigate('/map/detail')}
                            >
                                <img
                                    src={House}
                                    width="150"
                                    height="150"
                                    alt="fuck"
                                />
                                <div>
                                    <div className="m-2" style={popupHead}>
                                        Success!
                                    </div>
                                    <span style={popupText}>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempo...
                                    </span>
                                    <div className="m-2" style={okText}>
                                        Okay
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default Map
