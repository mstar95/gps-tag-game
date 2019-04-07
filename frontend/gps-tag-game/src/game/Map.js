import React, {useEffect, useState} from "react"
import img from "../pola_mokotowskie.png"
import MapBorders from "./MapBorders"
import "./radar.css"
import Radar from './radar'
import Player from './Player'

const SCALE = -0.5
const Map = ({holderSize, players, user}) => {
    const [imgSize, setImgSize] = useState({height: 0, width: 0});

    useEffect(() => {
        const image = new Image()
        image.src = img;
        image.onload = () => setImgSize({height: image.height, width: image.width})
    }, []);

    const userPoint = calculateUserPoint(imgSize, holderSize, user)
    const mapStyle = {
        top: `${userPoint[0]}px`,
        left: `${userPoint[1]}px`
    };

    const userStyle = {
        ['backgroundColor']: `${user.berek ? "red" : "#0059ff"}`
    };
    return (
        <>
            <img src={img} alt='map' style={mapStyle}/>
            <Radar berek={user.berek}/>
            <span className="player" style={userStyle}/>
            {players.map((player, id) => <Player player={player} imgSize={imgSize} mapPos={userPoint} berek={user.berek} key={id}/>)}
        </>
    );
}

export default Map;

function calculateUserPoint(imgSize, holderSize, userPos) {
    if (!imgSize.height || !imgSize.width) {
        return [0, 0]
    }
    const userRelativePos = [MapBorders.N - userPos.positionY, userPos.positionX - MapBorders.W]
    const imgScale = [imgSize.height / (MapBorders.N - MapBorders.S), imgSize.width / (MapBorders.E - MapBorders.W)]
    const userPoint = [(userRelativePos[0] * imgScale[0]) * SCALE + holderSize.height * 0.5, (userRelativePos[1] * imgScale[1]) * SCALE + holderSize.width * 0.5]
    return userPoint
}

