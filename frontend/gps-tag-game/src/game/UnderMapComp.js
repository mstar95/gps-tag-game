import React from "react"
import "./radar.css"
import {getBerekClient} from "../enemy/berekService"

const UnderMapComponent = ({user, players, roomId, catchCallback}) => {

    const client = getBerekClient(catchCallback)
    function catchBerek() {
        client.catchBerek({oldId: user.id, newId: 123456, roomId})
    }

    return user.berek ? (<button className="catch" onClick={() => catchBerek()}> Łap</button>) : (<div className="run">Uciekaj</div>)
}

export default UnderMapComponent

