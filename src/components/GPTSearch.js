import React from 'react';
import GptSearchBar from './GPTSeachBar';
import GPTMovieSuggestions from './GPTMovieSuggestions';
import { BACKGROUND_URL } from '../utils/Constant';

const GPTSearch = () => {
  return (
       <div>
       <div className='fixed -z-10'>
      <img className='h-screen object-cover md:w-screen' src={BACKGROUND_URL} alt='background' />
      </div>
      <GptSearchBar/>
      <GPTMovieSuggestions/>
    </div>

   
  );
};

export default GPTSearch;