'use client';

import React, { useEffect, useState } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { apiClient } from '@/services/api';
import { IoIosPlay } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

interface Movie {
    id: number;
    title: string;
    description: string;
    thumbnail?: string;
}

interface VideoData {
    key: string;
    name: string;
}

export default function Billboard() {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [video, setVideo] = useState<VideoData | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // <768px = mobile
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        async function fetchMovieAndVideo() {
            try {
                const res = await apiClient.get('/movies');
                const movies: Movie[] = res.data;

                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                setMovie(randomMovie);

                const videoRes = await apiClient.get(`/movies/${randomMovie.id}/video`);
                setVideo(videoRes.data);
            } catch (error) {
                console.error('Error loading billboard movie:', error);
            }
        }

        fetchMovieAndVideo();
    }, []);

    if (!movie) {
        return <div className="text-white p-4">Loading Billboard...</div>;
    }

    return (
        <div className="relative w-full h-screen md:h-[56.25vw] overflow-hidden bg-black">
            {isMobile ? (
                <img
                    src={movie.thumbnail || '/fallback.jpg'}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
            ) : (
                video && (
                    <div className="relative aspect-video w-full">

                        <iframe
                            src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.key}&modestbranding=1&showinfo=0&rel=0`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="w-full h-full pointer-events-none absolute top-0 left-0"
                        />
                    </div>
                )
            )}

            {/* Overlay content */}
            {/* <div className="absolute top-[30%] md:top-[30%] left-4 md:left-16 z-10">
                <p className="text-white text-xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl w-[90%] md:w-[50%]">{movie.title}</p>
                <p className="text-white text-xs md:text-lg mt-2 md:mt-6 w-[90%] md:w-[60%] lg:w-[45%] drop-shadow-xl">
                    {movie.description}
                </p> */}
            {/* <div className="flex flex-row items-center mt-3 gap-3">
                    <a target="_blank" rel="noopener noreferrer" href={`/watch/${movie.id}`}>
                        <button className="bg-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 text-xs md:text-lg font-semibold flex items-center hover:bg-opacity-20 transition">
                            <IoIosPlay className="mr-1" />
                            Play
                        </button>
                    </a>
                    <button className="bg-gray-600 text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 text-xs md:text-lg font-semibold flex items-center hover:bg-opacity-20 transition">
                        <IoMdInformationCircleOutline className="mr-1" />
                        More Info
                    </button>
                </div> */}
            {isMobile ? (
                <div className="absolute bottom-[35%] left-1/2 transform -translate-x-1/2 flex gap-2">
                    <div className="flex justify-center items-center gap-2 pointer-events-auto">
                        <button className="text-white w-16 h-16 flex flex-col items-center justify-center hover:bg-gray-600 transition">
                            <AiOutlinePlus className="text-2xl" />
                            <span className="text-xs font-bold">My List</span>
                        </button>
                        {/* <a target="_blank" rel="noopener noreferrer" href={`/watch/${movie.id}`}> */}
                            <button className="bg-white bg-opacity-30 rounded-md py-2 md:py-3 px-4 md:px-5 text-xs md:text-lg font-semibold flex items-center hover:bg-opacity-20 transition">
                                <IoIosPlay className="mr-1" size={20} />
                                Play
                            </button>
                        {/* </a> */}
                        <button className="text-white w-16 h-16 flex flex-col items-center justify-center hover:bg-gray-600 transition">
                            <IoMdInformationCircleOutline className="text-2xl" />
                            <span className="text-xs font-bold">Info</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="absolute top-[30%] md:top-[30%] left-4 md:left-16 z-10">
                    <p className="text-white text-xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl w-[90%] md:w-[50%]">{movie.title}</p>
                    <p className="text-white text-xs md:text-lg mt-2 md:mt-6 w-[90%] md:w-[60%] lg:w-[45%] drop-shadow-xl line-clamp-3 overflow-hidden text-ellipsis">
                        {movie.description}
                    </p>
                    <div className="flex flex-row items-center mt-3 gap-3">
                        {/* <a target="_blank" rel="noopener noreferrer" href={`/watch/${movie.id}`}> */}
                            <button className="bg-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 text-xs md:text-lg font-semibold flex items-center hover:bg-opacity-20 transition">
                                <IoIosPlay className="mr-1" />
                                Play
                            </button>
                        {/* </a> */}
                        <button className="bg-gray-600 text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 text-xs md:text-lg font-semibold flex items-center hover:bg-opacity-20 transition">
                            <IoMdInformationCircleOutline className="mr-1" />
                            More Info
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
