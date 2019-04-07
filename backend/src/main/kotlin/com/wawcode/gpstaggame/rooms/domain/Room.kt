package com.wawcode.gpstaggame.rooms.domain

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document(collection = "rooms")
data class Room(var name: String, var hostId: String, var capacity: Int, var players: List<Player> = emptyList(), @Id var id: String = UUID.randomUUID().toString())