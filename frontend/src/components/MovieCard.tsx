import React from 'react';
import { IoIosPlay } from "react-icons/io";

interface MovieCardProps {
    title: string;
    imageUrl: string;
    runtime: number;
    releaseDate: Date;
    rating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, imageUrl, runtime, releaseDate, rating }) => {
    return (
        <div className="group relative w-[180px] h-[270px]">
            <img className="cursor-pointer object-fill transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
                src={imageUrl} alt="Movie Thumbnail"
            />
            <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100 ">
                <img className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
                    src={imageUrl} alt="Movie Thumbnail"
                />
                <div className="z-10 bg-zinc-100 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                    <div className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                        onClick={() => console.log(`Play ${title}`)}>
                        <IoIosPlay size={20} />
                    </div>
                    {/* <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-black text-[10px] lg:text-sm">{runtime}</p>
                    </div>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-black text-[10px] lg:text-sm">{releaseDate as unknown as String}</p>
                    </div>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-black text-[10px] lg:text-sm">{rating}</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;