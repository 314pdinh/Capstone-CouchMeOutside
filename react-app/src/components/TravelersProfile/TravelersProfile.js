import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from '../../store/user';
import './TravelersProfile.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const TravelersProfile = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(getAllUsersThunk());
    }, [dispatch]);

    if (!users || Object.keys(users).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="travelers-profile-container">
            <h2>All Travelers</h2>
            <ul className="user-list">
                {Object.values(users).map((user) => (
                    <li key={user.id} className="user-item">

                        <div className="">
                            <Carousel>
                                <div className="">
                                    <img className="" src={user.profilePic} alt="Profile" />
                                </div>

                                <div className="">
                                    <img className="" src={user.profile_img1} alt="Profile" />
                                </div>

                                <div className="">
                                    <img className="" src={user.profile_img2} alt="Profile" />
                                </div>
                            </Carousel>
                        </div>

                        <h3 className="" style={{textTransform: 'capitalize'}}>{user.username}</h3>
                        <p className="">Email: {user.email}</p>

                        <div className="">

                            <div className="">
                                <p>{user.bio}</p>
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelersProfile;
