import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';


interface City {
    _id: string,
    name: string,
    weather: string,
    img: string,
    temp_min: number,
    temp_max: number,
    lon: number,
    lat: number
}
interface LeafletProps {
    cities: City[];
}

const Leaflet = ({ cities }: LeafletProps) => {

    return (
        <MapContainer center={[48.866667, 2.333333]} zoom={4} scrollWheelZoom={false} style={{ width: '500px', height: '500px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cities.map((city) => (
                <Marker position={[city.lat, city.lon]} key={city._id}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        <div>
                            <h2>{city.name}</h2>
                            <p>dz</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default Leaflet;