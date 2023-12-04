import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';

import planeIMG from '../../assets/images/plane.jpeg'
import disneyIMG from '../../assets/images/disney.jpeg'
import londonIMG from '../../assets/images/london.jpeg'


const LandingPage = () => {


    return (
        <div className='landing-page-box'>
            <div className='landing-page-left-box'>
                <div className='landing-titles'>
                    <h1 className='landing-h1'>CouchMeOutside</h1>
                    <h2 className='landing-h21'>Come curious,</h2>
                    <h2 className='landing-h22'>document your travel,</h2>
                    <h2 className='landing-h23'>share memories, </h2>
                    <h2 className='landing-h24'>leave connected. </h2>
                    <h2><span className="typedText"></span></h2>
                </div>
            </div>

            <div className='landing-page-right-box'>

                <div className='landing-page-left-img'>
                    <NavLink to="/travelers">
                        <img className='landing-img-one' src={planeIMG} alt='img' />
                        Meet other travelers
                    </NavLink>
                    <img className='landing-img-two' src={disneyIMG} alt='img' />
                </div>

                <div className='landing-page-right-img'>
                    <img className='landing-img-three' src={londonIMG} alt='img' />
                </div>

            </div>
        </div>
    )
}

export default LandingPage;