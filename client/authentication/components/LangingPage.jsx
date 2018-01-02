import React from 'react';
import { Link } from 'react-router-dom';

import NavigationBar from '../../common/NavigationBar';
import Footer from '../../common/Footer';
import '../syles/landing.scss';

const LandingPage = () => (
  <div className="landing-image">
    <NavigationBar bgColor="#e4e2dc94" />
    <div className="wrapper">
      <div className="quote-text">
         Find and Share Best and Exciting Recipes
      </div>
      <div className="authenticate">
        <h4>Start Your Cooking Journey</h4>
        <div id="main">
          <Link to="/signup" href="/signup" className="landing-btn">
        Register Now
          </Link>
        Or
        <Link to="/signin" href="/signin" className="landing-btn">
        Log In
        </Link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);


export default LandingPage;