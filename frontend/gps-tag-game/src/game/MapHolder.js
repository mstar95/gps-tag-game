import React, {useEffect, useRef, useState} from "react"
import Map from "./Map"
import UnderMapComponent from "./UnderMapComp"

const MapHolder = ({user, players, roomId, catchCallback}) => {
    const [mapSize, setMapSize] = useState({height: 0, width: 0});

    const ref = useRef(null)
    useEffect(() => {
        setMapSize({height: ref.current.clientHeight, width: ref.current.clientWidth})
    }, []);
    return (
        <>
            <div className="map-container" ref={ref}>
                <Map holderSize={mapSize} user={user} players={players}/>
            </div>
            <div className="under-map">
                <UnderMapComponent user={user} players={players} roomId={roomId} catchCallback={catchCallback}/>
            </div>
        </>);
}

export default MapHolder;
