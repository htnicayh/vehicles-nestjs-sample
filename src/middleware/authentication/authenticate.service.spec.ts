import { Test } from "@nestjs/testing";
import { AuthService } from "./authenticate.service";
import { UsersService } from "../../users/users.service";

it('can create an instance of AuthService', async () => {
    const fakeUserService = {
        findAll: (): Promise<any> => Promise.resolve([]),
        create: (email: string, password: string): Promise<any> => Promise.resolve({ id: 1, email, password })
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

    const service = module.get(AuthService)

    expect(service).toBeDefined()
})