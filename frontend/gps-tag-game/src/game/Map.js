import React, {useEffect, useState} from "react"
import img from "../pola_mokotowskie.png"
import MapBorders from "./MapBorders"

const userPos = [52.210554, 20.995727]
const userPost2 = [52.214108, 20.988825]

const SCALE = -0.5
const Map = ({holderSize}) => {
    const [imgSize, setImgSize] = useState({height: 0, width: 0});

    useEffect(() => {
        const image = new Image()
        image.src = img;
        console.log(image)
        image.onload = () => setImgSize({height: image.height, width: image.width})
    }, []);

    const userPoint = calculateUserPoint(imgSize, holderSize)
    const mapStyle = {
        top: `${userPoint[0]}px`,
        left: `${userPoint[1]}px`
    };
    return (
        <>
            <img src={img} alt='map' style={mapStyle}/>
            <span className="player"/>
        </>
    );
}

export default Map;

function calculateUserPoint(imgSize, holderSize) {
    if (!imgSize.height || !imgSize.width) {
        return [0, 0]
    }
    const userRelativePos = [MapBorders.N - userPost2[0],  userPost2[1] - MapBorders.W]
    const imgScale = [imgSize.height / (MapBorders.N - MapBorders.S), imgSize.width / (MapBorders.E - MapBorders.W)]
    const userPoint = [(userRelativePos[0] * imgScale[0]) * SCALE + holderSize.height* 0.5 , (userRelativePos[1] * imgScale[1]) * SCALE + holderSize.width* 0.5 ]
    console.log(userRelativePos)
    console.log(imgScale)
    console.log(imgSize)
    console.log(userPoint)
    return userPoint
}