import './MoviesPage.css'
import './MovieCard.css'
import star from '../../assets/icons/star.svg'
import arrow from '../../assets/icons/arrow.svg'
import { useNavigate } from 'react-router-dom'
import { Movie } from '../../Utils'
import { useState } from 'react'
import { MovieDetailsModal } from '../modal/MovieDetailsModal'


export const MovieCard = ({
    id,
    title,
    image,
    synopsis,
    rating,
    type,
    released,
    runtime,
    largeimage,
    unogsdate,
    imdbid,
    download }: Movie) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)


    const handleClick = () => {
        setIsModalOpen(prev => !prev)
    }


    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className='movie-card--container'>
            <div className='movie-card--image'><img src={image} /></div>
            <div className='movie-card--title' dangerouslySetInnerHTML={{ __html: title + ` (${released})` }}></div>
            <div className='movie-card--rating'>{rating ? <img src={star} /> : "No rating found"}{rating}</div>
            <div onClick={handleClick} className='movie-card--read-more'>
                <button>Read more</button>
                <img src={arrow} />
            </div>
            {isModalOpen && <MovieDetailsModal closeModal={closeModal} modalContent={{ largeimage, title, runtime, rating, synopsis }} />}
        </div>
    )
}
