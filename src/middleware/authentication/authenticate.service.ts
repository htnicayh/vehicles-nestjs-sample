import { 
    BadRequestException, 
    Injectable, 
    NotFoundException, 
    UnauthorizedException 
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { InstanceUserDto } from 'src/users/dto/instance-user.dto';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signUp(email: string, password: string): Promise<InstanceUserDto> {
        const users = await this.usersService.findAll(email)
        if (users.length) {
            throw new UnauthorizedException('EMAIL_ALREADY_EXIST')
        }
        
        // Hashing password
        const salt = randomBytes(8).toString('hex')
        const hashPw = (await scrypt(password, salt, 32)) as Buffer
        const results = salt + '.' + hashPw.toString('hex')

        const newUser = await this.usersService.create(email, results)
        return newUser

    }

    async signIn(email: string, password: string): Promise<InstanceUserDto> {
        const [user] = await this.usersService.findAll(email)
        if (!user) {
            throw new NotFoundException('EMAIL_IS_INCORECT')
        }
        const [salt, hash] = user.password.split('.')
        const hashPw = ((await scrypt(password, salt, 32)) as Buffer).toString('hex')
        
        // Compare
        if (hashPw !== hash) {
            throw new BadRequestException('PASSWORD_IS_INCORECT')
        }
        return user
    }
}
