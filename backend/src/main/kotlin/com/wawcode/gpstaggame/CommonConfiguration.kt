package com.wawcode.gpstaggame

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.HandlerMapping
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping
import org.springframework.web.reactive.socket.WebSocketHandler
import java.util.HashMap


@Configuration
class CommonConfiguration(val webSocketHandler: WebSocketHandler) {

    @Bean
    fun webSocketHandlerMapping(): HandlerMapping {
        val map = HashMap<String, WebSocketHandler>()
        map["/position-update"] = webSocketHandler

        val handlerMapping = SimpleUrlHandlerMapping()
        handlerMapping.order = 1
        handlerMapping.urlMap = map
        return handlerMapping
    }
}