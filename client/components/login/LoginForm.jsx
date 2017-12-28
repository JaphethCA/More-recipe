import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signinValidator } from '../../utils/validators';
import TextField from '../common/TextField';
import './login_form.scss';


const propTypes = {
  handleLoginRequest: PropTypes.func.isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      serverErrors: this.props.auth.errors,
      validationErrors: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.errors !== null) {
      this.setState({ serverErrors: nextProps.auth.errors });
    }
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.isValid();
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.props.handleLoginRequest(this.state);
    }
  }

  isValid = () => {
    const { errors, isValid } = signinValidator(this.state);
    if (!isValid) {
      this.setState({ validationErrors: errors });
    }
    return isValid;
  }

  render() {
    const { validationErrors } = this.state;
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    return (
      <div className="row login-form">
        <div className="card-panel col s12 m6 offset-m4 l4 offset-l4 z-depth-4">
          <div className="header-text">
            <h4>Log In</h4>
          </div>
          {this.state.serverErrors && <span className="red-text center" > {this.state.serverErrors} </span> }
          <form className="" onSubmit={this.onSubmit}>
            <div className="input-field col s12 m12">
              <TextField
                iconClassName="material-icons prefix"
                iconName="person"
                value={this.state.email}
                onChange={this.onChange}
                name="email"
                labelClassName="active"
                label="Email"
                errorClass="error-class"
                errorText={validationErrors.email}
              />
            </div>
            <div className="input-field col s12 m12">
              <TextField
                iconClassName="material-icons prefix"
                iconName="lock"
                value={this.state.password}
                onChange={this.onChange}
                name="password"
                type="password"
                labelClassName="active"
                label="Password"
                errorClass="error-class"
                errorText={validationErrors.password}
              />
            </div>
            <div className="input-field col s12">
              <button className="btn-large login-btn" type="submit">Login
              </button>
            </div>
            <div className="sign-up-link">
              <span> Have an Account? <Link to="/signup" href="/signup"> Sign Up Here </Link></span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = propTypes;

export default LoginForm;
