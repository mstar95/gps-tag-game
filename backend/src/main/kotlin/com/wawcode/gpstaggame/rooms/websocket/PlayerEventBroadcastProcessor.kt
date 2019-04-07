package com.wawcode.gpstaggame.rooms.websocket

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.wawcode.gpstaggame.rooms.domain.Player
import com.wawcode.gpstaggame.rooms.domain.Room
import com.wawcode.gpstaggame.rooms.domain.RoomsRepository
import com.wawcode.gpstaggame.rooms.dto.BerekRequest
import com.wawcode.gpstaggame.rooms.dto.RoomWebsocketRequest
import org.springframework.stereotype.Component
import org.springframework.web.reactive.socket.WebSocketHandler
import org.springframework.web.reactive.socket.WebSocketMessage
import org.springframework.web.reactive.socket.WebSocketSession
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.publisher.UnicastProcessor
import java.util.*


@Component
class PlayerEventBroadcastProcessor(val roomsRepository: RoomsRepository, val objectMapper: ObjectMapper,
                           val eventPublisher: UnicastProcessor<Room>,
                           val roomFlux: Flux<Room>) : WebSocketHandler {

    override fun handle(webSocketSession: WebSocketSession): Mono<Void> {
        val subscriber = WebSocketMessageSubscriber(eventPublisher)
        webSocketSession.receive()
                .map {
                    objectMapper.readValue<BerekRequest>(it.payloadAsText)
                }.flatMap { berekRequest ->
                    roomsRepository.findById(berekRequest.roomId)
                            .doOnSuccess { println(it) }
                            .map { Room(it.name, it.hostId, it.hostName, it.capacity, it.players.updatePlayer(berekRequest), it.id) }
                            .flatMap { roomsRepository.save(it) }
                }
                .subscribe(subscriber::onNext, subscriber::onError, subscriber::onComplete)
        return webSocketSession.send(roomFlux.map { objectMapper.writeValueAsString(it) }.map(webSocketSession::textMessage))
    }
}

private class WebSocketMessageSubscriber(private val eventPublisher: UnicastProcessor<Room>) {

    fun onNext(room: Room) {
        eventPublisher.onNext(room)
    }

    fun onError(error: Throwable) {
        //TODO log error
        error.printStackTrace()
    }

    fun onComplete() {

//        roomWebsocketRequest.ifPresent { event ->
//            roomPublisher.onNext(RoomWebsocketRequest())
//        }
    }

}


fun List<Player>.updatePlayer(request: BerekRequest) = this.map {
    if (it.id == request.oldId)
        it.copy(isBerek = false)
    else if (it.id == request.newId)
        it.copy(isBerek = true)
    else it
}