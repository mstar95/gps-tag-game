package com.wawcode.gpstaggame.rooms.domain

import org.springframework.data.annotation.Id
import java.util.*

data class Player(val positionX: Double,
                  val positionY: Double,
                  val isBerek: Boolean,
                  val id: String = UUID.randomUUID().toString())