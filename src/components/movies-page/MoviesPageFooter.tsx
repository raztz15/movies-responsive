import React from 'react'
import './MoviesPageFooter.css'
import footerLogo from '../../assets/icons/footer-logo.svg'
import facebookLogo from '../../assets/icons/facebook-share-icon.svg'
import linkedInLogo from '../../assets/icons/linkedin-share-icon.svg'
import twitterLogo from '../../assets/icons/twitter-share-icon.svg'
import instaLogo from '../../assets/icons/instagram-share-icon.svg'
import youtubeLogo from '../../assets/icons/youtube-share-icon.svg'

export const MoviesPageFooter = () => {
    return (
        <div className='movies-page-footer--container'>
            <div><img src={footerLogo} /></div>
            <div>Contact us</div>
            <div className='general-info'>
                <div>support@nextmovies.com</div>
                <div className='general-info--opening-hours'>Mon - Fri<span className="vertical-line"></span>6:00am-5:00pm PT</div>
            </div>
            <div className='movies-page-footer--links'>
                <div><img src={facebookLogo} /></div>
                <div><img src={linkedInLogo} /></div>
                <div><img src={twitterLogo} /></div>
                <div><img src={instaLogo} /></div>
                <div><img src={youtubeLogo} /></div>
            </div>
        </div>
    )
}
