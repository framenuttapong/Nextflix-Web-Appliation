import MovieCard from "./MovieCard";

type Movie = {
    id: number;
    title: string;
    thumbnail: string;
    runtime: number;
    releaseDate: Date;
    rating: number;
};

export default function MovieRow({ title, movies }: { title: string; movies: Movie[] }) {
    return (
        <div className="px-4 md:px-12 mt-4 space-y-8 bottom-0">
            <h2 className="text-white text-2xl font-bold mb-2">Popular on Netflix</h2>
            <div className="flex overflow-x-scroll gap-2 scrollbar-hide flex-shrink-0 min-w-[180px]">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="w-36 flex-shrink-0 transform transition duration-300 hover:scale-110 cursor-pointer"
                    >
                        <img src={movie.thumbnail} alt={movie.title} className="rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}