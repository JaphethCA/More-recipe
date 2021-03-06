import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchForm from '../SearchPage/components/SearchForm';
import { handleLogout as logout } from '../authentication/actions';
import './styles/navigationBar.scss';


const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  bgColor: PropTypes.string,
};

const defaultProps = {
  bgColor: '$nav-background-color'
};

/**
 * @class NavigationBar
 * @extends {Component}
 */
export class NavigationBar extends Component {
  /**
   * Creates an instance of NavigationBar.
   * @param {object} props
   * @memberof NavigationBar
   */
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false
    };
  }

  /**
   * react component life cycle funtion
   * @returns {undefined}
   */
  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 250,
      edge: 'left',
      closeOnClick: true,
      draggable: false,
    });

    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      hover: false,
      gutter: 1,
      belowOrigin: false,
      alignment: 'left',
      stopPropagation: true
    });
  }

  /**
   * handle onclick event
   * @memberof NavigationBar
   * @returns {undefined}
   *
   */
  onClick = () => {
    this.props.logout();
    this.props.history.push('/');
  }

  /**
   *
   * toggle search input on mobile devices
   * @memberof NavigationBar
   * @returns {undefined} - none
   */
  toggleSearch = () => {
    const toggle = document.getElementById('toggle');
    toggle.innerHTML = !this.state.isSearching ? 'close' : 'search';
    this.setState({ isSearching: !this.state.isSearching });
  }

  /**
   * renders side navigation links
   * @memberof NavigationBar
   * @param {number} id
   * @param {string} className
   * @returns {DomElement} - return html
   */
  renderSideNavLinks = (id, className) => (
    <ul id={id} className={className} >
      <li><NavLink to="/create">Create Recipe</NavLink></li>
      <li><NavLink to="/profile">Profile</NavLink></li>
      <li><NavLink to="/my-recipes">My Recipes</NavLink></li>
      <li ><NavLink to="/favorites">Favorites</NavLink></li>
      <li >
        <button
          onClick={this.onClick}
        > Logout
         <i className="material-icons">exit_to_app</i>
        </button>
      </li>
    </ul>
  );
  /**
   * renders guest user links
   * @param {string} wrapperId
   * @param {string} wrapperClass
   * @param {string} linkClass
   * @returns {DomElement} - html
   * @memberof NavigationBar
   */
  renderGuestNav = (wrapperId, wrapperClass, linkClass) => (
    <ul className={wrapperClass} id={wrapperId}>
      <li ><NavLink to="/signin" className={linkClass}>Sign In </NavLink></li>
      <li><NavLink to="/signup" className={linkClass}>Sign Up</NavLink></li>
    </ul>
  );

  /**
   * @description displays navigation bar
   * @returns {ReactElement} markup
   */
  render() {
    const { isAuthenticated } = this.props.user;

    const userLinks = (
      <div>
        {this.renderSideNavLinks('dropdown1', 'dropdown-content')}

        <ul className="nav-mobile hide-on-large-only right">
          <li className="search-icon">
            <button onClick={this.toggleSearch}>
              <i className="material-icons medium" id="toggle" >search</i>
            </button>
          </li>
        </ul>
        <ul className="nav-mobile hide-on-small-only right">
          <li className="nav-search hide-on-med-and-down">
            <SearchForm history={this.props.history} />
          </li>
          <li>
            <NavLink to="/create" href="create" activeClassName="active-link">
              Create Recipe
            </NavLink>
          </li>
          <li>
            <NavLink
              className="dropdown-button"
              to="/profile"
              href=""
              activeClassName="active-link"
              data-activates="dropdown1"
            >
              Profile <i className="material-icons right">arrow_drop_down</i>
            </NavLink>
          </li>
        </ul>
        {this.renderSideNavLinks('more-recipe', 'side-nav')}
      </div>
    );

    const guestLinks = (
      <div>
        {this.renderGuestNav('more-recipe', 'side-nav', 'nav-btn-side')}
        {this.renderGuestNav('', 'nav-mobile right hide-on-small-only', 'nav-btn')}
      </div>
    );

    return (
      <div className="">
        <nav
          className="nav-extended nav-menu"
          style={this.props.bgColor && { backgroundColor: this.props.bgColor }}
        >
          <div className="nav-wrapper">
            <div className="container-fluid">
              <NavLink
                to="/recipes"
                id="brand-logo"
                className="brand-logo"
              >
                More Recipes
              </NavLink>
              <NavLink
                to=""
                data-activates="more-recipe"
                className="button-collapse"
              >
                <i className="material-icons">menu</i>
              </NavLink>
              {isAuthenticated ? userLinks : guestLinks}
            </div>
          </div>
        </nav>
        <div className="medium-search">
          {this.state.isSearching &&
          <SearchForm history={this.props.history} />
          }
        </div>
      </div>
    );
  }
}

NavigationBar.propTypes = propTypes;

NavigationBar.defaultProps = defaultProps;


const mapStateToProps = state => ({
  user: state.auth
});

export default withRouter(connect(mapStateToProps, { logout })(NavigationBar));
