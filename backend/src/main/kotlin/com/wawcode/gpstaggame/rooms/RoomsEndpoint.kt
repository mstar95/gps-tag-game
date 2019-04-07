package com.wawcode.gpstaggame.rooms

import com.wawcode.gpstaggame.rooms.domain.Player
import com.wawcode.gpstaggame.rooms.domain.Room
import com.wawcode.gpstaggame.rooms.domain.RoomsRepository
import com.wawcode.gpstaggame.rooms.dto.PlayerRequest
import com.wawcode.gpstaggame.rooms.dto.RoomRequest
import com.wawcode.gpstaggame.users.domain.UsersRepository
import io.github.benas.randombeans.api.EnhancedRandom
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import java.util.*

@RestController
@CrossOrigin("*")
@RequestMapping("rooms")
class RoomsEndpoint(val roomsRepository: RoomsRepository, val usersRepository: UsersRepository) {

    @GetMapping
    fun getRooms() = roomsRepository.findAll()

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun postRoom(@RequestBody roomRequest: RoomRequest) = roomsRepository.save(Room(roomRequest.name,
           roomRequest.hostId, roomRequest.hostName, roomRequest.capacity, roomRequest.players))

    @PostMapping("/{id}/players")
    fun postRoomPlayer(@PathVariable id: String, @RequestBody player: PlayerRequest): Mono<Room> {
        val room: Mono<Room> = roomsRepository.findById(id)
        return room.map { it.copy( players =  it.players + Player(player.positionX, player.positionY, it.players.isEmpty(), player.id)) }
                .flatMap { roomsRepository.save(it) }
    }

    @GetMapping("/{id}/players")
    fun getRoomPlayers(@PathVariable id: String): Mono<List<Player>> {
        val room: Mono<Room> = roomsRepository.findById(id)
        return room.map { it.players }
    }

    @PostMapping("/test")
    @ResponseStatus(HttpStatus.CREATED)
    fun loadTestData() =
        roomsRepository.saveAll(EnhancedRandom.randomListOf(6, Room::class.java, "id", "players").map { Room(it.name, it.hostId, it.hostName, it.capacity,
                EnhancedRandom.randomListOf(10, Player::class.java, "id").map { Player(it.positionX, it.positionY, it.isBerek) }) })

    @GetMapping("/reset")
    @ResponseStatus(HttpStatus.CREATED)
    fun reset() = roomsRepository.save(Room("xd", "123456", "marek95", 10, listOf(
                        Player(20.993555, 52.210667, false, "123456"),
                        Player(20.991341, 52.210973, false, "123457"),
                        Player(20.992381, 52.211590, false, "123458"),
                        Player(20.995555, 52.214667, true, "12345"))))

    @DeleteMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    fun deleteAllData() = roomsRepository.deleteAll()
}