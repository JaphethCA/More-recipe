import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import { handleAuthRequest } from '../actions';
import { signUpValidator } from '../../utilities/validators';
import SignupForm from '../components/SignupForm';

const propTypes = {
  handleAuthRequest: PropTypes.func.isRequired,
  authentication: PropTypes.objectOf(PropTypes.any).isRequired,
  loader: PropTypes.objectOf(PropTypes.bool).isRequired
};

/**
 * @class SignupPage
 * @extends {Component}
 */
export class SignupPage extends Component {
  /**
   * @description Creates an instance of SignupPage.
   * @param {object} props
   * @memberof SignupPage
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      validationErrors: {},
    };
  }

  /**
   * @description handle form input change
   * @param {SyntheticEvent} event
   * @memberof SignupPage
   * @returns {undefined} - have not return value
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.isValid();
  }

  /**
   * @description handles signupPage form submit
   * @memberof SignupPage
   * @param {SyntheticEvent} event
   * @return {undefined} - have no return value
   */
  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.props.handleAuthRequest(this.state, 'signupPage');
    }
  }

  /**
   *
   * checks if input is valid
   * @memberof SignupPage
   * @returns {Boolean} - true/false
   */
  isValid = () => {
    const { errors, isValid } = signUpValidator(this.state);
    if (!isValid) {
      this.setState({ validationErrors: errors });
    } else {
      this.setState({ validationErrors: {} });
    }
    return isValid;
  }

  /**
   * @description render signup page
   * @returns {ReactElement} markup
   * @memberof Authenticate
   */
  render() {
    const formData = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      verifyPassword: this.state.verifyPassword
    };

    return (
      <div>
        {
          this.props.authentication.isAuthenticated
          ? <Redirect to="recipes" />
          :
          <SignupForm
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            formData={formData}
            isFetching={this.props.loader.isFetching}
            serverErrors={this.props.authentication.signupErrors || ''}
            validationErrors={this.state.validationErrors}
          />
        }
      </div>
    );
  }
}

SignupPage.propTypes = propTypes;

const mapStateToProps = state => ({
  authentication: state.auth,
  loader: state.loader
});


export default connect(mapStateToProps, { handleAuthRequest })(SignupPage);
