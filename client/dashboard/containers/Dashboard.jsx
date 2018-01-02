import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import { handleGetUserProfile } from '../actions';
import ProfilePage from './ProfilePage';
import Authenticate from '../../authentication';
import UserRecipesPage from './UserRecipesPage';
import FavoritesPage from './FavoritesPage';
import { CreateRecipe, UpdateRecipe } from '../../recipes';
import { handleLogout } from '../../authentication/actions';
import '../styles/dashboard.scss';

class Dashboard extends Component {
  componentDidMount() {
    this.props.handleGetUserProfile();
  }

  onClick = () => {
    this.props.handleLogout();
    this.props.history.push('/landing');
  }

  render() {
    return (
      <div className="container">
        <ProfilePage />
        <div className="row">
          <div className="col s12 m3 l3 sidebar hide-on-small-only">
            <h5>Your Recipe Box</h5>
            <ul className="side-bar-link">
              <li><NavLink to="/my-recipes" activeClassName="active" href>Personal Recipes</NavLink></li>
              <li><NavLink to="/favorites" activeClassName="active" href>Favorite Recipes</NavLink></li>
              <li><NavLink to="/create" activeClassName="active" href>Create Recipe</NavLink></li>
              <li><NavLink to="/logout" activeClassName="active" onClick={this.onClick} href>Logout</NavLink></li>
            </ul>
          </div>
          <div className="col s12 m9 l9 content">
            <Route path="/favorites" exact component={Authenticate(FavoritesPage)} />
            <Route path="/my-recipes" exact component={Authenticate(UserRecipesPage)} />
            <Route path="/create" exact component={Authenticate(CreateRecipe)} />
            <Route path="/update/:id" exact component={Authenticate(UpdateRecipe)} />
            {/* <Route component={NotFound} /> */}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  handleGetUserProfile: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};


const mapDispatchToProps = {
  handleGetUserProfile,
  handleLogout
};

export default connect(null, mapDispatchToProps)(Dashboard);