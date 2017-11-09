import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getUserDetail from '../../actions/requestHandlers/getUserDetail';
import '../../styles/sass/userDetails.scss';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }
  componentDidMount() {
    this.props.getUserDetail(this.props.userId).then(res => this.setState({ user: res.data }));
  }

  render() {
    const { user } = this.state;
    return (
      <div className="user-details">
        {/* <img src={user.image || null } alt=""/> */}
        {user && <p>By <span>{user.username }</span> </p>}
      </div>
    );
  }
}

UserDetail.propTypes = {
  userId: PropTypes.number.isRequired,
  getUserDetail: PropTypes.func.isRequired
};

export default connect(null, { getUserDetail })(UserDetail);