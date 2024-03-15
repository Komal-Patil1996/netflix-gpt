import React, { useRef } from 'react';
import { language } from '../utils/languageConstant';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openAI';
import { API_OPTIONS } from '../utils/Constant';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

const languageKey = useSelector((store) => (store.config.lang));
const searchText = useRef(null);
const dispatch = useDispatch();

//search movie in TMDB
const searchMovieTMDB = async (movie) => {
 const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
 const json = await data.json();

 return json.results;
}

const handleGPTSearchClick = async () => {

const query = "Act as a movie recommendation System and suggest some movies for the query: " +
searchText.current.value + 
". only give names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholey, Hum sath sath he, Koi mil gaya, Dhoom 2 ";

  const gptResults = await openai.chat.completions.create({
    messages: [{ role: 'user', content: query }],
    model: 'gpt-3.5-turbo',
  });

  if(!gptResults.choices){
    // write error handling
  }
  // After this it will become an array of movies
  const gptMovies = gptResults.choices[0]?.message?.content.split(",");
  //   ["Don", "Kick", "abc", "xyz" ]


  //For each movie will search TMDB API
  const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
  // [Promise, Promise, Promise, Promise ]

  const tmdbResults = await Promise.all(promiseArray);

  dispatch(addGptMovieResult({movieName:gptMovies, movieResults:tmdbResults }));



};

  return (
    <div className='pt-[45%] md:p-[10%] flex justify-center'>
      <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
      <input ref={searchText} className='p-4 m-4 col-span-9' type='text' placeholder={language[languageKey].gptPlaceholder}/>
      <button className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'
      onClick={handleGPTSearchClick}>
        {language[languageKey].search}</button>

      </form> 
    </div>
  );
};

export default GptSearchBar;