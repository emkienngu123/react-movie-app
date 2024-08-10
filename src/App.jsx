import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import Banner from './components/Banner'
import MovieList from './components/MovieList'
import { data } from 'autoprefixer'

function App() {
  const [movie,setMovie] = useState([])
  const [RatedMovie,setRatedMovie] = useState([])
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
      <Header></Header>
      <Banner></Banner>
      <MovieList title={"Phim hot"} data={movie}/>
      <MovieList title={"Phim de cu"} data={RatedMovie}/>
    </div>
  )
}

export default App
