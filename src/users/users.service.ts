import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly Repo: Repository<UserEntity>
    ) {

    }

    create(email: string, password: string) {
        const newUser = this.Repo.create({ email, password })

        return this.Repo.save(newUser)
    }
}
