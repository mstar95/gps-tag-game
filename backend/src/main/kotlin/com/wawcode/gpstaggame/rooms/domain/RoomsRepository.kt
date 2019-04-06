package com.wawcode.gpstaggame.rooms.domain

import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface RoomsRepository: ReactiveMongoRepository<Room, String> {
}