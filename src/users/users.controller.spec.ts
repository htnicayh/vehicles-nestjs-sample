import { Test } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { AuthService } from '../middleware/authentication/authenticate.service'

describe('UsersController', () => {
    let controller: UsersController
    let fakeUserService: Partial<UsersService>
    let fakeAuthService: Partial<AuthService>

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UsersController]
        }).compile()

        controller = module.get<UsersController>(UsersController)
    })

    it('Should be defined', () => {
        expect(controller).toBeDefined()
    })
})