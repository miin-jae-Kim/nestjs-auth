import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository()
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('env test', () => {
    expect(process.env.PASSWORD_BCRYPT).toEqual("10");
  })

  describe('유저 조회 테스트', () => {
    it('미사용자 조회시 undefined 출력', async () =>{
      const user = await userService.findById(1);
      expect(user).toBeUndefined();
    })

    it('사용자 생성시 신규 사용자 Dto 출력', async () => {
      const createUserDto:CreateUserDto = { 
        email : "bapbodanbbang3@gmail.com",
        name : "homes",
        password : "123",
        role : "user"
      }
  
      const newUser = await userService.create(createUserDto);
      console.log("newUser : ", newUser);
      expect(newUser.email).toEqual("bapbodanbbang3@gmail.com");
      expect(newUser.name).toEqual("homes");
      expect(newUser.role).toEqual("user");
    })
  })
});
