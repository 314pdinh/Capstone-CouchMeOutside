import React from "react";
import { NavLink } from 'react-router-dom';

import "./Footer.css";
import logo from '../../assets/images/astronautBunny.png';

function Footer() {

    return (
        <footer>
            <div id="footer-left">
                <div id="github-links">
                    <div className="githubs">
                        <a href="https://github.com/314pdinh"><i className="fa-brands fa-square-github"></i> Peter Dinh</a>
                    </div>
                </div>
            </div>

            <div id="footer-center">
                <NavLink exact to="/"><img className='footer-logo' src={logo} alt='logo' /></NavLink>
                <p>&copy; {new Date().getFullYear()} CouchMeOutside, Inc. All Rights Reserved. Terms, Privacy & Accessibility
                </p>

            </div>


            <div id="footer-right">
                <div className="linkedins">
                    <a href="https://www.linkedin.com/in/peter-dinh-5a22a01b3/"><i className="fa-brands fa-linkedin" style={{ color: "#0047c2" }}></i> Peter Dinh</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;