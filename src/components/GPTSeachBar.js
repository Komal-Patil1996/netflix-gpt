import React from 'react';
import { language } from '../utils/languageConstant';
import { useSelector } from 'react-redux';

const GptSearchBar = () => {

const languageKey = useSelector((store) => (store.config.lang))

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 bg-black grid grid-cols-12'>
      <input className='p-4 m-4 col-span-9' type='text' placeholder={language[languageKey].gptPlaceholder}/>
      <button className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'>{language[languageKey].search}</button>

      </form> 
    </div>
  );
};

export default GptSearchBar;