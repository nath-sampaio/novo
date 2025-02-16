import { Test, TestingModule } from '@nestjs/testing';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { Series } from './series.entity';
import { User } from '../users/user.entity';
import { Request } from 'express';

describe('SeriesController', () => {
    let controller: SeriesController;
    let service: SeriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [SeriesController],
        providers: [
            {
            provide: SeriesService,
            useValue: {
                addSeries: jest.fn(),
                findAllByUser: jest.fn(),
                removeSeries: jest.fn(),
            },
            },
        ],
        }).compile();

        controller = module.get<SeriesController>(SeriesController);
        service = module.get<SeriesService>(SeriesService);
    });

    it('should add a series', async () => {
        const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        password: 'hashed-password',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
        };

        const mockRequest = {
        user: mockUser,
        } as unknown as Request;

        const mockSeries: Series = {
        id: '1',
        title: 'Test Series',
        genre: 'Drama',
        status: 'Ongoing',
        priority: 1,
        releaseDate: new Date(),
        user: mockUser,
        createdAt: new Date(),
        updatedAt: new Date(),
        };

        jest.spyOn(service, 'addSeries').mockResolvedValue(mockSeries);

        const result = await controller.addSeries(
        mockRequest,
        'Test Series',
        'Drama',
        'Ongoing',
        1,
        new Date(),
        );

        expect(result).toEqual(mockSeries);
        expect(service.addSeries).toHaveBeenCalledWith(
        { id: '1' },
        'Test Series',
        'Drama',
        'Ongoing',
        1,
        expect.any(Date),
        );
    });
});
