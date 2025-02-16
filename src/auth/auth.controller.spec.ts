import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
            {
            provide: AuthService,
            useValue: {
                login: jest.fn(),
                validateUser: jest.fn(),
            },
            },
        ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should return a token on successful login', async () => {
        const mockToken = { access_token: 'test-token' };
        jest.spyOn(authService, 'validateUser').mockResolvedValue({ email: 'test@example.com' });
        jest.spyOn(authService, 'login').mockResolvedValue(mockToken);

        const result = await controller.login('test@example.com', 'password');
        expect(result).toEqual(mockToken);
    });
});
