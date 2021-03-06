package com.wawcode.gpstaggame.rooms.dto

import com.wawcode.gpstaggame.rooms.domain.Player
import java.util.*

data class RoomRequest( val name: String, val hostId: String, val hostName: String, val capacity: Int, val players: List<Player>)

data class RoomWebsocketRequest(val id: String, val playerId: String, val positionX: Double, val positionY: Double)

data class PlayerRequest(val id: String = UUID.randomUUID().toString(),
                         val positionX: Double,
                         val positionY: Double)
