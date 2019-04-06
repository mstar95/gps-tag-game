package com.wawcode.gpstaggame.users.domain

import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UsersRepository: ReactiveMongoRepository<User, String> {
}