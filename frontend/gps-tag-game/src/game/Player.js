import React from "react"
import MapBorders from "./MapBorders"

const SCALE = 0.5

const Player = ({player, imgSize, mapPos, isBerek}) => {
    const playerPos = calculatePlayer(imgSize, player, mapPos)

    const playerStyle = {
        top: `${playerPos[0]}px`,
        left: `${playerPos[1]}px`,
        backgroundColor: isBerek ? " #0059ff" : player.isBerek ? "red" : "green"
    };
    return (<span className="enemy" style={playerStyle}/>)
}

export default Player

function calculatePlayer(imgSize, userPos, mapPos) {
    if (!imgSize.height || !imgSize.width) {
        return [0, 0]
    }
    const userRelativePos = [MapBorders.N - userPos.positionY, userPos.positionX - MapBorders.W]
    const imgScale = [imgSize.height / (MapBorders.N - MapBorders.S), imgSize.width / (MapBorders.E - MapBorders.W)]
    const userPoint = [(userRelativePos[0] * imgScale[0]) * SCALE, (userRelativePos[1] * imgScale[1]) * SCALE]
    const final = [userPoint[0] + mapPos[0], userPoint[1] + mapPos[1]]

    return final
}