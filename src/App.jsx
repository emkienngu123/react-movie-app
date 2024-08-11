import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import Banner from './components/Banner'
import MovieList from './components/MovieList'
import MovieSearch from './components/MovieSearch'
import { data } from 'autoprefixer'

function App() {
  const [movie,setMovie] = useState([])
  const [RatedMovie,setRatedMovie] = useState([])
  const [movieSearch,setMovieSearch] = useState([])
  const handleSearch = async (searchValue) =>{
    setMovieSearch([])
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };


      const searchMovie = await fetch(url,options);
      const data = await searchMovie.json()
      setMovieSearch(data.results)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchMovie = async() => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const url1 = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
      const url2 = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';

      const [res1,res2] = await Promise.all([fetch(url1,options),fetch(url2,options)])

      const data1 = await res1.json()
      const data2 = await res2.json()

      console.log(data1)
      setMovie(data1.results)
      setRatedMovie(data2.results)
    }
    fetchMovie();
  },[])
  return (
    <div className='bg-black pb-10 text-white'>
      <Header onSearch={handleSearch}></Header>
      <Banner></Banner>
      {movieSearch.length > 0 ? (
        <MovieSearch title={"Search result"} data={movieSearch}></MovieSearch>
      ) : (
        <>
          <MovieList title={"Phim hot"} data={movie} />
          <MovieList title={"Phim de cu"} data={RatedMovie} />
        </>
      )}

    </div>
  )
}

export default App
