import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {

    const movieList = useSelector(store => store.movies?.nowPlayingMovies);
    //Early return 
    if(movieList === null) return;

    const mainMovie = movieList[1];

    const {original_title, overview, id} = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;