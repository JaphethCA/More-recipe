import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleUpvote from '../../actions/requestHandlers/handleUpvote';
import '../../styles/sass/buttons.scss';

class UpvoteButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.handleUpvote(this.props.recipe.id);
  }
  render() {
    return (
      <div className="action-btns">
        <span onClick={this.onClick} className="" data-index ={this.props.recipe.id}>
          <i className="material-icons">thumb_up</i>&nbsp;
          {this.props.recipe.upvotes}
        </span>
      </div>
    );
  }
}

UpvoteButton.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleUpvote: PropTypes.func.isRequired,
};

export default connect(null, { handleUpvote })(UpvoteButton);