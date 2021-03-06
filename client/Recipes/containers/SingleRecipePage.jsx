import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import SingleRecipe from '../components/SingleRecipe';
import { getSingleRecipe } from '../actions';
import Loader from '../../common/Loader';
import NotFound from '../../authentication/components/NotFound';


const propTypes = {
  getSingleRecipe: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

/**
 * @description SingleRecipe page
 * @class SingleRecipePage
 * @extends {Component}
 */
export class SingleRecipePage extends Component {
  /**
   * @description Creates an instance of SingleRecipePage.
   * @param {any} props
   * @memberof SingleRecipePage
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe,
    };

    [this.id] = this.props.match.params.nameId.split('-')
      .filter(val => !_.isNaN(parseInt(val, 10)));
  }

  /**
   * @memberof SingleRecipePage
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.id !== undefined || this.props.recipe) {
      this.props.getSingleRecipe(this.id);
    }
  }

  /**
   * @param {any} nextProps
   * @memberof SingleRecipePage
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.recipe !== nextProps.recipe) {
      this.setState({ recipe: nextProps.recipe });
    }
  }

  /**
   * @description renders single recipe page
   * @returns {reactElement} markup
   */
  render() {
    if (this.state.recipe.notFound || this.id === undefined) {
      return <NotFound />;
    }
    return (
      <div>
        {
          this.state.recipe.isFetching ? <Loader isFetching /> :
          <SingleRecipe
            recipe={this.state.recipe.payload}
          />
        }
      </div>
    );
  }
}

SingleRecipePage.propTypes = propTypes;

const mapStateToProps = state => ({
  recipe: state.recipeReducer.recipe,
});

export default connect(
  mapStateToProps,
  { getSingleRecipe }
)(SingleRecipePage);
