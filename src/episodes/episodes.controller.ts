import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Series } from '../series/series.entity';

@Controller('episodes')
@UseGuards(JwtAuthGuard)
export class EpisodesController {
  constructor(private episodesService: EpisodesService) {}

  @Post(':seriesId')
  async createEpisode(
    @Param('seriesId') seriesId: string,
    @Body('title') title: string,
    @Body('episodeNumber') episodeNumber: number,
  ) {

    const series = { id: seriesId } as Series;
    return this.episodesService.createEpisode(series, title, episodeNumber);
  }

  @Get(':seriesId')
  async listEpisodes(@Param('seriesId') seriesId: string) {

    const series = { id: seriesId } as Series;
    return this.episodesService.findBySeries(series);
  }

  @Patch('watched/:episodeId')
  async markWatched(
    @Param('episodeId') episodeId: string,
    @Body('watched') watched: boolean,
  ) {
    return this.episodesService.markWatched(episodeId, watched);
  }
}
