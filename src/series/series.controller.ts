import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../users/user.entity';

@Controller('series')
@UseGuards(JwtAuthGuard)
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Post()
  async addSeries(
    @Req() req: Request,
    @Body('title') title: string,
    @Body('genre') genre: string,
    @Body('status') status: string,
    @Body('priority') priority: number,
    @Body('releaseDate') releaseDate: Date,
  ) {
    const user = new User();
    user.id = req.user!['id'];

    return this.seriesService.addSeries(
      user,
      title,
      genre,
      status,
      priority,
      releaseDate,
    );
  }

  @Get()
  async listSeries(
    @Req() req: Request,
    @Query('genre') genre?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderDir') orderDir?: string,
  ) {
    const user = new User();
    user.id = req.user!['id'];
    const filters = { genre, status, priority };
    const order = { by: orderBy, direction: orderDir };
    return this.seriesService.findAllByUser(user, filters, order);
  }

  @Delete(':id')
  async removeSeries(@Req() req: Request, @Param('id') id: string) {
    const user = new User();
    user.id = req.user!['id'];
    return this.seriesService.removeSeries(user, id);
  }
}
