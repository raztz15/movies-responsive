import React from 'react'
import './MovieDetailsModal.css'
import star from '../../assets/icons/star.svg'
import backArrow from '../../assets/icons/back-arrow.svg'
import { formatTime } from '../../Utils'


interface IMovieDetailsModalProps {
    closeModal: () => void
    modalContent: {
        largeimage: string
        title: string
        runtime: string
        rating: string
        synopsis: string
    }
}

export const MovieDetailsModal = ({ modalContent, closeModal }: IMovieDetailsModalProps) => {

    const { largeimage, title, runtime, rating, synopsis } = modalContent



    return (
        <div className='movie-details-modal--container' onClick={closeModal}>
            <div className='movie-details-modal--wrapper' onClick={(e) => e.stopPropagation()}>
                <div className='movie-details-modal--img'><img src={largeimage} /></div>
                <div className="movie-details--container">
                    <div className='movie-details'>
                        <div>{title}</div>
                        <div>{formatTime(runtime)}</div>
                        <div className='movie-details--star-img'><img src={star} />{rating}/10</div>
                        <div dangerouslySetInnerHTML={{ __html: synopsis }}></div>
                    </div>
                    <div onClick={closeModal} className='modal-button'>
                        <img src={backArrow} />
                        <button>Back to list</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
