import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users.service";
import { UserEntity } from "src/users/entity/users.entity";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>

    beforeEach(async () => {
        const users: UserEntity[] = []
        fakeUserService = {
            findAll: (email: string): Promise<UserEntity[]> => {
                const userResults = users.filter((user) => {
                    return user.email === email
                })
                return Promise.resolve(userResults)
            },
            create: (email: string, password: string): Promise<UserEntity> => {
                const user = {id: Math.floor(Math.random() * 1000), email, password }
                users.push(user)
                return Promise.resolve(user)
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

        service = module.get(AuthService)
    })

    it('can create an instance of AuthService', async () => {
        expect(service).toBeDefined()
    })

    it('create a new user with a salt and hash password', async () => {
        const user = await service.signUp('asdf@asdf.com', 'asdf')

        expect(user.password).not.toEqual('asdf')
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('throw an error if user sign up with email that is exist', async () => {
        await service.signUp('asdf@asdf.com', 'asdf')
        try {
            await service.signIn('asdf@asdf.com', 'asdf')
        } catch (error) {
            return Promise.reject(error)
        }
    })

    it('SignIn with information after SignUp with email & password', async () => {
        await service.signUp('asdfg@asdfg.com', 'mypassword')

        const user = await service.signIn('asdfg@asdfg.com', 'mypassword')
        expect(user).toBeDefined()
    })
})