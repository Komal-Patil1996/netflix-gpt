import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GPTMovieSuggestions = ({poster_path}) => {

  const {movieName, movieResults} = useSelector((store) => store.gpt);
  // const {movieName, movieResults} = gpt;

  if(!movieName) return null;
  

  return (
    <div className='m-4 p-4 bg-black text-white bg-opacity-90'>
      <div>
        {movieName.map((movieName, index) => 
        <MovieList 
        key={movieName} 
        title={movieName} 
        movies={movieResults[index]}
        />
         )}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;