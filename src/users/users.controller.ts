import { 
    Controller,
    Post, 
    Body, 
    Get, 
    Patch, 
    Param, 
    Query, 
    Delete,
    BadRequestException,
    Inject,
    forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { InstanceUserDto } from './dto/instance-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
@Serialize(InstanceUserDto)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Post('/sign-up')
    createUser(@Body() body: CreateUserDto) {
        if (body?.email && body?.password) {
            const { email, password } = body
            return this.authService.signUp(email, password)
        }
        throw new BadRequestException('INPUT_INVALID')
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id))
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.findAll(email)
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
        return;
    }
}
