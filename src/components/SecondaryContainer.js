import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {

  let movies = useSelector((store) => store.movies)
  return (
    <div className='bg-black' >
      <div className=' -mt-50 relative z-20'>
      <MovieList title="Now Playing Movies" movies={movies.nowPlayingMovies}/>
      <MovieList title="Trending" movies={movies.trendingMovies}/>
      <MovieList title="Popular" movies={movies.popularMovies}/>
      <MovieList title="Horror Movies" movies={movies.nowPlayingMovies}/>
      </div>
    </div>
  );
};

export default SecondaryContainer;