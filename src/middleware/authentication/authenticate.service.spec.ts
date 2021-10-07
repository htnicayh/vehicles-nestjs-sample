import { Test } from "@nestjs/testing";
import { AuthService } from "./authenticate.service";
import { UsersService } from "../../users/users.service";
import { UserEntity } from "src/users/entity/users.entity";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>

    beforeEach(async () => {
        fakeUserService = {
            findAll: (): Promise<UserEntity[]> => Promise.resolve([]),
            create: (email: string, password: string): Promise<UserEntity> => 
                Promise.resolve({ id: 1, email, password })
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

    it('throw an error when sign up if user have already exist', async (done) => {
        fakeUserService.findAll = () => {
            return Promise.resolve([{id: 1, email: 'a', password: '1'} as UserEntity]);
        }
        try {
            await service.signUp('asdf@asdf.com', 'asdf');
        } catch {
            done();
        }
    })

    it('Don`t throw an error when sign in if user have already exist', async (done) => {
        try {
            await service.signIn('asdfáds@asdfáds.com', 'asdf');
        } catch {
            done();
        }
    })

    it('Null', async () => {
        fakeUserService.findAll = () => {
            return Promise.resolve([{
                email: 'asdf@asdf.com',
                password: '6f6ccebb49a5f751.c5c40eb37df92160c33a765a94ef89bd62c7a436377ce36eaa3a38031b746f27'
            } as UserEntity])
        }
        const user = await service.signIn('asdf@asdf.com', 'mypassword')
        expect(user).toBeDefined()
    })
})