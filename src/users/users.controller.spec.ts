import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [
            {
            provide: UsersService,
            useValue: {
                createUser: jest.fn(),
                updateUser: jest.fn(),
            },
            },
        ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should register a user', async () => {
        const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        password: 'hashed-password',
        name: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
        };

        jest.spyOn(service, 'createUser').mockResolvedValue(mockUser);

        const result = await controller.registerUser('test@example.com', 'password', 'Test');
        expect(result).toEqual(mockUser);
        expect(service.createUser).toHaveBeenCalledWith('test@example.com', 'password', 'Test');
    });
});
