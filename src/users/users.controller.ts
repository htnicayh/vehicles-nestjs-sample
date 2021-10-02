import { 
    Controller,
    Post, 
    Body, 
    Get, 
    Patch, 
    Param, 
    Query, 
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/middleware/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/sign-up')
    createUser(@Body() body: CreateUserDto) {
        const { email, password } = body

        this.usersService.create(email, password)
    }

    @UseInterceptors(SerializeInterceptor)
    @Get('/:id')
    findUser(@Param('id') id: string) {
        console.log('Handler is running')
        return this.usersService.findOne(parseInt(id))
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Delete('/delete/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id))
    }

    @Patch('/update-me/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        if (body?.email || body?.password) {
            return this.usersService.update(parseInt(id), body)
        }
        return
    }
}
