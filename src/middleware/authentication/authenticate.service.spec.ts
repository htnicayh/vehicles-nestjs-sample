import { Test } from "@nestjs/testing";
import { AuthService } from "./authenticate.service";
import { UsersService } from "../../users/users.service";
import { UserEntity } from "src/users/entity/users.entity";

describe('AuthService', () => {
    let service: AuthService;
    beforeEach(async () => {
        const fakeUserService: Partial<UsersService> = {
            findAll: (): Promise<UserEntity[]> => Promise.resolve([]),
            create: (email: string, password: string): Promise<UserEntity> => {
                return Promise.resolve({ id: 1, email, password })
            }
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService, 
                { 
                    provide: UsersService,
                    useValue: fakeUserService
                },
            ]
        }).compile()

        service = module.get<AuthService>(AuthService)
    })

    it('can create an instance of AuthService', async () => {
        expect(service).toBeDefined()
    })
})