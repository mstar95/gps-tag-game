package com.wawcode.gpstaggame.users.domain

import org.springframework.data.annotation.Id
import java.util.*

data class User(val name: String, @Id val id: String = UUID.randomUUID().toString())