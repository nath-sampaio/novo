import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { Episode } from './episodes.entity';

describe('EpisodesController', () => {
        let controller: EpisodesController;
        let service: EpisodesService;
    
        beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EpisodesController],
            providers: [
            {
                provide: EpisodesService,
                useValue: {
                createEpisode: jest.fn(),
                findBySeries: jest.fn(),
                markWatched: jest.fn(),
                },
            },
            ],
        }).compile();
    
        controller = module.get<EpisodesController>(EpisodesController);
        service = module.get<EpisodesService>(EpisodesService);
        });
    
        it('should create an episode', async () => {
        const mockEpisode = {
            id: '1',
            title: 'Pilot',
            episodeNumber: 1,
            watched: false,
            series: { id: 'series-id' },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Episode;
    
        jest.spyOn(service, 'createEpisode').mockResolvedValue(mockEpisode);
    
        const result = await controller.createEpisode(
            'series-id',
            'Pilot',
            1,
        );
    
        expect(result).toEqual(mockEpisode);
        expect(service.createEpisode).toHaveBeenCalledWith(
            { id: 'series-id' },
            'Pilot',
            1,
        );
        });
});