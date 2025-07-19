import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(
        private moviesService: MoviesService
    ) {}

    @Get()
    findAll() {
        return this.moviesService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.moviesService.findById(id);
    }

    @Get(':id/video')
    getMovieVideo(@Param('id', ParseIntPipe) id: number) {
        return this.moviesService.getMovieVideo(id);
    }
}
