import React from 'react';
import {Button, Modal} from "antd";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});


const GeoModal = ({lat, lot, isModalOpen, setisModalOpen}) => {



    return (
            <Modal
                title=""
                closable={{'aria-label': 'Custom Close Button'}}
                open={isModalOpen}
                onCancel={() => setisModalOpen(false)}
                footer={
                 ""
                }
            >
                <div className="view-map pt-4">
                    <MapContainer
                        center={[lat, lot]}
                        zoom={13}
                        style={{ height: "320px", width: "100%" }}
                    >
                        {/* OSM tileLayer bepul */}
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                        />

                        <Marker position={[lat, lot]}>
                            <Popup>
                               City
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>

            </Modal>
    );
};

export default GeoModal;