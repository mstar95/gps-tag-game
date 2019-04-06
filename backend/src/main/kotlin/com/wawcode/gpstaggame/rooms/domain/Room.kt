package com.wawcode.gpstaggame.rooms.domain

import java.util.*

data class Room(val id: UUID = UUID.randomUUID(), val hostId: UUID, val name: String, val capacity: Int, val membersCount: Int)