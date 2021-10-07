import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
import { CONTROLLER_ERROR } from '../helper/error/status.error';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly Repo: Repository<UserEntity>
    ) { }

    create(email: string, password: string) {
        const newUser = this.Repo.create({ email, password })

        return this.Repo.save(newUser)
    }

    async findOne(id: number): Promise<UserEntity | any> {
        const user = await this.Repo.findOne(id)    // if ID not exist, return first user
        if (!id) {
            return null;
        }
        if (!user) {
            return CONTROLLER_ERROR.ID_NOTFOUND_ERROR
        }
        return user
    }

    findAll(email: string): Promise<UserEntity[]> {
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
