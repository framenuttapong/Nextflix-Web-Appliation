import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class MoviesService {
    constructor(
        private config: ConfigService
    ) {}

    async findAll() {
        const apiKey = this.config.get<string>('MOVIE_API_KEY');
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        const response = await axios.get(url);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }
        return response.data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            genre: movie.genre_ids,
            thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            description: movie.overview,
        }));
    }

    async findById(id: number) {
        const apiKey = this.config.get<string>('MOVIE_API_KEY');
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
        const response = await axios.get(url);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Failed to fetch movie details: ${response.statusText}`);
        }
        const movie = response.data;
        return {
            id: movie.id,
            title: movie.title,
            genre: movie.genres.map((g: any) => g.name).join(', '),
            thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            description: movie.overview,
        };
    }
}
