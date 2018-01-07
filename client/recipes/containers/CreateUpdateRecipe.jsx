import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { recipeFormValidator } from '../../utilities/validators';
import { handleCreateRecipe, handleUpdateRecipe } from '../actions';
import RecipeForm from '../components/RecipeForm';

/**
 * @class CreateUpdateRecipe
 * @extends {Component}
 */
class CreateUpdateRecipe extends Component {
/**
 * @description Creates an instance of CreateUpdateRecipe.
 * @param {object} props
 * @memberof CreateUpdateRecipe
 */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.recipe.id || '',
      name: this.props.recipe.name || '',
      description: this.props.recipe.description || '',
      ingredients: this.props.recipe.ingredients || '',
      direction: this.props.recipe.direction || '',
      image: this.props.recipe.image || '',
      validationErrors: {},
      clearForm: false
    };
  }

  /**
   * @description handle input change event
   * @memberof CreateUpdateRecipe
   * @param {SyntheticEvent} event
   * @returns {undefined}
   */
  onChange = (event) => {
    if (event.target.name === 'image') {
      this.setState({ image: event.target.files[0] });
      const reader = new FileReader();
      reader.onload = () => {
        const output = document.getElementById('img2');
        output.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  /**
   * @description handle recipe update/create form submit
   * @memberof CreateUpdateRecipe
   * @param {SyntheticEvent} event
   * @returns {undefined}
   */
  onSubmit = (event) => {
    event.preventDefault();
    const postData = {
      image: this.state.image,
      direction: this.state.direction,
      description: this.state.description,
      ingredients: this.state.ingredients,
      name: this.state.name,
      id: this.state.id
    };
    if (this.isValid()) {
      return this.props.type === 'create' ?
        this.props.handleCreateRecipe(postData) :
        this.props.handleUpdateRecipe(postData);
    }
  }

  /**
   * @description handles Tiny MCE editor change
   * @memberof CreateUpdateRecipe
   * @param {SyntheticEvent} event
   * @returns {undefined}
   */
  handleEditorChange = (event) => {
    if (event.target.targetElm.name === 'direction') {
      this.setState({ direction: event.target.getContent() });
    } else {
      this.setState({ ingredients: event.target.getContent() });
    }
  }

  /**
   * @returns {Boolean} true/false
   */
  isValid() {
    const { errors, isValid } = recipeFormValidator(this.state);
    if (!isValid) {
      this.setState({ validationErrors: errors });
    } else {
      this.setState({ validationErrors: {} });
    }
    return isValid;
  }

  /**
   * @returns {ReactElement} - html markup
   */
  render() {
    const recipeData = {
      name: this.state.name,
      direction: this.state.direction,
      description: this.state.description,
      ingredients: this.state.ingredients,
      image: this.state.image
    };

    return (
      <div>
        <RecipeForm
          validationErrors={this.state.validationErrors}
          recipe={recipeData}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          handleEditorChange={this.handleEditorChange}
          title={this.props.title}
          clearForm={this.state.clearForm}
          isFetching={this.props.loader.isFetching}
        />
      </div>
    );
  }
}

CreateUpdateRecipe.propTypes = {
  handleCreateRecipe: PropTypes.func.isRequired,
  handleUpdateRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
  type: PropTypes.string,
  loader: PropTypes.objectOf(PropTypes.any).isRequired
};

CreateUpdateRecipe.defaultProps = {
  title: 'Create Recipe',
  type: 'create',
  recipe: {},
};

const mapStateToProps = state => ({
  loader: state.loader
});


export default connect(
  mapStateToProps,
  {
    handleCreateRecipe,
    handleUpdateRecipe
  }
)(CreateUpdateRecipe);

