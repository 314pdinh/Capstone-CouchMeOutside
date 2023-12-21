import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignUpForm from './SignupForm/index'
import LoginForm from './LoginForm/index'
import './UsersFormPage.css';

function UsersFormPage() {
  const sessionUser = useSelector((state) => state.session.user);

  const [welcome, setWelcome] = useState(false);

  const setBannerClass = () => {
    const classArr = ["banner-side"]
    if (welcome) classArr.push('send-right')
    return classArr.join(' ')
  };

  const setFormClass = () => {
    const classArr = ["form-side"]
    if (welcome) classArr.push('send-left')
    return classArr.join(' ')
  };

  if (sessionUser) return <Redirect to="/" />;    

  return (
    <div className="user-form-container">

      <div className={setBannerClass()}>

        <div className='banner-container'>


          {welcome ?
            <div className='banner-header'>
              <h2>You're one of us?</h2>
              <p>Come back, we miss you!</p>
            </div>
            :
            <div className='banner-header'>
              <h2>New here?</h2>
              <p>Explore new opportunities!</p>
            </div>
          }

          <button className='banner-button' onClick={() => setWelcome(!welcome)}>
            {welcome ?
              'Sign In'
              :
              'Create Account'
            }
          </button>

        </div>

      </div>

      <div className={setFormClass()}>
        {welcome ?

          <SignUpForm/>

          :

          <LoginForm/>
        }

      </div>
    </div>
  );
}

export default UsersFormPage;
