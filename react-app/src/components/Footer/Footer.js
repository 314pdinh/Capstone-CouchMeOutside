import React from "react";
import { NavLink } from 'react-router-dom';

import "./Footer.css";
import logo from '../../assets/images/astronautBunny.png';
import pcPlayer from '../../assets/images/pcPlayer.png';
import linkedinIcon from '../../assets/images/linkedinIcon.png';
import githubIcon from '../../assets/images/githubIcon.png';

function Footer() {

    return (
        <footer>
            <div id="footer-left">
                <div className="footer-logo-block">

                    <NavLink exact to="/"><img className='footer-logo' src={logo} alt='logo' /></NavLink>
                </div>
                <p>&copy; {new Date().getFullYear()} CouchMeOutside, Inc. All Rights Reserved. Terms, Privacy & Accessibility
                </p>

            </div>


            <div id="footer-right">
                <div className="icons-row">

                    <div className="linkedins">
                        <a href="https://www.linkedin.com/in/peter-dinh-5a22a01b3/"><img src={linkedinIcon} alt="Linkedin Icon Description" className="linkedinIcon" /></a>
                    </div>
                    <div className="githubs">
                        <a href="https://github.com/314pdinh"><img src={githubIcon} alt="Github Icon Description" className="githubIcon" /></a>
                    </div>
                    <div className="personal-portfolio">
                        <a href="https://314pdinh.github.io"><img src={pcPlayer} alt="Icon Description" className="portfolioIcon" /></a>
                    </div>

                </div>
                <p>
                    Peter Dinh
                </p>
            </div>
        </footer>
    );
}

export default Footer;