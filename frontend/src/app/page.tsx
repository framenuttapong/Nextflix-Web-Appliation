'use client';

import { useUser } from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/services/api';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieRow from '@/components/MovieRow';

interface Movie {
  id: number;
  title: string;
  genre: string;
  thumbnail: string;
  description: string;
  runtime: number;
  releaseDate: Date;
  rating: number;
}

export default function BrowsePage() {
  // const user = { id: '1', email: 'demo@netflix.com', name: 'Demo User' };
  const user = useUser();
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (user === null) router.push('/login');
  }, [user]);

  useEffect(() => {
    if (user) {
      apiClient.get('/movies')
        .then(res => setMovies(res.data))
        .catch(err => console.error('Failed to fetch movies:', err));
    }
  }, [user]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="bg-black relative h-screen">
        <Billboard />
        <div className="absolute bottom-0 w-full z-auto">
          <MovieRow title="Popular on Netflix" movies={movies} />
        </div>
      </div>
    </>
  );
}
