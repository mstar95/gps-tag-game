import React, {useEffect, useState} from "react"
import {getClient} from "../enemy/playerService"
import gps from "../gps/gps"
import MapHolder from "./MapHolder"

const MapPage = (props) => {
    const {id, roomId} = props.match.params
    const [user, setUser] = useState(null);
    const [players, setPlayers] = useState([]);
    console.log(user)

    useEffect(() => {
        setGpsInterval(setPlayers, setUser, id, roomId)
    }, []);


    return !user ? <div> Ladowanie Gry</div> : <MapHolder user={user} players={players}/>;
}

export default MapPage;

function setGpsInterval(setPlayers, setUser,  playerId, roomId) {
    let client = getClient((rooms) => updateRoom(rooms, setPlayers,setUser, playerId))

    setInterval(() => getGpsPos((location) => client.sendLocation(toPLayer(location, roomId, playerId))), 1000)
}

function updateRoom(players, setPlayers, setUser, playerId) {
    setPlayers(players.filter(player => player.id != playerId))
    setUser(players.find(player => player.id == playerId))
}

async function getGpsPos(callback) {
    const location = await gps()
    console.log(location)

    callback(location)
}

function toPLayer(location, roomId, playerId) {
    return {
        positionX: location.lng,
        positionY: location.lat,
        id: roomId,
        playerId: playerId
    }
}


