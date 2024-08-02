import { LatLng } from 'leaflet'
import { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

type TLocationMapProps = {
    center?: any
    selectLocation: React.Dispatch<React.SetStateAction<any | undefined>>
    height? : string
}

const iconPerson = new L.Icon({
    iconUrl: require('../../assets/images/map/location.png'),
    iconRetinaUrl: require('../../assets/images/map/location.png'),
    iconSize: new L.Point(30, 50),
    className: '',
})

export { iconPerson }

function LocationMarker({ selectLocation, center }: TLocationMapProps) {
    const [position, setPosition] = useState<LatLng>({
        lat: center?.lat || 0,
        lng: center?.lng || 0,
    } as LatLng)
    // const map = useMapEvents({
    //     click(e) {
    //         setPosition(e.latlng)
    //         selectLocation(e.latlng)
    //         map.flyTo(e.latlng, map.getZoom())
    //     },
    // })

    return position === undefined ? null : (
        <Marker position={position} icon={iconPerson}></Marker>
    )
}

const LocationMap = ({ center, selectLocation , height }: TLocationMapProps) => {
    return (
        <>
            <MapContainer
                attributionControl={false}
                zoomControl={true}
                doubleClickZoom={false}
                scrollWheelZoom={true}
                id={'map'}
                zoom={16}
                center={center}
                style={{ width: '100%', height: height ? height :  '400px', borderRadius: '10px' }}
                easeLinearity={0.35}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker
                    center={center}
                    selectLocation={selectLocation}
                />
            </MapContainer>
        </>
    )
}

export default LocationMap
