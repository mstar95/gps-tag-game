import React, {useEffect, useRef, useState} from "react"
import Map from "./Map"

const MapHolder = () => {
    const [mapSize, setMapSize] = useState({height: 0, width: 0});
    const ref = useRef(null)
    useEffect(() => {
        setMapSize({height: ref.current.clientHeight, width: ref.current.clientWidth})
    }, []);
    return (
    <div className="map-container" ref={ref}>
       <Map holderSize={mapSize}/>
    </div>
);}

export default MapHolder;

