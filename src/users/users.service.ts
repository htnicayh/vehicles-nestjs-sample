import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
// import { CONTROLLER_ERROR } from 'src/helper/error/status.error';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly Repo: Repository<UserEntity>
    ) { }

    create(email: string, password: string) {
        const newUser = this.Repo.create({ email, password })

        return this.Repo.save(newUser)
    }

    async findOne(id: number) {
        const user = await this.Repo.findOne(id)
        if (!user) {
            throw new NotFoundException(`NOT_FOUND_USER_ID_${id}`)
        }
        return user
    }

    findAll(email: string) {
        return this.Repo.find({ email })
    }

    async update(id: number, attrs: Partial<UserEntity>) {
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('USER_NOT_FOUND')
        }
        Object.assign(user, attrs)
        return this.Repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('USER_NOT_FOUND')
        }
        return this.Repo.remove(user)
    }
}
