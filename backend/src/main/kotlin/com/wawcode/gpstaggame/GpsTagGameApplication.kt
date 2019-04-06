package com.wawcode.gpstaggame

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories
import org.springframework.web.reactive.config.EnableWebFlux

@SpringBootApplication
@EnableReactiveMongoRepositories
@EnableWebFlux
class GpsTagGameApplication
fun main(args: Array<String>) {
    runApplication<GpsTagGameApplication>(*args)
}
