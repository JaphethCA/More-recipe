import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../containers/RecipeCard';

import '../styles/recipesStyles.scss';

const propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  showActionBtns: PropTypes.bool,
  showModifyButtons: PropTypes.bool,
  showRemoveFavorite: PropTypes.bool,
  className: PropTypes.string,
  noItemText: PropTypes.string
};

const defaultProps = {
  showActionBtns: true,
  showModifyButtons: false,
  showRemoveFavorite: false,
  className: 'col s12 m4 l3',
  noItemText: 'No Recipes Yet'
};

/**
 * @description displays a list of recipes in cards
 * @param {Object} props
 * @returns {ReactElement} html markup
 */
const Recipes = ({
  recipes,
  showActionBtns,
  showModifyButtons,
  showRemoveFavorite,
  className,
  noItemText
}) => (
  <div className="recipe-list">
    {recipes.length < 1 && <span className="no-recipes">{noItemText}</span>}
    <ul className="row">
      {recipes.map(recipe =>
      (
        <li className={className} key={recipe.id} id={recipe.id}>
          <RecipeCard
            showActionBtns={showActionBtns}
            showModifyButtons={showModifyButtons}
            showRemoveFavorite={showRemoveFavorite}
            recipe={recipe}
          />
        </li>))
  }
    </ul>
  </div>
);


Recipes.propTypes = propTypes;

Recipes.defaultProps = defaultProps;

export default Recipes;
