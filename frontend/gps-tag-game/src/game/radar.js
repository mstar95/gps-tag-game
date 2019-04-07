import React from "react"
import "./radar.css"
import "./radarEnemy.css"


const radar = ({isBerek}) => (
    <ul className={isBerek ? "radarEnemy" : "radar"}>
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