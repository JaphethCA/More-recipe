import React from 'react';
import PropTypes from 'prop-types';

import UpdateRecipe from '../containers/CreateUpdateRecipe';


const RecipeUdatePage = ({ location, history }) => {
  if (!location.state) history.push('/my-recipes');
  return (
    <UpdateRecipe
      title="Update Recipe"
      type="update"
      recipe={location.state}
    />
  );
};

RecipeUdatePage.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default RecipeUdatePage;