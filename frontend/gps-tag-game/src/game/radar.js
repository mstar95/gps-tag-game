import React from "react"
import "./radar.css"
import "./radarEnemy.css"


const radar = ({berek}) => (
    <ul className={berek ? "radarEnemy" : "radar"}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>)

export default radar