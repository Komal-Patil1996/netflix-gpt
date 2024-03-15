import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/Constant";
import { useEffect } from "react";
import { addTrendingMovies } from "../utils/movieSlice";

const useTrendingMovies = () => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector((store) => store.movies.trailerVideo)

  const getTrendingMovies  = async () => {
    
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);

    const json = await data.json();


    dispatch(addTrendingMovies(json.results));
  } 

  useEffect(() =>{
   !trailerVideo && getTrendingMovies();
  }, [])
}

export default useTrendingMovies;