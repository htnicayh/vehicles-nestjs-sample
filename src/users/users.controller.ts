import { 
    Controller,
    Post, 
    Body, 
    Get, 
    Patch, 
    Param, 
    Query, 
    Delete,
    Session,
    UseGuards,
    Inject,
    forwardRef,
    BadRequestException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../middleware/interceptors/serialize.interceptor';
import { InstanceUserDto } from './dto/instance-user.dto';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { UserEntity } from './entity/users.entity';
import { ControllerError, CONTROLLER_ERROR } from '../helper/error/status.error';

@Controller('auth')
@Serialize(InstanceUserDto)
export class UsersController {
    constructor(
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
        @Inject(forwardRef(() => AuthService))private readonly authService: AuthService
    ) {}

    @Post('/sign-up')
    async createUser(@Body() body: CreateUserDto, @Session() session: any): Promise<UserEntity> {
        if (body.email && body.password) {
            const { email, password } = body
            const user = await this.authService.signUp(email, password)
            session.userID = user.id
            return user;
        }
        throw new BadRequestException('INVALID_EMAIL')
    }

    @Post('/sign-in')
    async signIn(@Body() body: CreateUserDto, @Session() session: any): Promise<UserEntity> {
        if (body.email && body.password) {
            const { email, password } = body
            const user = await this.authService.signIn(email, password)
            session.userID = user.id
            return user
        }
        throw new BadRequestException('INVALID_EMAIL')
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
