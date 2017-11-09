import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


export default function (Comp) {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/signin');
      }
    }
    componentWillUpdate() {
      if (!this.props.isAuthenticated) {
        <Redirect to="/signin" />;
      }
    }
    render() {
      return <Comp {...this.props} />;
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  return connect(mapStateToProps, { })(Authenticate);
}