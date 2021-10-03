import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signUp(email: string, password: string) {
        const users = await this.usersService.findAll(email)
        if (users.length) {
            throw new BadRequestException('EMAIL_ALREADY_EXIST')
        }
        
        // Hashing password
        const salt = randomBytes(8).toString('hex')
        const hashPw = (await scrypt(password, salt, 32)) as Buffer
        const results = salt + '.' + hashPw.toString('hex')

        const newUser = await this.usersService.create(email, results)
        return newUser

    }

    signIn() {

    }
}
