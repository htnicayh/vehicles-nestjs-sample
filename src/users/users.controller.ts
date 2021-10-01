import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/sign-up')
    createUser(@Body() body: CreateUserDto) {
        const { email, password } = body

        this.usersService.create(email, password)
    } 

}
