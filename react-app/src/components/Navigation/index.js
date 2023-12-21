import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import bunny from '../../assets/images/astronautBunny.png';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-wrap'>
			<header>
				<div className='nav'>

					<div className='traveljournal'>
						<h1 className="nav-item">
							<NavLink className='TitleHeader' exact to="/">
								{/* <img className='icon-bunny' src={bunny} alt='logo-icon' /> */}
								<i className="fa-solid"></i>
								CouchMeOutside
							</NavLink>
						</h1>
					</div>


					<div className='header-right-nav'>
						<ul className='nav-links'>
							<li className="nav-item">
								<NavLink exact to="/travelers" activeClassName="active-link">
									Travelers
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink exact to="/account" activeClassName="active-link">
									Account
								</NavLink>
							</li>
						</ul>
						{isLoaded && sessionUser && (
							<ul className='navButton'>
								<div className='top'>
									<div className='profile'>
										<li className="nav-item">
											<ProfileButton user={sessionUser} />
										</li>
									</div>
								</div>
							</ul>
						)}
						{isLoaded && !sessionUser && (
							<ul className='navButton'>
								<li classname="ProfileBut">
									<ProfileButton user={sessionUser} />
								</li>
							</ul>
						)}
					</div>

				</div>
			</header>
		</div>
	);
}

export default Navigation;

