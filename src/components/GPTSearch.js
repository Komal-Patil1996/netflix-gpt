import React from 'react';
import GptSearchBar from './GPTSeachBar';
import GPTMovieSuggestions from './GPTMovieSuggestions';
import { BACKGROUND_URL } from '../utils/Constant';

const GPTSearch = () => {
  return (
    <div>
      <div className='absolute -z-10'>
      <img src={BACKGROUND_URL} alt='background' />
      </div>
      <GptSearchBar/>
      <GPTMovieSuggestions/>
    </div>
  );
};

export default GPTSearch;