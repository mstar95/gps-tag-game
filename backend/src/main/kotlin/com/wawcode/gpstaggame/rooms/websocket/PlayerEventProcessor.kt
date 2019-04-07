package com.wawcode.gpstaggame.rooms.websocket

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.wawcode.gpstaggame.rooms.domain.Player
import com.wawcode.gpstaggame.rooms.domain.Room
import com.wawcode.gpstaggame.rooms.domain.RoomsRepository
import com.wawcode.gpstaggame.rooms.dto.RoomWebsocketRequest
import org.springframework.stereotype.Component
import org.springframework.web.reactive.socket.WebSocketHandler
import org.springframework.web.reactive.socket.WebSocketMessage
import org.springframework.web.reactive.socket.WebSocketSession
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@Component
class PlayerEventProcessor(val roomsRepository: RoomsRepository, val objectMapper: ObjectMapper) : WebSocketHandler {

    override fun handle(webSocketSession: WebSocketSession): Mono<Void> {
        val output: Flux<WebSocketMessage> = webSocketSession.receive()
                .map {
                    objectMapper.readValue<RoomWebsocketRequest>(it.payloadAsText)
                }.flatMap { room ->
                    roomsRepository.findById(room.id)
                            .doOnSuccess { println(it) }
                            .map { Room(it.name, it.hostId, it.capacity, it.players.updatePlayer(room), it.id) }
                            .flatMap { roomsRepository.save(it) }
                }.map { value -> webSocketSession.textMessage(objectMapper.writeValueAsString(value.players)) }
        return webSocketSession.send(output)
    }
}

fun List<Player>.updatePlayer(request: RoomWebsocketRequest) = this.map {
    if (it.id == request.playerId)
        it.copy(positionX = request.positionX, positionY = request.positionY)
    else it
}