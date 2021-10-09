import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'
import { AuthService } from './auth/auth.service'
import { UserEntity } from './entity/users.entity'

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    const users: UserEntity[] = []
    fakeUserService = {
      findOne: (id: number): Promise<UserEntity> => {
        return Promise.resolve({id, email: 'asdf@asdf.com', password: 'asdf'})
      },
      findAll: (email: string): Promise<UserEntity[]> => {
        return Promise.resolve([{id: 1, email: 'asdf@asdf.com', password: 'asdf'}])
      },
      // remove: () => {},
      // update: () => {}
    }

    fakeAuthService = {
      // signUp: () => {

      // },
      signIn: (email: string, password: string): Promise<UserEntity> => {
        return Promise.resolve({id: 1, email, password })
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers and return a list of users with email', async () => {
    const listUsers = await controller.findAllUsers('asdf@asdf.com')
    expect(listUsers.length).toEqual(1)
    expect(listUsers[0].email).toEqual('asdf@asdf.com')
  })

  it('findUser return a single user with the given id', async () => {
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
    expect(user.id).toEqual(1)
  })

  it('findUser throws an error if user with given id does not exist', async () => {
    fakeUserService.findOne = () => null
    try {
      await controller.findUser('1')
    } catch (error) {
      return Promise.reject(error)
    }
  })

  it('signIn updates session object and returns user', async () => {
    const session = {
      userID: undefined
    }
    const user = await controller.signIn({ email: 'asdf@asdf.com', password: 'asdf' }, session)
    expect(user.id).toEqual(1)
    expect(session.userID).toEqual(1)
  })
});
