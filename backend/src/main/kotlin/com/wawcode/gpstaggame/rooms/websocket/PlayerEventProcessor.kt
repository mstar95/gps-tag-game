package com.wawcode.gpstaggame.rooms.websocket

import com.fasterxml.jackson.databind.ObjectMapper
import com.wawcode.gpstaggame.rooms.domain.Room
import com.wawcode.gpstaggame.rooms.domain.RoomsRepository
import org.springframework.stereotype.Component
import org.springframework.web.reactive.socket.WebSocketHandler
import org.springframework.web.reactive.socket.WebSocketMessage
import org.springframework.web.reactive.socket.WebSocketSession
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Component
class PlayerEventProcessor(val roomsRepository: RoomsRepository, val objectMapper: ObjectMapper): WebSocketHandler {

    override fun handle(webSocketSession: WebSocketSession): Mono<Void> {
        val output: Flux<WebSocketMessage> = webSocketSession.receive()
                .doOnNext {
                    val room: Room = objectMapper.convertValue(it.payloadAsText, Room::class.java)
                    roomsRepository.findById(room.id).map { Room(it.name, it.hostId, it.capacity, room.players, it.id) }.flatMap { roomsRepository.save(it) }
                }

                //todo add jackson mapper, map to object
                                                // get room-id from stream, find room from repo, get players position from stream, update room players, save room
                .log()

        return webSocketSession.send(output)
    }
}