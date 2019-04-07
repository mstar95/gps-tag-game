import React from "react"
import "./radar.css"

const UnderMapComponent = ({isBerek}) => isBerek ? (<button className="catch"> Łap</button>) : (<div className="run">Uciekaj</div>)

export default UnderMapComponent