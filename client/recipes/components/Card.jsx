
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import slugify from '../../utilities/slugify';
import ActionButtons from '../../actionButtons';

import '../styles/recipeCard.scss';


const propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onUpdateClick: PropTypes.func.isRequired,
  onRemoveFavoriteClick: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  showActionBtns: PropTypes.bool,
  showModifyButtons: PropTypes.bool,
  showRemoveFavorite: PropTypes.bool
};

const Card = (props) => {
  const {
    recipe, showActionBtns, showModifyButtons, onDeleteClick,
    onUpdateClick, showRemoveFavorite, onRemoveFavoriteClick
  } = props;

  const renderDelete = () => (
    <button onClick={onDeleteClick} className="btn-floating white waves-effect waves-red right">
      <i className="material-icons red-text ">delete</i>
    </button>
  );

  const renderUpdate = () => (
    <button
      className="btn-floating white waves-effect waves-blue modal-trigger"
      onClick={onUpdateClick}
    >
      <i className="material-icons blue-text">edit</i>
    </button>
  );
  const nameUrl = slugify(recipe.name, '-');
  return (
    <div className="row " id="recipe-card">
      <div className="card col s12">
        <Link
          to={`/recipe/${nameUrl}-${recipe.id}`}
          className="card-image"
          href={`/recipe/${nameUrl}-${recipe.id}`}
        >
          <img
            src={recipe.image
          || 'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1511526912/recipe-card-placeholder_ta9ikp.jpg'}
            alt={recipe.name}
            className="responsive-img recipe-image"
          />
          <h5 className="ellipses">{recipe.name}</h5>
        </Link>
        <span className="recipe-author">Recipe by <span>{recipe.author.username}</span></span>
        {
        showActionBtns &&
        <div className="card-action">
          <ActionButtons
            recipe={recipe}
          />
        </div>
      }
        {
        showModifyButtons &&
        <div className="card-action">
          {renderUpdate()}
          {renderDelete()}
        </div>
      }
        {
        showRemoveFavorite &&

        <div className="card-action">
          <button className="btn red white-text" onClick={onRemoveFavoriteClick}>
          Remove
          </button>
        </div>
      }
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

Card.defaultProps = {
  showActionBtns: true,
  showModifyButtons: false,
  showRemoveFavorite: false
};

export default Card;