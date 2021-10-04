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
    Session,
    UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/middleware/interceptors/serialize.interceptor';
import { InstanceUserDto } from './dto/instance-user.dto';
import { AuthService } from 'src/middleware/authentication/authenticate.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserEntity } from './entity/users.entity';

@Controller('auth')
@Serialize(InstanceUserDto)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Post('/sign-up')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        if (body?.email && body?.password) {
            const { email, password } = body
            const user = await this.authService.signUp(email, password)
            session.userID = user.id
            return user;
        }
        throw new BadRequestException('INPUT_INVALID')
    }

    @Post('/sign-in')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        if (body?.email && body?.password) {
            const { email, password } = body
            const user = await this.authService.signIn(email, password)
            session.userID = user.id
            return user
        }
        throw new BadRequestException('INPUT_INVALID')
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    authenticate(@CurrentUser() user: UserEntity) {
        return user;
    }

    @Post('/sign-out')
    signOut(@Session() session: any) {
        session.userID = null;
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
