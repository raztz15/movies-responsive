import { useEffect, useRef, useState } from 'react'
import { MovieCard } from './MovieCard'
import { HeaderLogo } from './HeaderLogo'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Movie } from '../../Utils';
import { MoviesPageFooter } from './MoviesPageFooter';


export const MoviesPage = () => {

    const [movies, setMovies] = useState<Movie[]>([])
    const [inputValue, setInputValue] = useState<string>(sessionStorage.getItem('inputValue') ?? '')
    const [loading, setLoading] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const filteredMovies = movies.filter(movie => (movie.title.toLowerCase().includes(inputValue.toLowerCase()) || movie.released.includes(inputValue)))

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                const res = await fetch('https://raw.githubusercontent.com/next-insurance/next-test/master/server/movies.json')
                const moviesData = await res.json()
                moviesData && setMovies(moviesData)
            }
            catch (error) {
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchMovies()
        inputRef.current && inputRef.current.focus()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target
        sessionStorage.setItem("inputValue", value)
        setInputValue(value)
    }

    const session = sessionStorage.getItem('inputValue')

    if (loading) return <div>Loading...</div>
    return (
        <div className='movies-page--container' >
            <HeaderLogo />
            <div className='movies-page--body'>
                <div className='movies-page--body__search'>
                    <TextField
                        sx={{ width: "500px" }}
                        inputRef={inputRef}
                        InputProps={{

                            startAdornment: (
                                <SearchIcon color="disabled" />
                            ),
                        }}
                        placeholder='Search Movie By Name or Year...'
                        value={session ?? ''}
                        onChange={(e) => handleChange(e)} />
                </div>
                <div className='movies-page--header'>EPLORE YOUR NEXT<br /> MOVIES AND TV SHOWS</div>
                {filteredMovies.length !== 0 ? <div className='movies-page--movies' data-testid="movies-list" >{filteredMovies.map(movie => <MovieCard key={movie.id} {...movie} />)}</div> :
                    <h3 className='movies-page--no-data'>No movies to display</h3>}
            </div>
            <MoviesPageFooter />
        </div>
    )
}
