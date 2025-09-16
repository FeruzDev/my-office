import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const KeldiKetdi = () => {

    function getLocalTimeHHMMSS() {

        const now = new Date(); // Create a new Date object representing the current local time

        let hours = now.getHours(); // Get the current hour (0-23)
        let minutes = now.getMinutes(); // Get the current minute (0-59)
        let seconds = now.getSeconds(); // Get the current second (0-59)

        // Pad single-digit values with a leading zero for consistent formatting
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };


    const currentTime = getLocalTimeHHMMSS();

    return (
        <div className="keldi-ketdi-style">
            <div className="keldi-ketdi-header">
                <div className="row">
                    <div className="col-2">
                        <button>
                            <img src="/img/avatar.png" alt=""/>
                        </button>
                    </div>
                    <div className="col-8">
                        <h3>Xush kelibsiz</h3>
                        <p>Feruz Jalilov</p>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
            <div className="keldi-ketdi-content">
                <div className="row">
                    <div className="col-6">
                        <img src="/img/watch.png" alt="...."/>
                    </div>
                    <div className="col-6">
                        <h4>Local vaqt</h4>
                        <h3 className="fw-bold">{currentTime}</h3>
                    </div>
                </div>
            </div>
            <div className="keldi-ketdi-content-part-two">
                <h3>Mening lokatsiyam</h3>
                <div style={{ height: '25vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <AnyReactComponent
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>
            </div>

            <div className="keldi-ketdi-content">
                <div className="row">
                    <div className="col-6">
                        <h4>Hisobot</h4>
                        <h3 className="fw-bold">Bu hafta 6%</h3>
                    </div>
                    <div className="col-6">
                        <img src="/img/watch.png" alt="...."/>
                    </div>
                </div>
            </div>
            <div className="keldi-ketdi-footer">
                <div className="row">
                    <div className="col-6">
                        <button className="ketdi">
                            Ishdan<br/>ketish
                            <img src="/img/down.png" alt="..."/>
                        </button>
                    </div>
                    <div className="col-6">
                        <button className="keldi">

                        Ishga<br/>kelish
                        <img src="/img/up.png" alt="..."/>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeldiKetdi;