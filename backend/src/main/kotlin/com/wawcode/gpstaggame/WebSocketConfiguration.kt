package com.wawcode.gpstaggame

import com.wawcode.gpstaggame.rooms.domain.Room
import com.wawcode.gpstaggame.rooms.dto.RoomWebsocketRequest
import com.wawcode.gpstaggame.rooms.websocket.PlayerEventBroadcastProcessor
import com.wawcode.gpstaggame.rooms.websocket.PlayerEventProcessor
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.HandlerMapping
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping
import org.springframework.web.reactive.socket.WebSocketHandler
import java.util.HashMap
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter
import reactor.core.publisher.Flux
import reactor.core.publisher.UnicastProcessor

@Configuration
class WebSocketConfiguration(val playerEventProcessor: PlayerEventProcessor, val playerEventBroadcastProcessor: PlayerEventBroadcastProcessor) {

    @Bean
    fun webSocketHandlerMapping(): HandlerMapping {
        val map = HashMap<String, WebSocketHandler>()
        map["/position-update"] = playerEventProcessor
        map["/chujxD"] = playerEventBroadcastProcessor

        val handlerMapping = SimpleUrlHandlerMapping()
        handlerMapping.order = 1
        handlerMapping.urlMap = map
        return handlerMapping
    }
}