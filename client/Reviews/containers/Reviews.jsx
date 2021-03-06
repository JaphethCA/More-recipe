import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListReviews from '../components/ListReviews';
import AddReview from '../components/AddReview';
import handleAddNewRecipeReview from '../actions';
import '../reviews.scss';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  handleAddNewRecipeReview: PropTypes.func.isRequired,
};

/**
 * @class Reviews
 * @extends {Component}
 */
export class Reviews extends Component {
  /**
   * @description Creates an instance of Reviews.
   * @param {any} props
   * @memberof Reviews
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  /**
   * @description handle input change
   * @memberof Reviews
   * @param {SyntheticEvent} event
   * @returns {undefined}
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handle review submit
   * @memberof Reviews
   * @param {SyntheticEvent} event - event
   * @returns {undefined}
   */
  onSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddNewRecipeReview(this.props.recipe.id, this.state);
    this.setState({ content: '' });
  }

  /**
   * @description renders reviews
   * @return {reactElement} markup
   */
  render() {
    return (
      <div className="reviews-page" >
        <ListReviews reviews={this.props.recipe.Reviews} />
        <AddReview
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          content={this.state.content}
        />
      </div>
    );
  }
}

Reviews.propTypes = propTypes;


export default connect(null, { handleAddNewRecipeReview })(Reviews);
