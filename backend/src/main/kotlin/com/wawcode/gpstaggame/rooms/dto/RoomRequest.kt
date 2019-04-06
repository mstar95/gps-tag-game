package com.wawcode.gpstaggame.rooms.dto

import com.wawcode.gpstaggame.rooms.domain.Player

data class RoomRequest( val name: String, val hostId: String, val capacity: Int, val players: List<Player>)