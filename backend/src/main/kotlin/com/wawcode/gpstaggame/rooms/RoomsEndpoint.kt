package com.wawcode.gpstaggame.rooms

import com.wawcode.gpstaggame.rooms.domain.Room
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import java.util.*

@RestController
@CrossOrigin("*")
@RequestMapping("rooms")
class RoomsEndpoint {

    @GetMapping
    fun getRooms() = Mono.just(listOf(Room(hostId = UUID.randomUUID(), name = "xd", capacity = 10, membersCount = 5),
            Room(hostId = UUID.randomUUID(), name = "xd", capacity = 10, membersCount = 5)
    ))
}