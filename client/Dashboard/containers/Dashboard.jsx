import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import ProfilePage from './ProfilePage';
import
AuthenticateRoute
  from '../../authentication/containers/AuthenticateRoute';
import UserRecipesPage from './UserRecipesPage';
import FavoritesPage from './FavoritesPage';
import { handleLogout } from '../../authentication/actions';
import '../styles/dashboard.scss';


const propTypes = {
  handleLogout: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

/**
 * @class Dashboard
 * @extends {Component}
 */
export class Dashboard extends Component {
  /**
   * @description logs user out of application onclick
   * @memberof Dashboard
   * @returns {undefined}
   */
  onClick = () => {
    this.props.handleLogout();
    this.props.history.push('/landing');
  }

  /**
 * @description displays dashboard
 * @returns {ReactElement} markup
 */
  render() {
    return (
      <div className="container">
        <ProfilePage profile={this.props.profile} />
        <div className="row">
          <div className="col s12 m3 l3 sidebar hide-on-small-only">
            <h5>Your Recipe Box</h5>
            <ul className="side-bar-link">
              <li><NavLink
                to="/my-recipes"
                activeClassName="active"
                href
              >
                Personal Recipes
                  </NavLink>
              </li>
              <li><NavLink
                to="/favorites"
                activeClassName="active"
                href
              >Favorite Recipes
                  </NavLink>
              </li>
              <li><NavLink
                to="/create"
                activeClassName="active"
                href
              >Create Recipe
                  </NavLink>
              </li>
              <li><NavLink
                to=""
                activeClassName="active"
                onClick={this.onClick}
                id="logout"
                href
              >Logout
                  </NavLink>
              </li>
            </ul>
          </div>
          <div className="col s12 m9 l9 content">
            <Route
              path="/favorites"
              exact
              component={AuthenticateRoute(FavoritesPage)}
            />
            <Route
              path="/my-recipes"
              exact
              component={AuthenticateRoute(UserRecipesPage)}
            />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  handleLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
