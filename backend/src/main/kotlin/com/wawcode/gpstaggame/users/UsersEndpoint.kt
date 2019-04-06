package com.wawcode.gpstaggame.users

import com.wawcode.gpstaggame.users.domain.User
import com.wawcode.gpstaggame.users.domain.UsersRepository
import com.wawcode.gpstaggame.users.dto.UserRequest
import org.springframework.web.bind.annotation.*

@RestController
//@CrossOrigin("*")
@RequestMapping("users")
class UsersEndpoint(val usersRepository: UsersRepository) {

    @GetMapping
    fun getUsers() = usersRepository.findAll()

    @PostMapping
    fun createUser(@RequestBody userRequest: UserRequest) = usersRepository.save(User(userRequest.name))
}