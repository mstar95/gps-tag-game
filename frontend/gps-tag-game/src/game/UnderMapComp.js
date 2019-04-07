import React from "react"
import "./radar.css"
import {getBerekClient} from "../enemy/berekService"

const UnderMapComponent = ({user, players, roomId, catchCallback}) => {

    const client = getBerekClient(catchCallback)
    const playerToCatch = findToCatch(user, players)
    console.log(playerToCatch)
    function catchBerek() {
        console.log("dis")
        if(playerToCatch) {
            client.catchBerek({oldId: user.id, newId: playerToCatch.id, roomId})
        }
    }

    const name= playerToCatch ? "catch" : 'dis-catch'

    return user.berek ? (<button className={name} disabled={playerToCatch == null} onClick={() => catchBerek()}> Łap</button>) : (
        <div className="run">Uciekaj</div>)
}

export default UnderMapComponent

function findToCatch(user, players) {
    const player = players.map(pl => ({
        ...pl,
        distance: measure(user.positionY, user.positionX, pl.positionY, pl.positionX)
    }))
        .sort((a, b) => a.distance - b.distance)[0]
    return player.distance < 5 ? player : null
}


function measure(lat1, lon1, lat2, lon2) {  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
}