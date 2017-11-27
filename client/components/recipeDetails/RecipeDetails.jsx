import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';
import getRecipe from '../../actions/requestHandlers/getRecipe';
import './recipe_details.scss';
import Reviews from '../review/ReviewsComponent';
import ActionButtons from '../buttons/ActionButtons';
import UserDetail from '../user/UserDetail';
import { setFavorites, removeFavorite } from '../../actions/requestHandlers/handleUserFavorites';

const propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFavorites: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

class RecipeDetails extends Component {
  constructor(props, { match }) {
    super(props);
    this.state = {
      recipe: {},
      favorites: [],
      reviews: [],
      hasErrored: false,
    };
  }

  componentDidMount() {
    this.props.getRecipe(this.props.match.params.id)
      .then((res) => {
        this.setState({ recipe: res.data });
      }).catch((err) => {
        if (err.response.status === 404) {
          this.setState({ hasErrored: true });
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipes !== nextProps.recipes) {
      this.props.getRecipe(this.props.match.params.id)
        .then((res) => {
          this.setState({ recipe: res.data });
        }).catch(err => this.setState({ hasErrored: true }));
    }
  }

  displayList = (items) => {
    const listItems = lodash.split(items, ',');
    return listItems;
  }

  render() {
    const {
      name, ingredients, description, direction, image, updatedAt, userId
    } = this.state.recipe;
    if (this.state.hasErrored) {
      return (
        <div className="recipe-not-found">
          <h4>404: RECIPE DOES NOT EXIST</h4>
          <p>Sorry, It seems like the recipe you are looking for does not exist.</p>
        </div>
      );
    }
    return (
      <div className="recipe-details">
        <div>
          <h2> {name} </h2>
          <hr />
        </div>
        <div className="center" >
          <img
            className="responsive-img center"
            src={image || 'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1511526912/recipe-card-placeholder_ta9ikp.jpg'}
            alt=""
          />
        </div>

        <div className="col s12 m6 offset-m3 description">
          <h4> Description </h4>
          <div className="description-content col s12 m12">
            <p >{description} </p>
          </div>
          <div id="action-btns">
            {this.state.recipe &&
            <ActionButtons
              recipe={this.state.recipe}
              reviews={this.props.reviews}
              favorites={this.props.favorites}
              setFavorites={this.props.setFavorites}
              removeFavorite={this.props.removeFavorite}
            />
             }
          </div>
        </div>
        <span>Last Modified on {updatedAt} {userId && <UserDetail userId={userId} />} </span>
        <hr />

        <div className="row">
          <div className="col s12 m6">
            <h4> Ingredients </h4>
            <ol>
              {this.displayList(ingredients).map(item => (<li key={item}>{item}</li>))}
            </ol>
          </div>
          <div className="col s12 m6">
            <h4> Directions </h4>
            <ol>
              {this.displayList(direction).map(item => (<li key={item}>{item}</li>))}
            </ol>
          </div>
        </div>
        <Reviews recipe={this.state.recipe} reviews={this.props.reviews} />
      </div>
    );
  }
}

RecipeDetails.propTypes = propTypes;


export default connect(null, { getRecipe, setFavorites, removeFavorite })(RecipeDetails);
