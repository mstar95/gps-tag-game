import React from "react"
import "./radar.css"

const UnderMapComponent = ({user, players}) => {

    function catchBerek() {
        getBerekClient().catchBerek()
    }

    return user.berek ? (<button className="catch"> Łap</button>) : (<div className="run">Uciekaj</div>)
}

export default UnderMapComponent

