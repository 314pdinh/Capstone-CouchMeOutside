import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';

import planeIMG from '../../assets/images/planeWindow1.jpg';
import mountainIMG from '../../assets/images/mountainSky.avif';
import sparklesIMG from '../../assets/images/sparkles.avif';
import bunny from '../../assets/images/astronautBunny.png';
import waveIMG from '../../assets/images/waves.jpg';
import cityIMG from '../../assets/images/city1.jpg'
import spaceIMG from '../../assets/images/astronaut.webp'

import Typed from 'typed.js';

const LandingPage = () => {
    const [backgroundImage, setBackgroundImage] = useState(0);
    const images = [waveIMG, planeIMG, mountainIMG, sparklesIMG, cityIMG, spaceIMG];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setBackgroundImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, [images.length]);

    useEffect(() => {
        let typingEffect = new Typed(".typedText", {
            strings: ["Come curious,", "document your travel,", "share memories,", "leave connected."],
            loop: true,
            typeSpeed: 100,
            backSpeed: 80,
            backDelay: 2000,
        });
    }, []);


    return (
        <div className='landing-page-box' style={{ backgroundImage: `url(${images[backgroundImage]})` }}>
            <div className='landing-page-left-box'>
                <div className='landing-titles'>
                    <h1 className='landing-h1'>Go out there</h1>
                    {/* <h2 className='landing-h21'>Come curious,</h2>
                    <h2 className='landing-h22'>document your travel,</h2>
                    <h2 className='landing-h23'>share memories, </h2>
                    <h2 className='landing-h24'>leave connected. </h2> */}
                    <h2><span className="typedText"></span></h2>
                </div>
            </div>


        </div>
    )
}

export default LandingPage;