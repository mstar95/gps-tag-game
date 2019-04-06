package com.wawcode.gpstaggame.rooms

import com.wawcode.gpstaggame.rooms.domain.Player
import com.wawcode.gpstaggame.rooms.domain.Room
import com.wawcode.gpstaggame.rooms.domain.RoomsRepository
import com.wawcode.gpstaggame.rooms.dto.RoomRequest
import io.github.benas.randombeans.api.EnhancedRandom
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import java.util.*

@RestController
//@CrossOrigin("*")
@RequestMapping("rooms")
class RoomsEndpoint(val roomsRepository: RoomsRepository) {

    @GetMapping
    fun getRooms() = roomsRepository.findAll()

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun postRoom(@RequestBody roomRequest: RoomRequest) = roomsRepository.save(Room(roomRequest.name,
            UUID.fromString(roomRequest.hostId), roomRequest.capacity, roomRequest.players))

    @PostMapping("/{id}/players")
    fun postRoomPlayer(@PathVariable id: String, @RequestBody player: Player): Mono<Room> {
        val room: Mono<Room> = roomsRepository.findById(id)
        return room.map { Room(it.name, it.hostId, it.capacity, it.players + player, it.id) }
                .flatMap { roomsRepository.save(it) }
    }

    @PostMapping("/test")
    @ResponseStatus(HttpStatus.CREATED)
    fun loadTestData() =
        roomsRepository.saveAll(EnhancedRandom.randomListOf(6, Room::class.java, "id", "players").map { Room(it.name, it.hostId, it.capacity,
                EnhancedRandom.randomListOf(10, Player::class.java, "id").map { Player(it.positionX, it.positionY, it.isBerek) }) })

    @DeleteMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    fun deleteAllData() = roomsRepository.deleteAll()
}