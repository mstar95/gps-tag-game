package com.wawcode.gpstaggame.rooms.domain

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document(collection = "rooms")
data class Room(val name: String, val hostId: UUID, val capacity: Int, val players: List<Player> = emptyList(), @Id val id: String = UUID.randomUUID().toString())